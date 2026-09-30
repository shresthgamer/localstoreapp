import { S as useNavigate, Y as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { h as useAppStore, i as fileToDataUrl } from "./store-B4tRn7lE.mjs";
import { C as Minus, U as ChevronLeft, b as Plus, s as Upload, u as Trash2 } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as AppShell } from "./app-shell-DkvLa-n_.mjs";
import { n as Toggle } from "./ui-bits-yFL1YA4g.mjs";
import { n as StampPreview } from "./phone-preview-CXaqTUl8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/stamp-BAAMVXdW.js
var import_jsx_runtime = require_jsx_runtime();
function StampPage() {
	const navigate = useNavigate();
	const stamps = useAppStore((s) => s.stamps);
	const saveStamp = useAppStore((s) => s.saveStamp);
	const addStamp = useAppStore((s) => s.addStamp);
	const removeStamp = useAppStore((s) => s.removeStamp);
	const program = stamps[0];
	async function onUpload(file, id) {
		if (!file) return;
		const url = await fileToDataUrl(file);
		const current = useAppStore.getState().stamps.find((s) => s.id === id);
		if (current) saveStamp({
			...current,
			image: url
		});
	}
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
					className: "flex-1 w-full max-w-lg",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center justify-between gap-3 mb-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "text-2xl",
									children: "Stamp programs"
								}),
								program ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 bg-surface px-3 py-1.5 rounded-full shadow-card",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
										on: program.active,
										onToggle: () => saveStamp({
											...program,
											active: !program.active
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "eyebrow pr-1",
										children: program.active ? "Active" : "Paused"
									})]
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => {
										addStamp();
										toast.success("Reward added");
									},
									className: "btn-ghost h-11 px-4 text-sm",
									children: "Add reward"
								})
							]
						}),
						stamps.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "relative mb-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "panel p-5",
								children: [
									stamps.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => removeStamp(p.id),
										className: "absolute top-3 right-3 size-11 rounded-full bg-elevated text-danger flex items-center justify-center",
										"aria-label": "Delete reward",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
									}) : null,
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex gap-4 mb-5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "size-16 bg-elevated rounded-lg flex items-center justify-center overflow-hidden cursor-pointer shrink-0",
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
												onChange: (e) => onUpload(e.target.files?.[0], p.id)
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex-1 min-w-0 space-y-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "eyebrow block mb-2",
												children: "Visits required"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														className: "size-11 rounded-md bg-elevated flex items-center justify-center",
														onClick: () => saveStamp({
															...p,
															visitsRequired: Math.max(2, p.visitsRequired - 1)
														}),
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-4" })
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-medium tabular-nums w-8 text-center",
														children: p.visitsRequired
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														className: "size-11 rounded-md bg-primary text-primary-foreground flex items-center justify-center",
														onClick: () => saveStamp({
															...p,
															visitsRequired: Math.min(12, p.visitsRequired + 1)
														}),
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" })
													})
												]
											})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "eyebrow block mb-2",
												children: "Expiry (days)"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												className: "field w-28",
												type: "number",
												value: p.expiryDays,
												onChange: (e) => saveStamp({
													...p,
													expiryDays: Number(e.target.value) || 0
												})
											})] })]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "eyebrow block mb-2",
										children: "Reward"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: "field",
										placeholder: "e.g. 5% off the bill after 8 visits",
										value: p.description,
										onChange: (e) => saveStamp({
											...p,
											description: e.target.value
										})
									})
								]
							})
						}, p.id)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								toast.success("Reward programs saved");
								navigate({ to: "/" });
							},
							className: "btn-primary w-full",
							children: "Save programs"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex justify-center w-full xl:w-auto pb-4",
					children: program ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StampPreview, { program }) : null
				})]
			})]
		})
	});
}
//#endregion
export { StampPage as component };
