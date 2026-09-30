import { S as useNavigate, Y as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { h as useAppStore } from "./store-B4tRn7lE.mjs";
import { A as Layers, d as Store, p as Stamp } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./app-shell-DkvLa-n_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/offers-_AuWPKZA.js
var import_jsx_runtime = require_jsx_runtime();
function OffersPage() {
	const navigate = useNavigate();
	const menuLive = useAppStore((s) => s.business.menuLive);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		hideStats: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4 animate-fade-in pb-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl",
					children: "Create offers"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted mt-1",
					children: "Choose what guests see when they scan your QR."
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-2",
					children: [
						{
							title: "Stamp card",
							tag: "Visit rewards",
							icon: Stamp,
							to: "/stamp"
						},
						{
							title: "Scratch card",
							tag: "Instant gifts",
							icon: Layers,
							to: "/scratch"
						},
						{
							title: "Digital menu",
							tag: "QR menu",
							icon: Store,
							to: menuLive ? "/menu/live" : "/menu/edit"
						}
					].map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => navigate({ to: a.to }),
						className: "panel w-full p-4 flex items-center gap-4 text-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "size-12 rounded-md bg-primary-soft text-primary flex items-center justify-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(a.icon, { className: "size-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block font-semibold",
								children: a.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-sm text-muted",
								children: a.tag
							})]
						})]
					}, a.title))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "font-semibold mb-1",
						children: "Tip"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted leading-relaxed",
						children: "Keep a stamp card and a scratch prize live together. Guests see both on the scan page."
					})]
				})
			]
		})
	});
}
//#endregion
export { OffersPage as component };
