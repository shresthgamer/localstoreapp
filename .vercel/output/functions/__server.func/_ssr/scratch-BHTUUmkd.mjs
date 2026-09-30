import { S as useNavigate, Y as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { h as useAppStore, i as fileToDataUrl } from "./store-B4tRn7lE.mjs";
import { M as Info, U as ChevronLeft, s as Upload, u as Trash2 } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as AppShell } from "./app-shell-DkvLa-n_.mjs";
import { n as Toggle } from "./ui-bits-yFL1YA4g.mjs";
import { t as ScratchPreview } from "./phone-preview-CXaqTUl8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/scratch-BHTUUmkd.js
var import_jsx_runtime = require_jsx_runtime();
function ScratchPage() {
	const navigate = useNavigate();
	const scratches = useAppStore((s) => s.scratches);
	const saveScratch = useAppStore((s) => s.saveScratch);
	const addScratch = useAppStore((s) => s.addScratch);
	const removeScratch = useAppStore((s) => s.removeScratch);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		hideStats: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "animate-fade-in pb-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => navigate({ to: "/offers" }),
				className: "flex items-center gap-1.5 mt-1 mb-6 text-muted text-sm min-h-11",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4" }), " Back"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col xl:flex-row gap-8 items-start",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 max-w-lg",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between mb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-2xl",
								children: "Scratch cards"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted mt-1",
								children: "A surprise on this visit."
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									addScratch();
									toast.success("Prize added");
								},
								className: "btn-ghost h-11 px-4 text-sm",
								children: "Add prize"
							})]
						}),
						scratches.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "panel p-5 mb-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between mb-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
										className: "eyebrow",
										children: ["Prize ", i + 1]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "eyebrow",
												children: p.active ? "Active" : "Off"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
												on: p.active,
												onToggle: () => saveScratch({
													...p,
													active: !p.active
												})
											}),
											scratches.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => removeScratch(p.id),
												className: "size-11 rounded-full bg-elevated text-danger flex items-center justify-center",
												"aria-label": "Remove prize",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
											}) : null
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "size-16 bg-elevated rounded-lg flex items-center justify-center overflow-hidden cursor-pointer mb-4",
									children: [p.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: p.image,
										alt: "",
										className: "size-full object-cover"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-muted flex flex-col items-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "eyebrow mt-1",
											children: "Upload"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: "hidden",
										accept: "image/*",
										type: "file",
										onChange: async (e) => {
											const f = e.target.files?.[0];
											if (f) saveScratch({
												...p,
												image: await fileToDataUrl(f)
											});
										}
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "eyebrow",
									children: "Reward title"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "field mt-2",
									placeholder: "e.g. 20% off your next visit",
									value: p.title,
									onChange: (e) => saveScratch({
										...p,
										title: e.target.value
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "eyebrow",
											children: "Winning odds"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-2 flex items-center gap-2 text-sm",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "tabular-nums",
													children: "1 in"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													className: "field w-20 text-center",
													type: "number",
													value: p.winnersOutOf,
													onChange: (e) => saveScratch({
														...p,
														winnersOutOf: Math.max(2, Number(e.target.value) || 2)
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "scans" })
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-2 text-sm text-muted flex gap-1.5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "size-3.5 mt-0.5 shrink-0" }),
												"Each scan has a ",
												Math.round(100 / p.winnersOutOf),
												"% chance to win."
											]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "mt-4 block eyebrow",
									children: "Expiry (days)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "field mt-2 w-28",
									type: "number",
									value: p.expiryDays,
									onChange: (e) => saveScratch({
										...p,
										expiryDays: Number(e.target.value) || 0
									})
								})
							]
						}, p.id)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								toast.success("Scratch cards saved");
								navigate({ to: "/offers" });
							},
							className: "btn-primary w-full",
							children: "Save changes"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex justify-center w-full xl:w-auto pb-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScratchPreview, { prizes: scratches })
				})]
			})]
		})
	});
}
//#endregion
export { ScratchPage as component };
