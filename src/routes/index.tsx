import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { AppShell, HeaderStats } from "@/components/app-shell";
import { QrActions } from "@/components/qr-actions";
import { QrImage } from "@/components/qr-block";
import { usePublicUrl } from "@/lib/actions";
import { useAppStore, useStats } from "@/lib/store";
import { formatChartTick } from "@/lib/utils";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const navigate = useNavigate();
  const business = useAppStore((s) => s.business);
  const stamps = useAppStore((s) => s.stamps);
  const stats = useStats();
  const url = usePublicUrl("/c");
  const program = stamps.find((s) => s.active) ?? stamps[0];

  return (
    <AppShell stats={<HeaderStats scans={stats.scans} users={stats.users} rewards={stats.rewards} repeatPct={stats.repeatPct} />}>
      <div className="space-y-4 animate-fade-in pb-8">
        <div className="panel p-5">
          <h2 className="text-lg">Your QR code</h2>
          <p className="text-sm text-muted mt-1">Guests scan this to see your shop and collect stamps.</p>
          <div className="flex flex-col items-center mt-4">
            <button
              type="button"
              onClick={() => navigate({ to: "/presenter" })}
              className="qr-plate"
              title="Open presenter view"
            >
              <QrImage value={url} alt="Business QR Code" className="size-40 object-contain" />
            </button>
            <p className="text-sm text-muted mt-3">Scan to collect rewards</p>
          </div>
          <div className="mt-4">
            <QrActions url={url} businessName={business.name} filename={`${business.name}-qr.png`} />
          </div>
        </div>

        <div className="panel p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg">Reward program</h2>
            <button type="button" onClick={() => navigate({ to: "/stamp" })} className="text-sm font-medium text-primary">
              Edit
            </button>
          </div>
          {program ? (
            <button
              type="button"
              onClick={() => navigate({ to: "/stamp" })}
              className="w-full rounded-md bg-elevated p-3 flex items-center gap-3 text-left"
            >
              <img alt="" src={program.image || "/images/reward.svg"} className="size-12 rounded-md object-cover" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium leading-snug">{program.description}</p>
                <p className="text-xs text-muted mt-1 flex items-center gap-1">
                  <Star className="size-3" /> {program.visitsRequired} stamps · {program.expiryDays} days
                </p>
              </div>
            </button>
          ) : (
            <p className="text-sm text-muted">No stamp program yet.</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="panel p-4 text-center">
            <p className="text-2xl font-semibold tabular-nums">{stats.scansToday}</p>
            <p className="text-xs uppercase tracking-wider text-muted mt-1">Scans today</p>
          </div>
          <div className="panel p-4 text-center">
            <p className="text-2xl font-semibold tabular-nums">{stats.completedToday}</p>
            <p className="text-xs uppercase tracking-wider text-muted mt-1">Completed</p>
          </div>
        </div>

        <ChartCard
          title="Weekly scans"
          subtitle="Last 7 days"
          value={stats.week.reduce((a, b) => a + b.scans, 0)}
          hint={`~${(stats.week.reduce((a, b) => a + b.scans, 0) / 7).toFixed(1)} / day`}
          color="var(--color-primary)"
          dataKey="scans"
          data={stats.week}
        />
        <ChartCard
          title="Guests"
          subtitle="Total customers"
          value={stats.users}
          hint="all time"
          color="var(--color-muted)"
          dataKey="customers"
          data={stats.week}
        />
      </div>
    </AppShell>
  );
}

function ChartCard({
  title,
  subtitle,
  value,
  hint,
  color,
  dataKey,
  data,
}: {
  title: string;
  subtitle: string;
  value: number;
  hint: string;
  color: string;
  dataKey: "scans" | "customers";
  data: { date: string; scans: number; customers: number }[];
}) {
  const gradId = `g-${dataKey}`;
  return (
    <div className="panel p-5">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-lg">{title}</h2>
          <p className="text-xs text-muted mt-0.5">{subtitle}</p>
        </div>
        <div className="text-right">
          <p className="text-xl font-semibold leading-none tabular-nums">{value}</p>
          <p className="text-xs text-muted mt-0.5">{hint}</p>
        </div>
      </div>
      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.18} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
            <XAxis
              dataKey="date"
              tickFormatter={formatChartTick}
              tick={{ fontSize: 10, fill: "var(--color-muted)" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis allowDecimals={false} tick={{ fontSize: 10, fill: "var(--color-muted)" }} axisLine={false} tickLine={false} width={28} />
            <Tooltip labelFormatter={(v) => formatChartTick(String(v))} />
            <Area type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} fill={`url(#${gradId})`} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
