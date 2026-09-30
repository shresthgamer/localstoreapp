import { i as __toESM } from "../_runtime.mjs";
import { X as require_react, Y as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { h as useAppStore, l as formatShortDate, n as cn, u as initials } from "./store-B4tRn7lE.mjs";
import { P as Gift, _ as Search, c as Trophy } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as AppShell } from "./app-shell-DkvLa-n_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/winners-DkJPZCFC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function WinnersPage() {
	const winners = useAppStore((s) => s.winners);
	const customers = useAppStore((s) => s.customers);
	const claim = useAppStore((s) => s.claimWinner);
	const [tab, setTab] = (0, import_react.useState)("stamp");
	const [q, setQ] = (0, import_react.useState)("");
	const rows = (0, import_react.useMemo)(() => {
		return winners.filter((w) => tab === "stamp" ? w.type === "stamp" : w.type === "scratch").map((w) => ({
			...w,
			customer: customers.find((c) => c.id === w.customerId)
		})).filter((w) => {
			if (!q) return true;
			return `${w.customer?.name ?? ""} ${w.customer?.phone ?? ""}`.toLowerCase().includes(q.toLowerCase());
		}).sort((a, b) => Number(a.claimed) - Number(b.claimed));
	}, [
		winners,
		customers,
		tab,
		q
	]);
	const stampCount = winners.filter((w) => w.type === "stamp").length;
	const scratchCount = winners.filter((w) => w.type === "scratch").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		hideStats: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4 animate-fade-in pb-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setTab("stamp"),
						className: cn("flex-1 h-11 rounded-md font-medium text-sm", tab === "stamp" ? "bg-primary text-primary-foreground" : "btn-ghost"),
						children: ["Stamps ", stampCount]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setTab("scratch"),
						className: cn("flex-1 h-11 rounded-md font-medium text-sm", tab === "scratch" ? "bg-primary text-primary-foreground" : "btn-ghost"),
						children: ["Scratch ", scratchCount]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Unclaimed rewards stay at the top."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-4 top-1/2 -translate-y-1/2 text-muted size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						placeholder: "Search by name or phone",
						className: "field pl-11",
						value: q,
						onChange: (e) => setQ(e.target.value)
					})]
				}),
				rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center py-16 panel",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "size-10 text-muted mb-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium",
						children: "No claimed rewards yet."
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-2",
					children: rows.map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "panel p-4 flex items-center gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "size-11 rounded-full bg-primary-soft text-primary font-semibold flex items-center justify-center",
								children: initials(w.customer?.name ?? "?")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-medium truncate",
										children: w.customer?.name ?? "Customer"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted",
										children: w.customer?.phone
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm mt-1 line-clamp-2",
										children: w.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted",
										children: formatShortDate(w.createdAt)
									})
								]
							}),
							w.claimed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-medium uppercase tracking-wide text-muted",
								children: "Claimed"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => {
									claim(w.id);
									toast.success("Reward marked as claimed");
								},
								className: "btn-primary h-10 px-3 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gift, { className: "size-3.5" }), " Claim"]
							})
						]
					}, w.id))
				})
			]
		})
	});
}
//#endregion
export { WinnersPage as component };
