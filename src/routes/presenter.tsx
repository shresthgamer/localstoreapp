import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ChevronLeft, UserPlus } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { QrImage } from "@/components/qr-block";
import { Overlay } from "@/components/ui-bits";
import { useAppStore } from "@/lib/store";

export const Route = createFileRoute("/presenter")({ component: PresenterPage });

function collectUrl() {
  if (typeof window === "undefined") return "https://druto.in/c";
  return `${window.location.origin}/c`;
}

function PresenterPage() {
  const navigate = useNavigate();
  const business = useAppStore((s) => s.business);
  const customers = useAppStore((s) => s.customers);
  const addCustomer = useAppStore((s) => s.addCustomer);
  const giveStamp = useAppStore((s) => s.giveStamp);
  const playScratch = useAppStore((s) => s.playScratch);
  const url = useMemo(() => collectUrl(), []);
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");

  function simulate() {
    const digits = phone.replace(/\D/g, "").slice(-10);
    if (digits.length < 10) {
      toast.error("Enter a 10-digit phone");
      return;
    }
    let customer = customers.find((c) => c.phone === digits);
    if (!customer) {
      const id = addCustomer({ name: name.trim() || "Guest", phone: digits, notes: "" });
      customer = useAppStore.getState().customers.find((c) => c.id === id);
    }
    if (!customer) return;
    const stamp = giveStamp(customer.id);
    const scratch = playScratch(customer.id);
    toast.success(
      `${customer.name}: stamp ${stamp.completed ? "completed a card" : "added"}${scratch.won ? " · scratch win" : ""}`,
    );
    setOpen(false);
  }

  return (
    <div className="min-h-screen bg-background text-fg flex flex-col items-center px-5 py-8">
      <button type="button" onClick={() => navigate({ to: "/" })} className="self-start flex items-center gap-1 font-medium text-muted min-h-11">
        <ChevronLeft className="size-4" /> Back
      </button>
      <img src={business.logo} alt="" className="size-16 rounded-full mt-6 bg-surface border border-border p-1 object-cover" />
      <h1 className="text-2xl mt-3">{business.name}</h1>
      <p className="text-muted text-sm">{business.category} · Scan to collect rewards</p>
      <div className="qr-plate p-3 mt-8">
        <QrImage value={url} alt="Business QR Code" className="size-64" />
      </div>
      <button type="button" onClick={() => setOpen(true)} className="btn-primary mt-8 px-6">
        <UserPlus className="size-4" /> Simulate a scan
      </button>
      <Overlay open={open} onClose={() => setOpen(false)}>
        <div className="p-5">
          <h2 className="text-lg mb-3">Simulate customer scan</h2>
          <input className="field mb-2" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input className="field" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} inputMode="numeric" />
          <button type="button" onClick={simulate} className="btn-primary w-full mt-4">
            Scan & stamp
          </button>
        </div>
      </Overlay>
    </div>
  );
}
