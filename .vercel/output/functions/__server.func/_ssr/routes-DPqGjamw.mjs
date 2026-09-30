import { S as useNavigate, Y as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as formatChartTick, g as useStats, h as useAppStore } from "./store-B4tRn7lE.mjs";
import { f as Star } from "../_libs/lucide-react.mjs";
import { n as HeaderStats, t as AppShell } from "./app-shell-DkvLa-n_.mjs";
import { o as usePublicUrl } from "./actions-Cod9q5YL.mjs";
import { t as QrImage } from "./qr-block-BmByxBJE.mjs";
import { t as QrActions } from "./qr-actions-DJych0gu.mjs";
import { a as CartesianGrid, i as Area, n as YAxis, o as ResponsiveContainer, r as XAxis, s as Tooltip, t as AreaChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DPqGjamw.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const navigate = useNavigate();
	const business = useAppStore((s) => s.business);
	const stamps = useAppStore((s) => s.stamps);
	const stats = useStats();
	const url = usePublicUrl("/c");
	const program = stamps.find((s) => s.active) ?? stamps[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		stats: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeaderStats, {
			scans: stats.scans,
			users: stats.users,
			rewards: stats.rewards,
			repeatPct: stats.repeatPct
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4 animate-fade-in pb-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg",
							children: "Your QR code"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted mt-1",
							children: "Guests scan this to see your shop and collect stamps."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-center mt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => navigate({ to: "/presenter" }),
								className: "qr-plate",
								title: "Open presenter view",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrImage, {
									value: url,
									alt: "Business QR Code",
									className: "size-40 object-contain"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted mt-3",
								children: "Scan to collect rewards"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrActions, {
								url,
								businessName: business.name,
								filename: `${business.name}-qr.png`
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between mb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg",
							children: "Reward program"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => navigate({ to: "/stamp" }),
							className: "text-sm font-medium text-primary",
							children: "Edit"
						})]
					}), program ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => navigate({ to: "/stamp" }),
						className: "w-full rounded-md bg-elevated p-3 flex items-center gap-3 text-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							alt: "",
							src: program.image || "/images/reward.svg",
							className: "size-12 rounded-md object-cover"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium leading-snug",
								children: program.description
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted mt-1 flex items-center gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-3" }),
									" ",
									program.visitsRequired,
									" stamps · ",
									program.expiryDays,
									" days"
								]
							})]
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "No stamp program yet."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "panel p-4 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-2xl font-semibold tabular-nums",
							children: stats.scansToday
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-wider text-muted mt-1",
							children: "Scans today"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "panel p-4 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-2xl font-semibold tabular-nums",
							children: stats.completedToday
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-wider text-muted mt-1",
							children: "Completed"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartCard, {
					title: "Weekly scans",
					subtitle: "Last 7 days",
					value: stats.week.reduce((a, b) => a + b.scans, 0),
					hint: `~${(stats.week.reduce((a, b) => a + b.scans, 0) / 7).toFixed(1)} / day`,
					color: "var(--color-primary)",
					dataKey: "scans",
					data: stats.week
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartCard, {
					title: "Guests",
					subtitle: "Total customers",
					value: stats.users,
					hint: "all time",
					color: "var(--color-muted)",
					dataKey: "customers",
					data: stats.week
				})
			]
		})
	});
}
function ChartCard({ title, subtitle, value, hint, color, dataKey, data }) {
	const gradId = `g-${dataKey}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "panel p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex justify-between items-start mb-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-lg",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted mt-0.5",
				children: subtitle
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-right",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xl font-semibold leading-none tabular-nums",
					children: value
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted mt-0.5",
					children: hint
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-40",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
				width: "100%",
				height: "100%",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
					data,
					margin: {
						top: 8,
						right: 8,
						left: 0,
						bottom: 0
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
							id: gradId,
							x1: "0",
							y1: "0",
							x2: "0",
							y2: "1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "5%",
								stopColor: color,
								stopOpacity: .18
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "95%",
								stopColor: color,
								stopOpacity: 0
							})]
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
							strokeDasharray: "3 3",
							stroke: "var(--color-border)",
							vertical: false
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
							dataKey: "date",
							tickFormatter: formatChartTick,
							tick: {
								fontSize: 10,
								fill: "var(--color-muted)"
							},
							axisLine: false,
							tickLine: false
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
							allowDecimals: false,
							tick: {
								fontSize: 10,
								fill: "var(--color-muted)"
							},
							axisLine: false,
							tickLine: false,
							width: 28
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { labelFormatter: (v) => formatChartTick(String(v)) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
							type: "monotone",
							dataKey,
							stroke: color,
							strokeWidth: 2,
							fill: `url(#${gradId})`
						})
					]
				})
			})
		})]
	});
}
//#endregion
export { Home as component };
