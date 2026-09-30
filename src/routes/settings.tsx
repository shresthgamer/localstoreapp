import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  Camera,
  ChevronRight,
  Download,
  HelpCircle,
  LogOut,
  Mail,
  MapPin,
  PlayCircle,
  Shield,
  Smartphone,
  Star,
  User,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/app-shell";
import { Overlay, Toggle } from "@/components/ui-bits";
import { UpgradeSheet } from "@/components/upgrade-sheet";
import { useAppStore } from "@/lib/store";
import { fileToDataUrl } from "@/lib/utils";

export const Route = createFileRoute("/settings")({ component: SettingsPage });

function SettingsPage() {
  const b = useAppStore((s) => s.business);
  const patch = useAppStore((s) => s.patchBusiness);
  const logout = useAppStore((s) => s.logout);
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const [hours, setHours] = useState(false);
  const [contact, setContact] = useState(false);
  const [social, setSocial] = useState(false);
  const [owner, setOwner] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [help, setHelp] = useState(false);
  const [upgrade, setUpgrade] = useState(false);
  const [name, setName] = useState(b.name);
  const [category, setCategory] = useState(b.category);
  const [about, setAbout] = useState(b.about ?? "");

  async function onLogo(file?: File) {
    if (!file) return;
    patch({ logo: await fileToDataUrl(file) });
    toast.success("Logo updated");
  }

  const rows = [
    { icon: MapPin, title: "Location & hours", sub: "Address and opening times", onClick: () => setHours(true) },
    { icon: Mail, title: "Phone & email", sub: b.email || "No email set", onClick: () => setContact(true) },
    { icon: Star, title: "Social & reviews", sub: "Shown on the guest scan page", onClick: () => setSocial(true) },
  ];

  return (
    <AppShell compactHeader title="Settings" subtitle="Your shop details, shown to guests">
      <div className="space-y-3 pb-8">
        <div className="panel p-5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 min-w-0">
              <div className="size-16 bg-surface rounded-xl border border-border relative shrink-0">
                <img className="size-full object-cover rounded-xl" alt="Logo" src={b.logo} />
                <label className="absolute -bottom-1 -right-1 size-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground border-2 border-surface cursor-pointer">
                  <Camera className="size-3.5" />
                  <input className="hidden" accept="image/*" type="file" onChange={(e) => onLogo(e.target.files?.[0])} />
                </label>
              </div>
              <div className="min-w-0">
                <h2 className="text-lg leading-tight truncate">{b.name}</h2>
                <p className="text-sm text-muted mt-0.5">{b.category}</p>
              </div>
            </div>
            <button type="button" onClick={() => setEdit(true)} className="btn-ghost px-4 h-10 text-sm">
              Edit
            </button>
          </div>
          {b.about ? <p className="text-sm text-muted mt-4 leading-relaxed">{b.about}</p> : null}
        </div>

        {rows.map((r) => (
          <button key={r.title} type="button" onClick={r.onClick} className="w-full panel p-4 flex items-center justify-between text-left">
            <div className="flex items-center gap-4">
              <div className="size-11 rounded-lg bg-primary-soft text-primary flex items-center justify-center">
                <r.icon className="size-5" />
              </div>
              <div>
                <h3 className="font-semibold">{r.title}</h3>
                <p className="text-sm text-muted">{r.sub}</p>
              </div>
            </div>
            <ChevronRight className="size-4 text-muted" />
          </button>
        ))}

        <div className="panel p-4 flex items-center justify-between">
          <div className="pr-4">
            <h3 className="font-semibold">Auto-approve scans</h3>
            <p className="text-sm text-muted">{b.autoApprove ? "Stamps apply immediately" : "You review each scan"}</p>
          </div>
          <Toggle on={b.autoApprove} onToggle={() => patch({ autoApprove: !b.autoApprove })} />
        </div>

        <div className="panel p-4 flex items-center justify-between">
          <div className="pr-4">
            <h3 className="font-semibold">Multiple scans</h3>
            <p className="text-sm text-muted">{b.allowMultipleScans ? "Guests can stamp more than once a day" : "One scan per guest per day"}</p>
          </div>
          <Toggle on={b.allowMultipleScans} onToggle={() => patch({ allowMultipleScans: !b.allowMultipleScans })} />
        </div>

        <button type="button" onClick={() => setOwner(true)} className="w-full panel p-4 flex items-center justify-between text-left">
          <div className="flex items-center gap-4">
            <div className="size-11 rounded-lg bg-primary-soft text-primary flex items-center justify-center">
              <User className="size-5" />
            </div>
            <div>
              <h3 className="font-semibold">{b.ownerName}</h3>
              <p className="text-sm text-muted">Owner account</p>
            </div>
          </div>
          <ChevronRight className="size-4 text-muted" />
        </button>

        <div className="panel overflow-hidden">
          <Row icon={PlayCircle} title="How to use Druto" sub="Short tutorial" onClick={() => window.open("https://www.youtube.com/results?search_query=druto+loyalty", "_blank")} />
          <Row icon={Download} title="Install app" sub="Add to home screen" onClick={() => toast.message("Open the browser menu and tap Add to Home Screen")} />
          <Row icon={Star} title="Subscription" sub="Manage your plan" onClick={() => setUpgrade(true)} />
          <Row icon={Shield} title="Privacy" sub="How guest data is stored" onClick={() => setPrivacy(true)} />
          <Row icon={HelpCircle} title="Help" sub="support@druto.in" last onClick={() => setHelp(true)} />
        </div>

        <button
          type="button"
          onClick={() => {
            logout();
            toast.success("Logged out");
            navigate({ to: "/" });
          }}
          className="btn-ghost w-full text-primary"
        >
          <LogOut className="size-4" /> Log out
        </button>
      </div>

      <Overlay open={edit} onClose={() => setEdit(false)}>
        <div className="p-5">
          <h2 className="text-lg mb-4">Edit shop</h2>
          <label className="text-xs font-medium uppercase tracking-widest text-muted">Name</label>
          <input className="field mt-1" value={name} onChange={(e) => setName(e.target.value)} />
          <label className="mt-3 block text-xs font-medium uppercase tracking-widest text-muted">Category</label>
          <input className="field mt-1" value={category} onChange={(e) => setCategory(e.target.value)} />
          <label className="mt-3 block text-xs font-medium uppercase tracking-widest text-muted">About</label>
          <textarea
            className="mt-1 w-full min-h-24 rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />
          <button
            type="button"
            onClick={() => {
              patch({ name, category, about });
              toast.success("Profile updated");
              setEdit(false);
            }}
            className="btn-primary w-full mt-5"
          >
            Save
          </button>
        </div>
      </Overlay>

      <Overlay open={hours} onClose={() => setHours(false)}>
        <div className="p-5">
          <h2 className="text-lg mb-1">Location & hours</h2>
          <label className="text-xs font-medium uppercase tracking-widest text-muted">Address</label>
          <input className="field mt-1" value={b.address} onChange={(e) => patch({ address: e.target.value })} />
          <div className="grid grid-cols-2 gap-2 mt-2">
            <input className="field" value={b.city} onChange={(e) => patch({ city: e.target.value })} placeholder="City" />
            <input className="field" value={b.pincode} onChange={(e) => patch({ pincode: e.target.value })} placeholder="Pincode" />
          </div>
          <div className="mt-4 space-y-2">
            {Object.entries(b.hours).map(([day, h]) => (
              <div key={day} className="flex items-center gap-2 text-sm">
                <span className="w-10 font-medium">{day}</span>
                <Toggle
                  on={!h.closed}
                  onToggle={() => patch({ hours: { ...b.hours, [day]: { ...h, closed: !h.closed } } })}
                />
                <input className="h-10 rounded-md border border-border px-2 w-24" type="time" value={h.open} disabled={h.closed} onChange={(e) => patch({ hours: { ...b.hours, [day]: { ...h, open: e.target.value } } })} />
                <input className="h-10 rounded-md border border-border px-2 w-24" type="time" value={h.close} disabled={h.closed} onChange={(e) => patch({ hours: { ...b.hours, [day]: { ...h, close: e.target.value } } })} />
              </div>
            ))}
          </div>
          <button type="button" onClick={() => { toast.success("Hours saved"); setHours(false); }} className="btn-primary w-full mt-5">
            Save
          </button>
        </div>
      </Overlay>

      <Overlay open={contact} onClose={() => setContact(false)}>
        <div className="p-5">
          <h2 className="text-lg mb-4">Phone & email</h2>
          <input className="field mb-2" value={b.phone} onChange={(e) => patch({ phone: e.target.value })} placeholder="Phone" />
          <input className="field" value={b.email} onChange={(e) => patch({ email: e.target.value })} placeholder="Email" />
          <button type="button" onClick={() => { toast.success("Contact saved"); setContact(false); }} className="btn-primary w-full mt-5">Save</button>
        </div>
      </Overlay>

      <Overlay open={social} onClose={() => setSocial(false)}>
        <div className="p-5 space-y-2">
          <h2 className="text-lg mb-2">Social links</h2>
          <input className="field" placeholder="Instagram URL" value={b.instagram} onChange={(e) => patch({ instagram: e.target.value })} />
          <input className="field" placeholder="Google review URL" value={b.googleReview} onChange={(e) => patch({ googleReview: e.target.value })} />
          <input className="field" placeholder="Facebook URL" value={b.facebook} onChange={(e) => patch({ facebook: e.target.value })} />
          <input className="field" placeholder="YouTube URL" value={b.youtube} onChange={(e) => patch({ youtube: e.target.value })} />
          <input className="field" placeholder="LinkedIn URL" value={b.linkedin} onChange={(e) => patch({ linkedin: e.target.value })} />
          <button type="button" onClick={() => { toast.success("Links saved"); setSocial(false); }} className="btn-primary w-full mt-3">Save</button>
        </div>
      </Overlay>

      <Overlay open={owner} onClose={() => setOwner(false)}>
        <div className="p-5">
          <h2 className="text-lg mb-4">Owner account</h2>
          <input className="field mb-2" value={b.ownerName} onChange={(e) => patch({ ownerName: e.target.value })} />
          <input className="field" value={b.ownerPhone} onChange={(e) => patch({ ownerPhone: e.target.value })} />
          <button type="button" onClick={() => { toast.success("Owner updated"); setOwner(false); }} className="btn-primary w-full mt-5">Save</button>
        </div>
      </Overlay>

      <Overlay open={privacy} onClose={() => setPrivacy(false)}>
        <div className="p-5">
          <h2 className="text-lg mb-2">Privacy</h2>
          <p className="text-sm text-muted leading-relaxed">
            Guest phone numbers stay on this device in this demo. Auto-approve and multi-scan live on the dashboard. Export a CSV from Customers anytime.
          </p>
        </div>
      </Overlay>

      <Overlay open={help} onClose={() => setHelp(false)}>
        <div className="p-5">
          <h2 className="text-lg mb-2">Help</h2>
          <p className="text-sm text-muted">Email support@druto.in — we reply in English and Hindi.</p>
          <a href="mailto:support@druto.in" className="btn-primary w-full mt-4">
            Email support
          </a>
        </div>
      </Overlay>

      <UpgradeSheet open={upgrade} onClose={() => setUpgrade(false)} />
    </AppShell>
  );
}

function Row({
  icon: Icon,
  title,
  sub,
  onClick,
  last,
}: {
  icon: typeof Mail;
  title: string;
  sub: string;
  onClick: () => void;
  last?: boolean;
}) {
  return (
    <button type="button" onClick={onClick} className={`p-4 flex items-center justify-between w-full ${last ? "" : "border-b border-border"}`}>
      <div className="flex items-center gap-4">
        <div className="size-10 rounded-lg bg-primary-soft text-primary flex items-center justify-center">
          <Icon className="size-4" />
        </div>
        <div className="text-left">
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm text-muted">{sub}</p>
        </div>
      </div>
      <ChevronRight className="size-4 text-muted" />
    </button>
  );
}
