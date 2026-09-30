import { i as __toESM } from "../_runtime.mjs";
import { X as require_react, Y as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { h as useAppStore, l as formatShortDate, n as cn, r as downloadText, u as initials } from "./store-B4tRn7lE.mjs";
import { K as Calendar, L as Download, _ as Search, b as Plus, r as Users } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as AppShell } from "./app-shell-DkvLa-n_.mjs";
import { t as Overlay } from "./ui-bits-yFL1YA4g.mjs";
import { t as copyText } from "./actions-Cod9q5YL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/customers-mWZ3U46x.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CustomersPage() {
	const customers = useAppStore((s) => s.customers);
	const stamps = useAppStore((s) => s.stamps);
	const addCustomer = useAppStore((s) => s.addCustomer);
	const giveStamp = useAppStore((s) => s.giveStamp);
	const required = stamps[0]?.visitsRequired ?? 8;
	const [q, setQ] = (0, import_react.useState)("");
	const [from, setFrom] = (0, import_react.useState)("");
	const [to, setTo] = (0, import_react.useState)("");
	const [tab, setTab] = (0, import_react.useState)("all");
	const [open, setOpen] = (0, import_react.useState)(false);
	const [name, setName] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const rows = (0, import_react.useMemo)(() => {
		return customers.filter((c) => {
			const blob = (c.name + c.phone).toLowerCase();
			if (q && !blob.includes(q.toLowerCase())) return false;
			if (from && c.lastVisit < from) return false;
			if (to && c.lastVisit > to) return false;
			if (tab === "active") return c.stamps > 0 && c.stamps < required;
			if (tab === "completed") return c.stamps === 0 && c.lastVisit !== c.createdAt;
			return true;
		});
	}, [
		customers,
		q,
		from,
		to,
		tab,
		required
	]);
	async function csv() {
		const text = "Name,Phone,Stamps,Last visit\n" + rows.map((c) => `${c.name},${c.phone},${c.stamps}/${required},${c.lastVisit}`).join("\n");
		downloadText("customers.csv", text, "text/csv");
		const copied = await copyText(text);
		toast.success(copied ? "CSV saved and copied" : "CSV download started");
	}
	function add() {
		if (!name.trim() || phone.replace(/\D/g, "").length < 10) {
			toast.error("Name and 10-digit phone required");
			return;
		}
		addCustomer({
			name: name.trim(),
			phone: phone.replace(/\D/g, "").slice(-10),
			notes: ""
		});
		toast.success("Customer added");
		setOpen(false);
		setName("");
		setPhone("");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		hideStats: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4 animate-fade-in pb-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-4 top-1/2 -translate-y-1/2 text-muted size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								placeholder: "Search by phone or name",
								className: "field pl-11",
								value: q,
								onChange: (e) => setQ(e.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 text-muted size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: "field pl-9",
										type: "date",
										value: from,
										onChange: (e) => setFrom(e.target.value)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 text-muted size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: "field pl-9",
										type: "date",
										value: to,
										onChange: (e) => setTo(e.target.value)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: csv,
									className: "btn-ghost px-3",
									"aria-label": "Download CSV",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" })
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setOpen(true),
							className: "btn-primary w-full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " Add customer"]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-2",
					children: [
						"all",
						"active",
						"completed"
					].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setTab(t),
						className: cn("px-4 h-11 rounded-full text-sm font-medium capitalize", tab === t ? "bg-primary text-primary-foreground" : "bg-surface border border-border text-muted"),
						children: t
					}, t))
				}),
				rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center justify-center py-16 panel",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "mb-3 size-10 text-muted" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-base mb-1",
							children: "No customers yet"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "Share your QR code to start building a guest list"
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-2",
					children: rows.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "panel p-4 flex items-center gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "size-11 rounded-full bg-primary-soft text-primary font-semibold flex items-center justify-center",
								children: initials(c.name)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-medium truncate",
										children: c.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted",
										children: c.phone
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted mt-0.5",
										children: [
											c.stamps,
											"/",
											required,
											" stamps · last ",
											formatShortDate(c.lastVisit)
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									const r = giveStamp(c.id);
									toast.success(r.completed ? `${c.name} completed a card` : `Stamp given to ${c.name}`);
								},
								className: "btn-primary h-10 px-3 text-sm",
								children: "Stamp"
							})
						]
					}, c.id))
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, {
			open,
			onClose: () => setOpen(false),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg mb-4",
						children: "Add customer"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-xs font-medium uppercase tracking-widest text-muted",
						children: "Name"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "field mt-1",
						value: name,
						onChange: (e) => setName(e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "mt-3 block text-xs font-medium uppercase tracking-widest text-muted",
						children: "Phone"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "field mt-1",
						value: phone,
						onChange: (e) => setPhone(e.target.value),
						inputMode: "numeric"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: add,
						className: "btn-primary w-full mt-5",
						children: "Save"
					})
				]
			})
		})]
	});
}
//#endregion
export { CustomersPage as component };
