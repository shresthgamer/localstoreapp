import { createFileRoute } from "@tanstack/react-router";
import { Calendar, Download, Plus, Search, Users } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/app-shell";
import { Overlay } from "@/components/ui-bits";
import { copyText } from "@/lib/actions";
import { useAppStore } from "@/lib/store";
import { cn, downloadText, formatShortDate, initials } from "@/lib/utils";

export const Route = createFileRoute("/customers")({ component: CustomersPage });

function CustomersPage() {
  const customers = useAppStore((s) => s.customers);
  const stamps = useAppStore((s) => s.stamps);
  const addCustomer = useAppStore((s) => s.addCustomer);
  const giveStamp = useAppStore((s) => s.giveStamp);
  const required = stamps[0]?.visitsRequired ?? 8;
  const [q, setQ] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [tab, setTab] = useState<"all" | "active" | "completed">("all");
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const rows = useMemo(() => {
    return customers.filter((c) => {
      const blob = (c.name + c.phone).toLowerCase();
      if (q && !blob.includes(q.toLowerCase())) return false;
      if (from && c.lastVisit < from) return false;
      if (to && c.lastVisit > to) return false;
      if (tab === "active") return c.stamps > 0 && c.stamps < required;
      if (tab === "completed") return c.stamps === 0 && c.lastVisit !== c.createdAt;
      return true;
    });
  }, [customers, q, from, to, tab, required]);

  async function csv() {
    const header = "Name,Phone,Stamps,Last visit";
    const body = rows.map((c) => `${c.name},${c.phone},${c.stamps}/${required},${c.lastVisit}`).join("\n");
    const text = header + "\n" + body;
    downloadText("customers.csv", text, "text/csv");
    const copied = await copyText(text);
    toast.success(copied ? "CSV saved and copied" : "CSV download started");
  }

  function add() {
    if (!name.trim() || phone.replace(/\D/g, "").length < 10) {
      toast.error("Name and 10-digit phone required");
      return;
    }
    addCustomer({ name: name.trim(), phone: phone.replace(/\D/g, "").slice(-10), notes: "" });
    toast.success("Customer added");
    setOpen(false);
    setName("");
    setPhone("");
  }

  return (
    <AppShell hideStats>
      <div className="space-y-4 animate-fade-in pb-8">
        <div className="flex flex-col gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted size-4" />
            <input
              placeholder="Search by phone or name"
              className="field pl-11"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted size-3.5" />
              <input className="field pl-9" type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
            </div>
            <div className="relative flex-1">
              <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted size-3.5" />
              <input className="field pl-9" type="date" value={to} onChange={(e) => setTo(e.target.value)} />
            </div>
            <button type="button" onClick={csv} className="btn-ghost px-3" aria-label="Download CSV">
              <Download className="size-4" />
            </button>
          </div>
          <button type="button" onClick={() => setOpen(true)} className="btn-primary w-full">
            <Plus className="size-4" /> Add customer
          </button>
        </div>

        <div className="flex gap-2">
          {(["all", "active", "completed"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={cn(
                "px-4 h-11 rounded-full text-sm font-medium capitalize",
                tab === t ? "bg-primary text-primary-foreground" : "bg-surface border border-border text-muted",
              )}
            >
              {t}
            </button>
          ))}
        </div>

        {rows.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 panel">
            <Users className="mb-3 size-10 text-muted" />
            <h3 className="text-base mb-1">No customers yet</h3>
            <p className="text-sm text-muted">Share your QR code to start building a guest list</p>
          </div>
        ) : (
          <div className="space-y-2">
            {rows.map((c) => (
              <div key={c.id} className="panel p-4 flex items-center gap-3">
                <div className="size-11 rounded-full bg-primary-soft text-primary font-semibold flex items-center justify-center">
                  {initials(c.name)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{c.name}</p>
                  <p className="text-sm text-muted">{c.phone}</p>
                  <p className="text-xs text-muted mt-0.5">
                    {c.stamps}/{required} stamps · last {formatShortDate(c.lastVisit)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const r = giveStamp(c.id);
                    toast.success(r.completed ? `${c.name} completed a card` : `Stamp given to ${c.name}`);
                  }}
                  className="btn-primary h-10 px-3 text-sm"
                >
                  Stamp
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Overlay open={open} onClose={() => setOpen(false)}>
        <div className="p-5">
          <h2 className="text-lg mb-4">Add customer</h2>
          <label className="text-xs font-medium uppercase tracking-widest text-muted">Name</label>
          <input className="field mt-1" value={name} onChange={(e) => setName(e.target.value)} />
          <label className="mt-3 block text-xs font-medium uppercase tracking-widest text-muted">Phone</label>
          <input className="field mt-1" value={phone} onChange={(e) => setPhone(e.target.value)} inputMode="numeric" />
          <button type="button" onClick={add} className="btn-primary w-full mt-5">
            Save
          </button>
        </div>
      </Overlay>
    </AppShell>
  );
}
