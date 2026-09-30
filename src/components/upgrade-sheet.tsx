import { Check, X } from "lucide-react";
import { toast } from "sonner";
import { Overlay } from "./ui-bits";
import { useAppStore } from "@/lib/store";
import type { PlanId } from "@/lib/types";

const PLANS: { id: PlanId; name: string; price: string; note: string; perks: string[] }[] = [
  {
    id: "basic",
    name: "Basic",
    price: "₹999 / year",
    note: "1 location",
    perks: ["Stamp + scratch cards", "Digital QR menu", "Physical QR stand"],
  },
  {
    id: "growth",
    name: "Growth",
    price: "₹2,499 / year",
    note: "Up to 3 locations",
    perks: ["Everything in Basic", "GPS branch detection", "Priority support"],
  },
  {
    id: "pro",
    name: "Pro",
    price: "₹4,999 / year",
    note: "Up to 6 locations",
    perks: ["Everything in Growth", "Multi-staff accounts", "Custom branding"],
  },
];

export function UpgradeSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const setPlan = useAppStore((s) => s.setPlan);
  const plan = useAppStore((s) => s.business.plan);

  function pick(id: PlanId) {
    setPlan(id);
    toast.success(`${id[0].toUpperCase() + id.slice(1)} plan activated`);
    onClose();
  }

  return (
    <Overlay open={open} onClose={onClose}>
      <div className="p-5 pb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-muted">Plans</p>
            <h2 className="text-lg">Choose a subscription</h2>
          </div>
          <button type="button" onClick={onClose} className="size-11 rounded-full bg-background border border-border flex items-center justify-center" aria-label="Close">
            <X className="size-4" />
          </button>
        </div>
        <div className="space-y-3">
          {PLANS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => pick(p.id)}
              className="w-full text-left rounded-xl border border-border p-4 bg-surface"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{p.name}</h3>
                  <p className="text-sm text-muted">{p.note}</p>
                </div>
                <span className="text-sm font-semibold">{p.price}</span>
              </div>
              <ul className="mt-2 space-y-1">
                {p.perks.map((perk) => (
                  <li key={perk} className="flex items-center gap-2 text-sm text-muted">
                    <Check className="size-3.5 text-primary" /> {perk}
                  </li>
                ))}
              </ul>
              {plan === p.id ? <p className="mt-2 text-xs font-medium text-primary">Current plan</p> : null}
            </button>
          ))}
        </div>
      </div>
    </Overlay>
  );
}
