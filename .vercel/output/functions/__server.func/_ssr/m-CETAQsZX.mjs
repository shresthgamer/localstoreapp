import { Y as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { h as useAppStore, n as cn, s as formatInr } from "./store-B4tRn7lE.mjs";
import { n as BusinessHero, t as BusinessDetails } from "./business-profile-Bl0KPctj.mjs";
import { r as VegMark } from "./ui-bits-yFL1YA4g.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/m-CETAQsZX.js
var import_jsx_runtime = require_jsx_runtime();
function PublicMenu() {
	const b = useAppStore((s) => s.business);
	const menu = useAppStore((s) => s.menu);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "guest-page",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "px-4 pt-12 pb-16 max-w-lg mx-auto space-y-5 stagger-in",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BusinessHero, { business: b }),
				menu.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg mb-3",
					children: cat.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-2",
					children: cat.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: cn("panel p-3 flex gap-3", !item.inStock && "opacity-50"),
						children: [item.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: item.image,
							alt: "",
							className: "size-16 rounded-md object-cover shrink-0"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "size-16 rounded-md shrink-0 bg-primary-soft" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 min-w-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VegMark, { veg: item.veg }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-medium text-sm truncate",
											children: item.name
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium text-sm shrink-0 tabular-nums",
										children: formatInr(item.price)
									})]
								}),
								item.description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted mt-1",
									children: item.description
								}) : null,
								!item.inStock ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-medium mt-1 text-muted",
									children: "Out of stock"
								}) : null
							]
						})]
					}, item.id))
				})] }, cat.id)),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BusinessDetails, { business: b }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/c",
					className: "btn-primary w-full",
					children: "Collect stamps"
				})
			]
		})
	});
}
//#endregion
export { PublicMenu as component };
