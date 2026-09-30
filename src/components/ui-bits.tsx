import { cn } from "@/lib/utils";
import { useEffect, type ReactNode } from "react";

export function Toggle({
  on,
  onToggle,
  className,
}: {
  on: boolean;
  onToggle: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={onToggle}
      className={cn(
        "h-6 w-11 shrink-0 rounded-full px-1 flex items-center transition-colors duration-150",
        on ? "bg-primary" : "bg-elevated",
        className,
      )}
    >
      <span
        className={cn(
          "block size-4 rounded-full shadow-sm transition-transform duration-150",
          on ? "translate-x-5 bg-primary-foreground" : "translate-x-0 bg-muted",
        )}
      />
    </button>
  );
}

export function Overlay({
  open,
  onClose,
  children,
  className,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}) {
  if (!open) return null;
  return (
    <OverlayBody onClose={onClose} className={className}>
      {children}
    </OverlayBody>
  );
}

function OverlayBody({
  onClose,
  children,
  className,
}: {
  onClose: () => void;
  children: ReactNode;
  className?: string;
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center p-0 sm:p-6">
      <button type="button" aria-label="Close" className="absolute inset-0 bg-background/70" onClick={onClose} />
      <div
        className={cn(
          "relative z-10 w-full max-w-md bg-surface rounded-t-2xl sm:rounded-2xl shadow-soft max-h-[92vh] overflow-y-auto animate-fade-in",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}

export function VegMark({ veg }: { veg: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex size-4 items-center justify-center rounded-sm shrink-0",
        veg ? "shadow-[inset_0_0_0_1px_var(--color-success)]" : "shadow-[inset_0_0_0_1px_var(--color-danger)]",
      )}
      title={veg ? "Vegetarian" : "Non-veg"}
    >
      <span className={cn("size-1.5 rounded-full", veg ? "bg-success" : "bg-danger")} />
    </span>
  );
}
