import { Y as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { h as useAppStore, n as cn } from "./store-B4tRn7lE.mjs";
import { P as Gift, f as Star, j as Instagram } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/phone-preview-CXaqTUl8.js
var import_jsx_runtime = require_jsx_runtime();
function PhoneFrame({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "phone-frame relative rounded-hero bg-elevated p-2.5 shadow-soft shrink-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-2.5 left-1/2 -translate-x-1/2 w-28 h-6 bg-elevated rounded-b-lg z-20" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "bg-background w-full h-full rounded-2xl overflow-y-auto no-scrollbar flex flex-col",
			children
		})]
	});
}
function StampPreview({ program, filled = 0 }) {
	const business = useAppStore((s) => s.business);
	const needed = Math.max(1, program.visitsRequired);
	const remaining = Math.max(0, needed - filled);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PhoneFrame, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "pt-12 pb-6 px-5 shrink-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						alt: "",
						src: business.logo,
						className: "size-7 rounded-full object-cover"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm truncate",
						children: business.name
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow mt-6",
					children: "Stamp card"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "text-2xl mt-1 tabular-nums",
					children: [
						filled,
						" of ",
						needed
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "px-4 shrink-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel p-3 flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					className: "size-11 rounded-md object-cover",
					alt: "",
					src: program.image || "/images/reward.svg"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "eyebrow",
						children: [needed, " stamps"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs mt-1 leading-snug line-clamp-2",
						children: program.description || "Your reward"
					})]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "px-4 mt-3 shrink-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow mb-3",
						children: "Progress"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-4 gap-2",
						children: Array.from({ length: needed }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: cn("stamp-dot", i < filled ? "is-filled" : "is-empty"),
							children: i === needed - 1 && i >= filled ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gift, { className: "size-3.5" }) : i < filled ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs",
								children: i + 1
							}) : null
						}, i))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-center text-muted mt-3",
						children: remaining === 0 ? "Reward unlocked" : `${remaining} visits to go`
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SocialRow, {})
	] });
}
function ScratchPreview({ prizes }) {
	const business = useAppStore((s) => s.business);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PhoneFrame, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pt-12 pb-6 px-5 shrink-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					alt: "",
					src: business.logo,
					className: "size-7 rounded-full object-cover"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm truncate",
					children: business.name
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "eyebrow mt-6",
				children: "Instant gift"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-2xl mt-1",
				children: "Scratch & win"
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "px-4 pb-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-2 gap-3",
			children: prizes.filter((p) => p.active !== false).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel p-3 flex flex-col items-center justify-center text-center min-h-36",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow mb-2",
						children: "Scratch"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gift, { className: "size-7 text-primary mb-2" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs leading-snug",
						children: p.title || "Mystery prize"
					})
				]
			}, p.id))
		})
	})] });
}
function SocialRow() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex justify-center gap-3 mt-6 mb-5 text-muted shrink-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "size-8 rounded-full bg-surface shadow-card flex items-center justify-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Instagram, { className: "size-3.5" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "size-8 rounded-full bg-surface shadow-card flex items-center justify-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-3.5" })
		})]
	});
}
//#endregion
export { StampPreview as n, ScratchPreview as t };
