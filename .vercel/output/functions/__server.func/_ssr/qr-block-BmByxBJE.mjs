import { i as __toESM } from "../_runtime.mjs";
import { X as require_react, Y as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as cn } from "./store-B4tRn7lE.mjs";
import { a as triggerDownload } from "./actions-Cod9q5YL.mjs";
import { t as require_lib } from "../_libs/qrcode.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/qr-block-BmByxBJE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_lib = /* @__PURE__ */ __toESM(require_lib());
function useQrDataUrl(value, size = 320) {
	const [src, setSrc] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		let alive = true;
		if (!value) {
			setSrc("");
			return;
		}
		import_lib.toDataURL(value, {
			width: size,
			margin: 1,
			color: {
				dark: "#121310",
				light: "#f3f0e7"
			},
			errorCorrectionLevel: "M"
		}).then((url) => {
			if (alive) setSrc(url);
		}).catch(() => {});
		return () => {
			alive = false;
		};
	}, [value, size]);
	return src;
}
function QrImage({ value, alt, className, size = 320 }) {
	const src = useQrDataUrl(value, size);
	if (!src) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("animate-pulse bg-primary-soft", className) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src,
		alt,
		className
	});
}
async function downloadQr(value, filename) {
	const url = await import_lib.toDataURL(value, {
		width: 720,
		margin: 2,
		color: {
			dark: "#1c1814",
			light: "#ffffff"
		}
	});
	return {
		ok: await triggerDownload(filename, url),
		url
	};
}
//#endregion
export { downloadQr as n, useQrDataUrl as r, QrImage as t };
