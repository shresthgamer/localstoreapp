import { useCallback, useEffect, useRef, useState } from "react";
import { Gift } from "lucide-react";
import { cn } from "@/lib/utils";

type Result = { won: boolean; title: string };

export function ScratchFoil({
  locked,
  result,
  onBegin,
  hint,
}: {
  locked?: boolean;
  result: Result | null;
  onBegin: () => void;
  hint: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const started = useRef(false);
  const [cleared, setCleared] = useState(false);

  const paintFoil = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { width, height } = canvas;
    ctx.globalCompositeOperation = "source-over";
    const fill = ctx.createLinearGradient(0, 0, width, height);
    fill.addColorStop(0, "#cfc9ba");
    fill.addColorStop(0.45, "#9b9688");
    fill.addColorStop(1, "#b7b1a2");
    ctx.fillStyle = fill;
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "rgba(243,240,231,0.12)";
    for (let i = 0; i < 90; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      ctx.fillRect(x, y, 18 + Math.random() * 40, 1);
    }
    ctx.fillStyle = "rgba(18,19,16,0.22)";
    ctx.font = "600 13px Outfit, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Scratch here", width / 2, height / 2 + 4);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || result) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const resize = () => {
      if (started.current) return;
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      paintFoil();
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(parent);
    return () => observer.disconnect();
  }, [paintFoil, result]);

  function scratchAt(clientX: number, clientY: number) {
    const canvas = canvasRef.current;
    if (!canvas || locked) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (!started.current) {
      started.current = true;
      onBegin();
    }
    const rect = canvas.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * canvas.width;
    const y = ((clientY - rect.top) / rect.height) * canvas.height;
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, canvas.width * 0.07, 0, Math.PI * 2);
    ctx.fill();

    const sample = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let transparent = 0;
    for (let i = 3; i < sample.length; i += 16) {
      if (sample[i] < 24) transparent += 1;
    }
    const ratio = transparent / (sample.length / 16);
    if (ratio > 0.48) setCleared(true);
  }

  function onPointer(e: React.PointerEvent<HTMLCanvasElement>) {
    if (locked) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    scratchAt(e.clientX, e.clientY);
  }

  const revealed = Boolean(result) && (cleared || locked);

  return (
    <div className="relative h-44 overflow-hidden rounded-lg bg-elevated">
      <div className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center">
        {result?.won ? (
          <>
            <Gift className="size-7 text-primary mb-2" />
            <p className="eyebrow">You won</p>
            <p className="mt-1 font-heading text-xl leading-tight">{result.title}</p>
            <p className="text-sm text-muted mt-2">Show this screen at the counter.</p>
          </>
        ) : result ? (
          <>
            <p className="eyebrow">Not this visit</p>
            <p className="mt-1 font-heading text-xl leading-tight">Try again next time</p>
            <p className="text-sm text-muted mt-2">Every visit is another chance.</p>
          </>
        ) : (
          <>
            <p className="eyebrow">Scratch & win</p>
            <p className="mt-1 font-heading text-xl leading-tight">{hint}</p>
          </>
        )}
      </div>
      {!revealed ? (
        <canvas
          ref={canvasRef}
          className={cn("absolute inset-0 size-full touch-none", locked ? "pointer-events-none" : "cursor-crosshair")}
          onPointerDown={onPointer}
          onPointerMove={(e) => {
            if (e.buttons) scratchAt(e.clientX, e.clientY);
          }}
        />
      ) : null}
      {locked ? (
        <div className="absolute inset-0 bg-background/50 flex items-end justify-center p-4 pointer-events-none">
          <p className="text-sm text-fg">Join to scratch this card</p>
        </div>
      ) : null}
    </div>
  );
}
