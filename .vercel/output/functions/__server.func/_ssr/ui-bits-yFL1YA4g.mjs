import { i as __toESM } from "../_runtime.mjs";
import { X as require_react, Y as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as cn } from "./store-B4tRn7lE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ui-bits-yFL1YA4g.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Toggle({ on, onToggle, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		role: "switch",
		"aria-checked": on,
		onClick: onToggle,
		className: cn("h-6 w-11 shrink-0 rounded-full px-1 flex items-center transition-colors duration-150", on ? "bg-primary" : "bg-elevated", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("block size-4 rounded-full shadow-sm transition-transform duration-150", on ? "translate-x-5 bg-primary-foreground" : "translate-x-0 bg-muted") })
	});
}
function Overlay({ open, onClose, children, className }) {
	if (!open) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OverlayBody, {
		onClose,
		className,
		children
	});
}
function OverlayBody({ onClose, children, className }) {
	(0, import_react.useEffect)(() => {
		function onKey(e) {
			if (e.key === "Escape") onClose();
		}
		window.addEventListener("keydown", onKey);
		const prev = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			window.removeEventListener("keydown", onKey);
			document.body.style.overflow = prev;
		};
	}, [onClose]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-[80] flex items-end justify-center sm:items-center p-0 sm:p-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			"aria-label": "Close",
			className: "absolute inset-0 bg-background/70",
			onClick: onClose
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("relative z-10 w-full max-w-md bg-surface rounded-t-2xl sm:rounded-2xl shadow-soft max-h-[92vh] overflow-y-auto animate-fade-in", className),
			children
		})]
	});
}
function VegMark({ veg }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex size-4 items-center justify-center rounded-sm shrink-0", veg ? "shadow-[inset_0_0_0_1px_var(--color-success)]" : "shadow-[inset_0_0_0_1px_var(--color-danger)]"),
		title: veg ? "Vegetarian" : "Non-veg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-1.5 rounded-full", veg ? "bg-success" : "bg-danger") })
	});
}
//#endregion
export { Toggle as n, VegMark as r, Overlay as t };
