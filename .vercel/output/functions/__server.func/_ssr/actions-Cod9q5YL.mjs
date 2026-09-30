import { i as __toESM } from "../_runtime.mjs";
import { X as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/actions-Cod9q5YL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function usePublicUrl(path) {
	const normalized = path.startsWith("/") ? path : `/${path}`;
	const [url, setUrl] = (0, import_react.useState)(() => typeof window === "undefined" ? normalized : `${window.location.origin}${normalized}`);
	(0, import_react.useEffect)(() => {
		setUrl(`${window.location.origin}${normalized}`);
	}, [normalized]);
	return url;
}
function isEmbeddedFrame() {
	return typeof window !== "undefined" && window.parent !== window;
}
function copyViaExecCommand(text, field) {
	const el = field ?? (() => {
		const input = document.createElement("textarea");
		input.value = text;
		input.setAttribute("readonly", "true");
		input.setAttribute("aria-hidden", "true");
		input.style.cssText = "position:fixed;top:0;left:0;width:2px;height:2px;padding:0;border:0;outline:none;opacity:0.01;z-index:-1;";
		document.body.appendChild(input);
		return input;
	})();
	const created = !field;
	try {
		el.focus();
		el.select();
		el.setSelectionRange(0, text.length);
		return document.execCommand("copy");
	} catch {
		return false;
	} finally {
		if (created) el.remove();
	}
}
async function copyText(text, field) {
	if (typeof window === "undefined" || !text) return false;
	if (copyViaExecCommand(text, field)) return true;
	try {
		if (navigator.clipboard?.writeText) {
			await navigator.clipboard.writeText(text);
			return true;
		}
	} catch {}
	return false;
}
function clickAnchor(href, download) {
	const a = document.createElement("a");
	a.href = href;
	if (download) a.download = download;
	a.rel = "noopener";
	a.target = "_blank";
	a.style.display = "none";
	document.body.appendChild(a);
	a.dispatchEvent(new MouseEvent("click", {
		bubbles: true,
		cancelable: true,
		view: window
	}));
	a.remove();
}
async function triggerDownload(filename, dataUrl) {
	try {
		const blob = await (await fetch(dataUrl)).blob();
		const objectUrl = URL.createObjectURL(blob);
		clickAnchor(objectUrl, filename);
		window.setTimeout(() => URL.revokeObjectURL(objectUrl), 2500);
		return !isEmbeddedFrame();
	} catch {
		try {
			clickAnchor(dataUrl, filename);
			return !isEmbeddedFrame();
		} catch {
			return false;
		}
	}
}
function shareMessage(businessName, url, kind = "rewards") {
	if (kind === "menu") return `View the menu at ${businessName}: ${url}`;
	return `Scan to collect rewards at ${businessName}: ${url}`;
}
function whatsappHref(text) {
	return `https://wa.me/?text=${encodeURIComponent(text)}`;
}
function smsHref(text) {
	return `sms:?body=${encodeURIComponent(text)}`;
}
function mailtoHref(subject, text) {
	return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
}
//#endregion
export { triggerDownload as a, smsHref as i, mailtoHref as n, usePublicUrl as o, shareMessage as r, whatsappHref as s, copyText as t };
