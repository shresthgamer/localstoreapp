import { S as useNavigate, Y as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { h as useAppStore } from "./store-B4tRn7lE.mjs";
import { U as ChevronLeft } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./app-shell-DkvLa-n_.mjs";
import { o as usePublicUrl } from "./actions-Cod9q5YL.mjs";
import { t as QrImage } from "./qr-block-BmByxBJE.mjs";
import { t as QrActions } from "./qr-actions-DJych0gu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/menu.live-BWSw9Fvu.js
var import_jsx_runtime = require_jsx_runtime();
function MenuLivePage() {
	const navigate = useNavigate();
	const business = useAppStore((s) => s.business);
	const url = usePublicUrl("/m");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		hideStats: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full mx-auto pb-8 animate-fade-in",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => navigate({ to: "/offers" }),
					className: "flex items-center gap-1.5 mt-1 text-muted text-sm min-h-11",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4" }), " Back"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-6 mt-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl",
						children: "Digital menu"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted mt-1",
						children: "Live and ready for guests."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel-lg p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex justify-center mb-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "qr-plate size-64",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrImage, {
								value: url,
								alt: "Digital Menu QR",
								className: "size-full object-contain"
							})
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrActions, {
						url,
						businessName: business.name,
						filename: `${business.name}-menu-qr.png`,
						kind: "menu",
						linkLabel: "Menu link",
						previewTo: "/m",
						previewLabel: "Preview as a guest",
						showPresenter: false
					})]
				})
			]
		})
	});
}
//#endregion
export { MenuLivePage as component };
