import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ChevronRight, Clock, Gift, MapPin, Phone, Store } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { BusinessDetails } from "@/components/business-profile";
import { ScratchFoil } from "@/components/scratch-foil";
import { useAppStore } from "@/lib/store";
import { cn, formatHoursLine, todayHours } from "@/lib/utils";

export const Route = createFileRoute("/c")({ component: CollectPage });

const GUEST_KEY = "druto-guest-phone";

function CollectPage() {
  const business = useAppStore((s) => s.business);
  const customers = useAppStore((s) => s.customers);
  const stamps = useAppStore((s) => s.stamps);
  const scratches = useAppStore((s) => s.scratches);
  const addCustomer = useAppStore((s) => s.addCustomer);
  const giveStamp = useAppStore((s) => s.giveStamp);
  const playScratch = useAppStore((s) => s.playScratch);
  const program = stamps.find((s) => s.active) ?? stamps[0];
  const scratch = scratches.find((s) => s.active) ?? scratches[0];
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [meId, setMeId] = useState<string | null>(null);
  const [scratchResult, setScratchResult] = useState<{ won: boolean; title: string } | null>(null);
  const [justStamped, setJustStamped] = useState(false);

  const me = customers.find((c) => c.id === meId);
  const needed = program?.visitsRequired ?? 8;

  useEffect(() => {
    void useAppStore.persist.rehydrate();
    const saved = typeof window !== "undefined" ? window.localStorage.getItem(GUEST_KEY) : null;
    if (!saved) return;
    const existing = useAppStore.getState().customers.find((c) => c.phone === saved);
    if (existing) setMeId(existing.id);
  }, []);

  function identify() {
    const digits = phone.replace(/\D/g, "").slice(-10);
    if (digits.length < 10) {
      toast.error("Enter your 10-digit mobile");
      return;
    }
    const existing = customers.find((c) => c.phone === digits);
    const id = existing ? existing.id : addCustomer({ name: name.trim() || "Guest", phone: digits, notes: "" });
    window.localStorage.setItem(GUEST_KEY, digits);
    setMeId(id);
  }

  const filled = me?.stamps ?? 0;
  const remaining = Math.max(0, needed - filled);
  const hours = todayHours(business.hours);

  return (
    <div className="guest-page">
      <div className="px-4 pt-12 pb-20 max-w-md mx-auto stagger-in">
        <header className="text-center">
          <p className="eyebrow">Member rewards</p>
          <div className="mt-6 flex justify-center">
            <div className="size-[5.5rem] rounded-full p-1 shadow-card bg-surface">
              <img
                src={business.logo}
                alt=""
                className="size-full rounded-full object-cover"
              />
            </div>
          </div>
          <p className="eyebrow mt-5">{business.category}</p>
          <h1 className="mt-2 text-4xl">{business.name}</h1>
          {business.about ? (
            <p className="mt-3 text-sm text-muted leading-relaxed max-w-sm mx-auto">{business.about}</p>
          ) : null}
          <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-surface px-3.5 py-2 shadow-card text-sm">
            <Clock className="size-3.5 text-muted" />
            <span className="text-muted">Today</span>
            <span className="tabular-nums">{hours.day.closed ? "Closed" : formatHoursLine(hours.day)}</span>
          </div>
        </header>

        {!me ? (
          <section className="panel-lg p-5 mt-8">
            <p className="eyebrow">Join the table</p>
            <h2 className="text-2xl mt-2">Your stamp card starts here</h2>
            <p className="text-sm text-muted mt-2 leading-relaxed">
              {program?.description ?? "Collect stamps on every visit. No app to download."}
            </p>
            <input
              className="field mt-5"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
            />
            <input
              className="field mt-2"
              placeholder="Mobile number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              inputMode="numeric"
              autoComplete="tel"
            />
            <button type="button" onClick={identify} className="btn-primary w-full mt-4">
              Continue
            </button>
          </section>
        ) : (
          <section className="panel-lg p-5 mt-8">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="eyebrow">Stamp card</p>
                <h2 className="text-2xl mt-1">Hi {me.name.split(" ")[0]}</h2>
              </div>
              <p className="tabular-nums text-sm text-muted pt-1">
                {filled}/{needed}
              </p>
            </div>
            <p className="mt-4 font-heading text-3xl leading-none tabular-nums">
              {filled} of {needed}
            </p>
            <p className="text-sm text-muted mt-2">
              {remaining === 0
                ? "Card complete — show this to staff."
                : remaining === 1
                  ? "One visit from your reward."
                  : `${remaining} visits from your reward.`}
            </p>
            <div className="mt-5 h-1 rounded-full bg-elevated overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-[width] duration-300"
                style={{ width: `${Math.min(100, (filled / needed) * 100)}%` }}
              />
            </div>
            <div className={cn("grid gap-2.5 mt-5", needed > 8 ? "grid-cols-5" : "grid-cols-4")}>
              {Array.from({ length: needed }).map((_, i) => {
                const filledDot = i < filled;
                const last = i === needed - 1;
                return (
                  <div
                    key={i}
                    className={cn("stamp-dot", filledDot ? "is-filled" : "is-empty")}
                    aria-label={filledDot ? `Stamp ${i + 1}` : last ? "Reward stamp" : "Empty stamp"}
                  >
                    {filledDot ? (
                      <Check className="size-4" strokeWidth={2.4} />
                    ) : last ? (
                      <Gift className="size-4" />
                    ) : (
                      <span className="text-xs tabular-nums">{i + 1}</span>
                    )}
                  </div>
                );
              })}
            </div>
            <p className="text-center text-sm text-muted mt-4 leading-relaxed">{program?.description}</p>
            <button
              type="button"
              onClick={() => {
                const r = giveStamp(me.id);
                setJustStamped(true);
                toast.success(r.completed ? "Card complete — show this to staff" : "Stamp added");
              }}
              className="btn-primary w-full mt-5"
            >
              {justStamped ? "Stamp added" : "I’m at the counter"}
            </button>
          </section>
        )}

        {scratch ? (
          <section className="panel-lg p-5">
            <p className="eyebrow">Instant gift</p>
            <h2 className="text-2xl mt-1">Scratch & win</h2>
            <p className="text-sm text-muted mt-2 mb-4">{scratch.title}</p>
            <ScratchFoil
              locked={!me}
              result={scratchResult}
              hint={scratch.title}
              onBegin={() => {
                if (!me) return;
                const r = playScratch(me.id);
                setScratchResult({ won: r.won, title: r.prize?.title ?? scratch.title });
                toast[r.won ? "success" : "message"](r.won ? `You won: ${r.prize?.title}` : "Better luck next visit");
              }}
            />
          </section>
        ) : null}

        {business.menuLive ? (
          <Link to="/m" className="panel p-4 flex items-center gap-3">
            <span className="size-12 rounded-md bg-primary-soft text-primary flex items-center justify-center">
              <Store className="size-5" />
            </span>
            <span className="flex-1 min-w-0">
              <span className="block font-medium">Tonight’s menu</span>
              <span className="block text-sm text-muted">Dishes, prices, what’s on</span>
            </span>
            <ChevronRight className="size-4 text-muted" />
          </Link>
        ) : null}

        <section className="panel p-5 space-y-3">
          <p className="eyebrow">Visit</p>
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent([business.address, business.city, business.pincode].filter(Boolean).join(", "))}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-start gap-3 text-sm min-h-11"
          >
            <MapPin className="size-4 mt-0.5 text-muted shrink-0" />
            <span>
              {business.address}
              {business.city ? `, ${business.city}` : ""}
              {business.pincode ? ` ${business.pincode}` : ""}
            </span>
          </a>
          {business.phone ? (
            <a href={`tel:+91${business.phone.replace(/\D/g, "").slice(-10)}`} className="flex items-center gap-3 text-sm min-h-11">
              <Phone className="size-4 text-muted shrink-0" />
              {business.phone}
            </a>
          ) : null}
        </section>

        <BusinessDetails business={business} compact />
      </div>
    </div>
  );
}
