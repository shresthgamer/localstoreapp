import { createFileRoute } from "@tanstack/react-router";
import { Gift, Search, Trophy } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/app-shell";
import { useAppStore } from "@/lib/store";
import { cn, formatShortDate, initials } from "@/lib/utils";

export const Route = createFileRoute("/winners")({ component: WinnersPage });

function WinnersPage() {
  const winners = useAppStore((s) => s.winners);
  const customers = useAppStore((s) => s.customers);
  const claim = useAppStore((s) => s.claimWinner);
  const [tab, setTab] = useState<"stamp" | "scratch">("stamp");
  const [q, setQ] = useState("");

  const rows = useMemo(() => {
    return winners
      .filter((w) => (tab === "stamp" ? w.type === "stamp" : w.type === "scratch"))
      .map((w) => ({ ...w, customer: customers.find((c) => c.id === w.customerId) }))
      .filter((w) => {
        if (!q) return true;
        const blob = `${w.customer?.name ?? ""} ${w.customer?.phone ?? ""}`.toLowerCase();
        return blob.includes(q.toLowerCase());
      })
      .sort((a, b) => Number(a.claimed) - Number(b.claimed));
  }, [winners, customers, tab, q]);

  const stampCount = winners.filter((w) => w.type === "stamp").length;
  const scratchCount = winners.filter((w) => w.type === "scratch").length;

  return (
    <AppShell hideStats>
      <div className="space-y-4 animate-fade-in pb-8">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setTab("stamp")}
            className={cn("flex-1 h-11 rounded-md font-medium text-sm", tab === "stamp" ? "bg-primary text-primary-foreground" : "btn-ghost")}
          >
            Stamps {stampCount}
          </button>
          <button
            type="button"
            onClick={() => setTab("scratch")}
            className={cn("flex-1 h-11 rounded-md font-medium text-sm", tab === "scratch" ? "bg-primary text-primary-foreground" : "btn-ghost")}
          >
            Scratch {scratchCount}
          </button>
        </div>
        <p className="text-sm text-muted">Unclaimed rewards stay at the top.</p>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted size-4" />
          <input
            placeholder="Search by name or phone"
            className="field pl-11"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        {rows.length === 0 ? (
          <div className="flex flex-col items-center py-16 panel">
            <Trophy className="size-10 text-muted mb-3" />
            <p className="font-medium">No claimed rewards yet.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {rows.map((w) => (
              <div key={w.id} className="panel p-4 flex items-center gap-3">
                <div className="size-11 rounded-full bg-primary-soft text-primary font-semibold flex items-center justify-center">
                  {initials(w.customer?.name ?? "?")}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{w.customer?.name ?? "Customer"}</p>
                  <p className="text-sm text-muted">{w.customer?.phone}</p>
                  <p className="text-sm mt-1 line-clamp-2">{w.title}</p>
                  <p className="text-xs text-muted">{formatShortDate(w.createdAt)}</p>
                </div>
                {w.claimed ? (
                  <span className="text-xs font-medium uppercase tracking-wide text-muted">Claimed</span>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      claim(w.id);
                      toast.success("Reward marked as claimed");
                    }}
                    className="btn-primary h-10 px-3 text-sm"
                  >
                    <Gift className="size-3.5" /> Claim
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
