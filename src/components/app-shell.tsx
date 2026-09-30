import { useEffect, type ReactNode } from "react";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { ChevronLeft, Gift, LayoutGrid, Sparkles, UserRound, Users } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { LoginGate } from "./login-gate";

const NAV = [
  { to: "/", label: "Home", icon: LayoutGrid },
  { to: "/customers", label: "Guests", icon: Users },
  { to: "/winners", label: "Rewards", icon: Gift },
  { to: "/offers", label: "Offers", icon: Sparkles },
] as const;

export function AppShell({
  children,
  stats,
  compactHeader,
  title,
  subtitle,
  hideStats,
}: {
  children: ReactNode;
  stats?: ReactNode;
  compactHeader?: boolean;
  title?: string;
  subtitle?: string;
  hideStats?: boolean;
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const business = useAppStore((s) => s.business);
  const session = useAppStore((s) => s.session);
  const setHydrated = useAppStore((s) => s.setHydrated);

  useEffect(() => {
    void (async () => {
      await useAppStore.persist.rehydrate();
      setHydrated();
    })();
  }, [setHydrated]);

  if (!session) return <LoginGate />;

  return (
    <div className="min-h-screen bg-background font-sans flex flex-col">
      <main className="w-full flex-1 max-w-xl mx-auto">
        <div className="min-h-screen flex flex-col pb-24">
          {compactHeader ? (
            <header className="px-4 pt-6 pb-4">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => navigate({ to: "/" })}
                  className="size-11 rounded-md bg-surface shadow-card flex items-center justify-center"
                  aria-label="Back"
                >
                  <ChevronLeft className="size-5" />
                </button>
                <div>
                  <h1 className="text-xl leading-tight">{title}</h1>
                  {subtitle ? <p className="text-sm text-muted mt-0.5">{subtitle}</p> : null}
                </div>
              </div>
            </header>
          ) : (
            <header className="px-4 pt-6 pb-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    alt=""
                    src={business.logo}
                    className="size-11 rounded-full object-cover bg-surface shadow-card"
                  />
                  <div className="min-w-0">
                    <h1 className="text-lg leading-tight truncate">{business.name}</h1>
                    <p className="text-xs text-muted">{business.category}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => navigate({ to: "/settings" })}
                  className="size-11 rounded-full bg-surface shadow-card flex items-center justify-center"
                  aria-label="Profile and settings"
                >
                  <UserRound className="size-5" />
                </button>
              </div>
              {!hideStats && stats ? <div className="mt-4">{stats}</div> : null}
            </header>
          )}

          <div className="flex-1 w-full mx-auto px-4 pt-2">{children}</div>

          <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/92 backdrop-blur-md pb-safe">
            <div className="flex items-center justify-around h-16 max-w-xl mx-auto px-2 border-t border-border">
              {NAV.map((item) => {
                const active =
                  item.to === "/"
                    ? location.pathname === "/"
                    : location.pathname === item.to || location.pathname.startsWith(item.to + "/");
                const Icon = item.icon;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={cn(
                      "flex flex-col items-center justify-center gap-1 flex-1 min-h-11 text-xs font-medium whitespace-nowrap",
                      active ? "text-primary" : "text-muted",
                    )}
                  >
                    <Icon className="size-5" strokeWidth={active ? 2.2 : 1.7} />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
      </main>
    </div>
  );
}

export function HeaderStats({
  scans,
  users,
  rewards,
  repeatPct,
}: {
  scans: number;
  users: number;
  rewards: number;
  repeatPct: number;
}) {
  const cells = [
    { n: String(scans), l: "Scans" },
    { n: String(users), l: "Guests" },
    { n: String(rewards), l: "Rewards" },
    { n: `${repeatPct}%`, l: "Repeat" },
  ];
  return (
    <div className="grid grid-cols-4 gap-2">
      {cells.map((c) => (
        <div key={c.l} className="panel px-2 py-3 text-center">
          <p className="text-lg font-medium tabular-nums leading-none">{c.n}</p>
          <p className="eyebrow mt-2">{c.l}</p>
        </div>
      ))}
    </div>
  );
}
