import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ChevronLeft, Minus, Plus, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/app-shell";
import { StampPreview } from "@/components/phone-preview";
import { Toggle } from "@/components/ui-bits";
import { useAppStore } from "@/lib/store";
import { fileToDataUrl } from "@/lib/utils";

export const Route = createFileRoute("/stamp")({ component: StampPage });

function StampPage() {
  const navigate = useNavigate();
  const stamps = useAppStore((s) => s.stamps);
  const saveStamp = useAppStore((s) => s.saveStamp);
  const addStamp = useAppStore((s) => s.addStamp);
  const removeStamp = useAppStore((s) => s.removeStamp);
  const program = stamps[0];

  async function onUpload(file: File | undefined, id: string) {
    if (!file) return;
    const url = await fileToDataUrl(file);
    const current = useAppStore.getState().stamps.find((s) => s.id === id);
    if (current) saveStamp({ ...current, image: url });
  }

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
          <div className="flex-1 w-full max-w-lg">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <h1 className="text-2xl">Stamp programs</h1>
              {program ? (
                <div className="flex items-center gap-2 bg-surface px-3 py-1.5 rounded-full shadow-card">
                  <Toggle on={program.active} onToggle={() => saveStamp({ ...program, active: !program.active })} />
                  <span className="eyebrow pr-1">{program.active ? "Active" : "Paused"}</span>
                </div>
              ) : null}
              <button
                type="button"
                onClick={() => {
                  addStamp();
                  toast.success("Reward added");
                }}
                className="btn-ghost h-11 px-4 text-sm"
              >
                Add reward
              </button>
            </div>

            {stamps.map((p) => (
              <div key={p.id} className="relative mb-4">
                <div className="panel p-5">
                  {stamps.length > 1 ? (
                    <button
                      type="button"
                      onClick={() => removeStamp(p.id)}
                      className="absolute top-3 right-3 size-11 rounded-full bg-elevated text-danger flex items-center justify-center"
                      aria-label="Delete reward"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  ) : null}
                  <div className="flex gap-4 mb-5">
                    <label className="size-16 bg-elevated rounded-lg flex items-center justify-center overflow-hidden cursor-pointer shrink-0">
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
                        onChange={(e) => onUpload(e.target.files?.[0], p.id)}
                      />
                    </label>
                    <div className="flex-1 min-w-0 space-y-4">
                      <div>
                        <label className="eyebrow block mb-2">Visits required</label>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            className="size-11 rounded-md bg-elevated flex items-center justify-center"
                            onClick={() => saveStamp({ ...p, visitsRequired: Math.max(2, p.visitsRequired - 1) })}
                          >
                            <Minus className="size-4" />
                          </button>
                          <span className="font-medium tabular-nums w-8 text-center">{p.visitsRequired}</span>
                          <button
                            type="button"
                            className="size-11 rounded-md bg-primary text-primary-foreground flex items-center justify-center"
                            onClick={() => saveStamp({ ...p, visitsRequired: Math.min(12, p.visitsRequired + 1) })}
                          >
                            <Plus className="size-4" />
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="eyebrow block mb-2">Expiry (days)</label>
                        <input
                          className="field w-28"
                          type="number"
                          value={p.expiryDays}
                          onChange={(e) => saveStamp({ ...p, expiryDays: Number(e.target.value) || 0 })}
                        />
                      </div>
                    </div>
                  </div>
                  <label className="eyebrow block mb-2">Reward</label>
                  <input
                    className="field"
                    placeholder="e.g. 5% off the bill after 8 visits"
                    value={p.description}
                    onChange={(e) => saveStamp({ ...p, description: e.target.value })}
                  />
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={() => {
                toast.success("Reward programs saved");
                navigate({ to: "/" });
              }}
              className="btn-primary w-full"
            >
              Save programs
            </button>
          </div>
          <div className="flex justify-center w-full xl:w-auto pb-4">
            {program ? <StampPreview program={program} /> : null}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
