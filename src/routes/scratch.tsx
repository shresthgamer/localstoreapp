import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ChevronLeft, Info, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/app-shell";
import { ScratchPreview } from "@/components/phone-preview";
import { Toggle } from "@/components/ui-bits";
import { useAppStore } from "@/lib/store";
import { fileToDataUrl } from "@/lib/utils";

export const Route = createFileRoute("/scratch")({ component: ScratchPage });

function ScratchPage() {
  const navigate = useNavigate();
  const scratches = useAppStore((s) => s.scratches);
  const saveScratch = useAppStore((s) => s.saveScratch);
  const addScratch = useAppStore((s) => s.addScratch);
  const removeScratch = useAppStore((s) => s.removeScratch);

  return (
    <AppShell hideStats>
      <div className="animate-fade-in pb-8">
        <button
          type="button"
          onClick={() => navigate({ to: "/offers" })}
          className="flex items-center gap-1.5 mt-1 mb-6 text-muted text-sm min-h-11"
        >
          <ChevronLeft className="size-4" /> Back
        </button>
        <div className="flex flex-col xl:flex-row gap-8 items-start">
          <div className="flex-1 max-w-lg">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl">Scratch cards</h1>
                <p className="text-sm text-muted mt-1">A surprise on this visit.</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  addScratch();
                  toast.success("Prize added");
                }}
                className="btn-ghost h-11 px-4 text-sm"
              >
                Add prize
              </button>
            </div>

            {scratches.map((p, i) => (
              <div key={p.id} className="panel p-5 mb-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="eyebrow">Prize {i + 1}</h3>
                  <div className="flex items-center gap-2">
                    <span className="eyebrow">{p.active ? "Active" : "Off"}</span>
                    <Toggle on={p.active} onToggle={() => saveScratch({ ...p, active: !p.active })} />
                    {scratches.length > 1 ? (
                      <button
                        type="button"
                        onClick={() => removeScratch(p.id)}
                        className="size-11 rounded-full bg-elevated text-danger flex items-center justify-center"
                        aria-label="Remove prize"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    ) : null}
                  </div>
                </div>
                <label className="size-16 bg-elevated rounded-lg flex items-center justify-center overflow-hidden cursor-pointer mb-4">
                  {p.image ? (
                    <img src={p.image} alt="" className="size-full object-cover" />
                  ) : (
                    <div className="text-muted flex flex-col items-center">
                      <Upload className="size-4" />
                      <span className="eyebrow mt-1">Upload</span>
                    </div>
                  )}
                  <input
                    className="hidden"
                    accept="image/*"
                    type="file"
                    onChange={async (e) => {
                      const f = e.target.files?.[0];
                      if (f) saveScratch({ ...p, image: await fileToDataUrl(f) });
                    }}
                  />
                </label>
                <label className="eyebrow">Reward title</label>
                <input
                  className="field mt-2"
                  placeholder="e.g. 20% off your next visit"
                  value={p.title}
                  onChange={(e) => saveScratch({ ...p, title: e.target.value })}
                />
                <div className="mt-4">
                  <label className="eyebrow">Winning odds</label>
                  <div className="mt-2 flex items-center gap-2 text-sm">
                    <span className="tabular-nums">1 in</span>
                    <input
                      className="field w-20 text-center"
                      type="number"
                      value={p.winnersOutOf}
                      onChange={(e) => saveScratch({ ...p, winnersOutOf: Math.max(2, Number(e.target.value) || 2) })}
                    />
                    <span>scans</span>
                  </div>
                  <p className="mt-2 text-sm text-muted flex gap-1.5">
                    <Info className="size-3.5 mt-0.5 shrink-0" />
                    Each scan has a {Math.round(100 / p.winnersOutOf)}% chance to win.
                  </p>
                </div>
                <label className="mt-4 block eyebrow">Expiry (days)</label>
                <input
                  className="field mt-2 w-28"
                  type="number"
                  value={p.expiryDays}
                  onChange={(e) => saveScratch({ ...p, expiryDays: Number(e.target.value) || 0 })}
                />
              </div>
            ))}

            <button
              type="button"
              onClick={() => {
                toast.success("Scratch cards saved");
                navigate({ to: "/offers" });
              }}
              className="btn-primary w-full"
            >
              Save changes
            </button>
          </div>
          <div className="flex justify-center w-full xl:w-auto pb-4">
            <ScratchPreview prizes={scratches} />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
