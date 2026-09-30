import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Layers, Stamp, Store } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { useAppStore } from "@/lib/store";

export const Route = createFileRoute("/offers")({ component: OffersPage });

function OffersPage() {
  const navigate = useNavigate();
  const menuLive = useAppStore((s) => s.business.menuLive);
  const apps = [
    {
      title: "Stamp card",
      tag: "Visit rewards",
      icon: Stamp,
      to: "/stamp" as const,
    },
    {
      title: "Scratch card",
      tag: "Instant gifts",
      icon: Layers,
      to: "/scratch" as const,
    },
    {
      title: "Digital menu",
      tag: "QR menu",
      icon: Store,
      to: (menuLive ? "/menu/live" : "/menu/edit") as "/menu/live" | "/menu/edit",
    },
  ];

  return (
    <AppShell hideStats>
      <div className="space-y-4 animate-fade-in pb-8">
        <div>
          <h2 className="text-2xl">Create offers</h2>
          <p className="text-sm text-muted mt-1">Choose what guests see when they scan your QR.</p>
        </div>
        <div className="space-y-2">
          {apps.map((a) => (
            <button
              key={a.title}
              type="button"
              onClick={() => navigate({ to: a.to })}
              className="panel w-full p-4 flex items-center gap-4 text-left"
            >
              <span className="size-12 rounded-md bg-primary-soft text-primary flex items-center justify-center">
                <a.icon className="size-5" />
              </span>
              <span className="flex-1">
                <span className="block font-semibold">{a.title}</span>
                <span className="block text-sm text-muted">{a.tag}</span>
              </span>
            </button>
          ))}
        </div>
        <div className="panel p-4">
          <h4 className="font-semibold mb-1">Tip</h4>
          <p className="text-sm text-muted leading-relaxed">
            Keep a stamp card and a scratch prize live together. Guests see both on the scan page.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
