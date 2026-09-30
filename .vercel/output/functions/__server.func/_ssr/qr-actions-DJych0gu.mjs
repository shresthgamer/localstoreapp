import { i as __toESM } from "../_runtime.mjs";
import { X as require_react, Y as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as Mail, I as Eye, L as Download, R as Copy, S as Monitor, W as Check, g as Share2, n as X, w as MessageCircle } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Overlay } from "./ui-bits-yFL1YA4g.mjs";
import { i as smsHref, n as mailtoHref, r as shareMessage, s as whatsappHref, t as copyText } from "./actions-Cod9q5YL.mjs";
import { n as downloadQr, r as useQrDataUrl } from "./qr-block-BmByxBJE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/qr-actions-DJych0gu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function QrActions({ url, businessName, filename, kind = "rewards", linkLabel = "Guest link", previewTo = "/c", previewLabel = "See what guests see", showPresenter = true }) {
	const [copied, setCopied] = (0, import_react.useState)(false);
	const [shareOpen, setShareOpen] = (0, import_react.useState)(false);
	const [saveOpen, setSaveOpen] = (0, import_react.useState)(false);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const fieldRef = (0, import_react.useRef)(null);
	const sheetFieldRef = (0, import_react.useRef)(null);
	const qrSrc = useQrDataUrl(url, 720);
	const message = shareMessage(businessName, url, kind);
	const canNativeShare = typeof navigator !== "undefined" && typeof navigator.share === "function";
	(0, import_react.useEffect)(() => {
		if (!shareOpen) return;
		const el = sheetFieldRef.current;
		if (!el) return;
		const id = window.setTimeout(() => {
			el.focus();
			el.select();
		}, 50);
		return () => window.clearTimeout(id);
	}, [shareOpen]);
	async function onCopy() {
		if (await copyText(url, fieldRef.current ?? sheetFieldRef.current)) {
			setCopied(true);
			toast.success(kind === "menu" ? "Menu link copied" : "Reward link copied");
			window.setTimeout(() => setCopied(false), 2e3);
			return;
		}
		setShareOpen(true);
		toast.message("Tap the link, then copy");
	}
	async function onNativeShare() {
		if (!canNativeShare) return;
		try {
			await navigator.share({
				title: businessName,
				text: message,
				url
			});
			toast.success("Shared");
			setShareOpen(false);
		} catch (err) {
			if (err instanceof Error && err.name === "AbortError") return;
			toast.message("Use WhatsApp or copy the link below");
		}
	}
	async function onDownload() {
		setSaving(true);
		try {
			await downloadQr(url, filename);
		} catch {} finally {
			setSaving(false);
			setSaveOpen(true);
		}
	}
	function selectLink(el) {
		el.focus();
		el.select();
		el.setSelectionRange(0, el.value.length);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative z-20 space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => void onCopy(),
						className: "btn-ghost",
						children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-4" }), copied ? "Copied" : "Copy"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => void onDownload(),
						className: "btn-primary",
						disabled: saving,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }),
							" ",
							saving ? "Saving…" : "Download"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setShareOpen(true),
						className: "btn-ghost",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "size-4" }), " Share"]
					}),
					showPresenter ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/presenter",
						className: "btn-ghost",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Monitor, { className: "size-4" }), " Presenter"]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/menu/edit",
						className: "btn-ghost",
						children: "Edit menu"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "eyebrow",
					children: linkLabel
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					ref: fieldRef,
					readOnly: true,
					value: url,
					onFocus: (e) => selectLink(e.currentTarget),
					onClick: (e) => selectLink(e.currentTarget),
					className: "field mt-1 text-sm",
					"aria-label": linkLabel
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: previewTo,
				className: "btn-ghost w-full",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-4" }),
					" ",
					previewLabel
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, {
				open: shareOpen,
				onClose: () => setShareOpen(false),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-5 space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-lg",
								children: kind === "menu" ? "Share your menu" : "Share your QR"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted mt-1",
								children: kind === "menu" ? "Send this link so guests open your digital menu." : "Send this link so guests land on your stamp page."
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setShareOpen(false),
								className: "size-11 rounded-full bg-background border border-border flex items-center justify-center shrink-0",
								"aria-label": "Close share",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							ref: sheetFieldRef,
							readOnly: true,
							value: url,
							onFocus: (e) => selectLink(e.currentTarget),
							onClick: (e) => selectLink(e.currentTarget),
							className: "field text-sm",
							"aria-label": linkLabel
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => void onCopy(),
							className: "btn-primary w-full",
							children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-4" }), copied ? "Copied" : "Copy link"]
						}),
						canNativeShare ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => void onNativeShare(),
							className: "btn-ghost w-full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "size-4" }), " Share from this device"]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: whatsappHref(message),
							target: "_blank",
							rel: "noreferrer",
							className: "btn-ghost w-full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-4" }), " WhatsApp"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: smsHref(message),
							className: "btn-ghost w-full",
							children: "Messages"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: mailtoHref(`${businessName} ${kind === "menu" ? "menu" : "rewards"}`, message),
							className: "btn-ghost w-full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-4" }), " Email"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: previewTo,
							className: "btn-ghost w-full",
							onClick: () => setShareOpen(false),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-4" }), " Open guest view"]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, {
				open: saveOpen,
				onClose: () => setSaveOpen(false),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-5 space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-lg",
								children: "Save QR code"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted mt-1",
								children: "Tap Download PNG. If nothing saves, press and hold the image."
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setSaveOpen(false),
								className: "size-11 rounded-full bg-background border border-border flex items-center justify-center shrink-0",
								"aria-label": "Close save",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
							})]
						}),
						qrSrc ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: qrSrc,
							alt: "QR code",
							className: "w-full rounded-xl border border-border bg-surface"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "aspect-square rounded-xl bg-primary-soft animate-pulse" }),
						qrSrc ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: qrSrc,
							download: filename,
							className: "btn-primary w-full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }), " Download PNG"]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "btn-primary w-full",
							disabled: true,
							children: "Preparing…"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => void onCopy(),
							className: "btn-ghost w-full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-4" }), " Copy link instead"]
						})
					]
				})
			})
		]
	});
}
//#endregion
export { QrActions as t };
