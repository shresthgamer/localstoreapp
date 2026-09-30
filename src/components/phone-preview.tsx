import { Gift, Instagram, Star } from "lucide-react";
import { useAppStore } from "@/lib/store";
import type { ScratchPrize, StampProgram } from "@/lib/types";
import { cn } from "@/lib/utils";

export function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="phone-frame relative rounded-hero bg-elevated p-2.5 shadow-soft shrink-0">
      <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-28 h-6 bg-elevated rounded-b-lg z-20" />
      <div className="bg-background w-full h-full rounded-2xl overflow-y-auto no-scrollbar flex flex-col">
        {children}
      </div>
    </div>
  );
}

export function StampPreview({ program, filled = 0 }: { program: StampProgram; filled?: number }) {
  const business = useAppStore((s) => s.business);
  const needed = Math.max(1, program.visitsRequired);
  const remaining = Math.max(0, needed - filled);
  return (
    <PhoneFrame>
      <div className="pt-12 pb-6 px-5 shrink-0">
        <div className="flex items-center gap-2.5">
          <img alt="" src={business.logo} className="size-7 rounded-full object-cover" />
          <h3 className="text-sm truncate">{business.name}</h3>
        </div>
        <p className="eyebrow mt-6">Stamp card</p>
        <h2 className="text-2xl mt-1 tabular-nums">
          {filled} of {needed}
        </h2>
      </div>
      <div className="px-4 shrink-0">
        <div className="panel p-3 flex items-center gap-3">
          <img className="size-11 rounded-md object-cover" alt="" src={program.image || "/images/reward.svg"} />
          <div className="flex-1 min-w-0">
            <span className="eyebrow">{needed} stamps</span>
            <p className="text-xs mt-1 leading-snug line-clamp-2">{program.description || "Your reward"}</p>
          </div>
        </div>
      </div>
      <div className="px-4 mt-3 shrink-0">
        <div className="panel p-4">
          <p className="eyebrow mb-3">Progress</p>
          <div className="grid grid-cols-4 gap-2">
            {Array.from({ length: needed }).map((_, i) => (
              <div key={i} className={cn("stamp-dot", i < filled ? "is-filled" : "is-empty")}>
                {i === needed - 1 && i >= filled ? <Gift className="size-3.5" /> : i < filled ? <span className="text-xs">{i + 1}</span> : null}
              </div>
            ))}
          </div>
          <p className="text-xs text-center text-muted mt-3">
            {remaining === 0 ? "Reward unlocked" : `${remaining} visits to go`}
          </p>
        </div>
      </div>
      <SocialRow />
    </PhoneFrame>
  );
}

export function ScratchPreview({ prizes }: { prizes: ScratchPrize[] }) {
  const business = useAppStore((s) => s.business);
  return (
    <PhoneFrame>
      <div className="pt-12 pb-6 px-5 shrink-0">
        <div className="flex items-center gap-2.5">
          <img alt="" src={business.logo} className="size-7 rounded-full object-cover" />
          <h3 className="text-sm truncate">{business.name}</h3>
        </div>
        <p className="eyebrow mt-6">Instant gift</p>
        <h2 className="text-2xl mt-1">Scratch & win</h2>
      </div>
      <div className="px-4 pb-6">
        <div className="grid grid-cols-2 gap-3">
          {prizes
            .filter((p) => p.active !== false)
            .map((p) => (
              <div key={p.id} className="panel p-3 flex flex-col items-center justify-center text-center min-h-36">
                <p className="eyebrow mb-2">Scratch</p>
                <Gift className="size-7 text-primary mb-2" />
                <p className="text-xs leading-snug">{p.title || "Mystery prize"}</p>
              </div>
            ))}
        </div>
      </div>
    </PhoneFrame>
  );
}

function SocialRow() {
  return (
    <div className="flex justify-center gap-3 mt-6 mb-5 text-muted shrink-0">
      <div className="size-8 rounded-full bg-surface shadow-card flex items-center justify-center">
        <Instagram className="size-3.5" />
      </div>
      <div className="size-8 rounded-full bg-surface shadow-card flex items-center justify-center">
        <Star className="size-3.5" />
      </div>
    </div>
  );
}
