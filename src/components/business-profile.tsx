import {
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Star,
  Youtube,
} from "lucide-react";
import type { Business, ScratchPrize, StampProgram } from "@/lib/types";
import { asHref, formatHoursLine, formatPhoneDisplay, mapsHref, telHref, todayHours } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function BusinessHero({ business }: { business: Business }) {
  return (
    <header className="text-center">
      <div className="flex justify-center">
        <div className="size-20 rounded-full p-1 bg-surface shadow-card">
          <img src={business.logo} alt="" className="size-full rounded-full object-cover" />
        </div>
      </div>
      <p className="eyebrow mt-5">{business.category}</p>
      <h1 className="text-3xl mt-1">{business.name}</h1>
      {business.about ? <p className="text-sm text-muted mt-3 leading-relaxed">{business.about}</p> : null}
    </header>
  );
}

export function BusinessDetails({
  business,
  compact,
}: {
  business: Business;
  compact?: boolean;
}) {
  const { key, day } = todayHours(business.hours);
  const phone = telHref(business.phone);
  const maps = mapsHref(business.address, business.city, business.pincode);
  const socials = [
    { href: asHref(business.instagram), label: "Instagram", icon: Instagram },
    { href: asHref(business.facebook), label: "Facebook", icon: Facebook },
    { href: asHref(business.youtube), label: "YouTube", icon: Youtube },
    { href: asHref(business.linkedin), label: "LinkedIn", icon: Linkedin },
    { href: asHref(business.googleReview), label: "Google reviews", icon: Star },
  ].filter((s) => s.href);

  return (
    <div className="space-y-3">
      {compact ? null : (
        <div className="panel p-5 space-y-3">
          <p className="eyebrow">Visit</p>
          <a href={maps} target="_blank" rel="noreferrer" className="flex items-start gap-3 text-sm min-h-11">
            <MapPin className="size-4 mt-0.5 text-muted shrink-0" />
            <span>
              {business.address}
              {business.city ? `, ${business.city}` : ""}
              {business.pincode ? ` ${business.pincode}` : ""}
            </span>
          </a>
          {phone ? (
            <a href={phone} className="flex items-center gap-3 text-sm min-h-11">
              <Phone className="size-4 text-muted shrink-0" />
              {formatPhoneDisplay(business.phone)}
            </a>
          ) : null}
          {business.email ? (
            <a href={`mailto:${business.email}`} className="flex items-center gap-3 text-sm min-h-11">
              <Mail className="size-4 text-muted shrink-0" />
              {business.email}
            </a>
          ) : null}
          <p className="flex items-center gap-3 text-sm">
            <Clock className="size-4 text-muted shrink-0" />
            Today ({key}) · {formatHoursLine(day)}
          </p>
        </div>
      )}

      <div className="panel p-5">
        <p className="eyebrow mb-4">Hours</p>
        <ul className="space-y-2">
          {Object.entries(business.hours).map(([d, h]) => (
            <li key={d} className="flex items-center justify-between text-sm">
              <span className={cn(d === key ? "text-fg" : "text-muted")}>{d}</span>
              <span className={cn("tabular-nums", h.closed || d !== key ? "text-muted" : "")}>
                {formatHoursLine(h)}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {socials.length ? (
        <div className="panel p-5">
          <p className="eyebrow mb-4">Follow</p>
          <div className="flex flex-wrap gap-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 h-11 px-3 rounded-md bg-elevated text-sm font-medium"
              >
                <s.icon className="size-4" />
                {s.label}
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function OwnerPrograms({
  stamps,
  scratches,
}: {
  stamps: StampProgram[];
  scratches: ScratchPrize[];
}) {
  const activeStamps = stamps.filter((s) => s.active);
  const activeScratch = scratches.filter((s) => s.active);
  if (!activeStamps.length && !activeScratch.length) return null;

  return (
    <div className="space-y-3">
      {activeStamps.map((p) => (
        <article key={p.id} className="panel p-4 flex gap-4">
          <img src={p.image || "/images/reward.svg"} alt="" className="size-14 rounded-md object-cover bg-primary-soft" />
          <div className="min-w-0">
            <p className="eyebrow">Stamp card</p>
            <h3 className="text-base mt-1 leading-snug">{p.description}</h3>
            <p className="text-sm text-muted mt-1">
              {p.visitsRequired} visits · valid {p.expiryDays} days
            </p>
          </div>
        </article>
      ))}
      {activeScratch.map((p) => (
        <article key={p.id} className="panel p-4 flex gap-4">
          <img src={p.image || "/images/reward.svg"} alt="" className="size-14 rounded-md object-cover bg-primary-soft" />
          <div className="min-w-0">
            <p className="eyebrow">Scratch reward</p>
            <h3 className="text-base mt-1 leading-snug">{p.title}</h3>
            <p className="text-sm text-muted mt-1">
              1 in {p.winnersOutOf} wins · valid {p.expiryDays} days
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
