import { i as __toESM } from "../_runtime.mjs";
import { X as require_react, Y as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { h as useAppStore, n as cn, o as formatHoursLine, p as todayHours } from "./store-B4tRn7lE.mjs";
import { H as ChevronRight, P as Gift, T as MapPin, W as Check, d as Store, x as Phone, z as Clock } from "../_libs/lucide-react.mjs";
import { t as BusinessDetails } from "./business-profile-Bl0KPctj.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/c-DifWAYMl.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ScratchFoil({ locked, result, onBegin, hint }) {
	const canvasRef = (0, import_react.useRef)(null);
	const started = (0, import_react.useRef)(false);
	const [cleared, setCleared] = (0, import_react.useState)(false);
	const paintFoil = (0, import_react.useCallback)(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		const { width, height } = canvas;
		ctx.globalCompositeOperation = "source-over";
		const fill = ctx.createLinearGradient(0, 0, width, height);
		fill.addColorStop(0, "#cfc9ba");
		fill.addColorStop(.45, "#9b9688");
		fill.addColorStop(1, "#b7b1a2");
		ctx.fillStyle = fill;
		ctx.fillRect(0, 0, width, height);
		ctx.fillStyle = "rgba(243,240,231,0.12)";
		for (let i = 0; i < 90; i++) {
			const x = Math.random() * width;
			const y = Math.random() * height;
			ctx.fillRect(x, y, 18 + Math.random() * 40, 1);
		}
		ctx.fillStyle = "rgba(18,19,16,0.22)";
		ctx.font = "600 13px Outfit, sans-serif";
		ctx.textAlign = "center";
		ctx.fillText("Scratch here", width / 2, height / 2 + 4);
	}, []);
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		if (!canvas || result) return;
		const parent = canvas.parentElement;
		if (!parent) return;
		const resize = () => {
			if (started.current) return;
			const rect = parent.getBoundingClientRect();
			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			canvas.width = Math.max(1, Math.floor(rect.width * dpr));
			canvas.height = Math.max(1, Math.floor(rect.height * dpr));
			canvas.style.width = `${rect.width}px`;
			canvas.style.height = `${rect.height}px`;
			paintFoil();
		};
		resize();
		const observer = new ResizeObserver(resize);
		observer.observe(parent);
		return () => observer.disconnect();
	}, [paintFoil, result]);
	function scratchAt(clientX, clientY) {
		const canvas = canvasRef.current;
		if (!canvas || locked) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		if (!started.current) {
			started.current = true;
			onBegin();
		}
		const rect = canvas.getBoundingClientRect();
		const x = (clientX - rect.left) / rect.width * canvas.width;
		const y = (clientY - rect.top) / rect.height * canvas.height;
		ctx.globalCompositeOperation = "destination-out";
		ctx.beginPath();
		ctx.arc(x, y, canvas.width * .07, 0, Math.PI * 2);
		ctx.fill();
		const sample = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
		let transparent = 0;
		for (let i = 3; i < sample.length; i += 16) if (sample[i] < 24) transparent += 1;
		if (transparent / (sample.length / 16) > .48) setCleared(true);
	}
	function onPointer(e) {
		if (locked) return;
		e.currentTarget.setPointerCapture(e.pointerId);
		scratchAt(e.clientX, e.clientY);
	}
	const revealed = Boolean(result) && (cleared || locked);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative h-44 overflow-hidden rounded-lg bg-elevated",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 flex flex-col items-center justify-center px-5 text-center",
				children: result?.won ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gift, { className: "size-7 text-primary mb-2" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "You won"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 font-heading text-xl leading-tight",
						children: result.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted mt-2",
						children: "Show this screen at the counter."
					})
				] }) : result ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "Not this visit"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 font-heading text-xl leading-tight",
						children: "Try again next time"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted mt-2",
						children: "Every visit is another chance."
					})
				] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow",
					children: "Scratch & win"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 font-heading text-xl leading-tight",
					children: hint
				})] })
			}),
			!revealed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
				ref: canvasRef,
				className: cn("absolute inset-0 size-full touch-none", locked ? "pointer-events-none" : "cursor-crosshair"),
				onPointerDown: onPointer,
				onPointerMove: (e) => {
					if (e.buttons) scratchAt(e.clientX, e.clientY);
				}
			}) : null,
			locked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 bg-background/50 flex items-end justify-center p-4 pointer-events-none",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-fg",
					children: "Join to scratch this card"
				})
			}) : null
		]
	});
}
var GUEST_KEY = "druto-guest-phone";
function CollectPage() {
	const business = useAppStore((s) => s.business);
	const customers = useAppStore((s) => s.customers);
	const stamps = useAppStore((s) => s.stamps);
	const scratches = useAppStore((s) => s.scratches);
	const addCustomer = useAppStore((s) => s.addCustomer);
	const giveStamp = useAppStore((s) => s.giveStamp);
	const playScratch = useAppStore((s) => s.playScratch);
	const program = stamps.find((s) => s.active) ?? stamps[0];
	const scratch = scratches.find((s) => s.active) ?? scratches[0];
	const [phone, setPhone] = (0, import_react.useState)("");
	const [name, setName] = (0, import_react.useState)("");
	const [meId, setMeId] = (0, import_react.useState)(null);
	const [scratchResult, setScratchResult] = (0, import_react.useState)(null);
	const [justStamped, setJustStamped] = (0, import_react.useState)(false);
	const me = customers.find((c) => c.id === meId);
	const needed = program?.visitsRequired ?? 8;
	(0, import_react.useEffect)(() => {
		useAppStore.persist.rehydrate();
		const saved = typeof window !== "undefined" ? window.localStorage.getItem(GUEST_KEY) : null;
		if (!saved) return;
		const existing = useAppStore.getState().customers.find((c) => c.phone === saved);
		if (existing) setMeId(existing.id);
	}, []);
	function identify() {
		const digits = phone.replace(/\D/g, "").slice(-10);
		if (digits.length < 10) {
			toast.error("Enter your 10-digit mobile");
			return;
		}
		const existing = customers.find((c) => c.phone === digits);
		const id = existing ? existing.id : addCustomer({
			name: name.trim() || "Guest",
			phone: digits,
			notes: ""
		});
		window.localStorage.setItem(GUEST_KEY, digits);
		setMeId(id);
	}
	const filled = me?.stamps ?? 0;
	const remaining = Math.max(0, needed - filled);
	const hours = todayHours(business.hours);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "guest-page",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "px-4 pt-12 pb-20 max-w-md mx-auto stagger-in",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "Member rewards"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-6 flex justify-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "size-[5.5rem] rounded-full p-1 shadow-card bg-surface",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: business.logo,
									alt: "",
									className: "size-full rounded-full object-cover"
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow mt-5",
							children: business.category
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-2 text-4xl",
							children: business.name
						}),
						business.about ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-muted leading-relaxed max-w-sm mx-auto",
							children: business.about
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 inline-flex items-center gap-2 rounded-full bg-surface px-3.5 py-2 shadow-card text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3.5 text-muted" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted",
									children: "Today"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "tabular-nums",
									children: hours.day.closed ? "Closed" : formatHoursLine(hours.day)
								})
							]
						})
					]
				}),
				!me ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "panel-lg p-5 mt-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "Join the table"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-2xl mt-2",
							children: "Your stamp card starts here"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted mt-2 leading-relaxed",
							children: program?.description ?? "Collect stamps on every visit. No app to download."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "field mt-5",
							placeholder: "Your name",
							value: name,
							onChange: (e) => setName(e.target.value),
							autoComplete: "name"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "field mt-2",
							placeholder: "Mobile number",
							value: phone,
							onChange: (e) => setPhone(e.target.value),
							inputMode: "numeric",
							autoComplete: "tel"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: identify,
							className: "btn-primary w-full mt-4",
							children: "Continue"
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "panel-lg p-5 mt-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "eyebrow",
								children: "Stamp card"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "text-2xl mt-1",
								children: ["Hi ", me.name.split(" ")[0]]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "tabular-nums text-sm text-muted pt-1",
								children: [
									filled,
									"/",
									needed
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-4 font-heading text-3xl leading-none tabular-nums",
							children: [
								filled,
								" of ",
								needed
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted mt-2",
							children: remaining === 0 ? "Card complete — show this to staff." : remaining === 1 ? "One visit from your reward." : `${remaining} visits from your reward.`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-5 h-1 rounded-full bg-elevated overflow-hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full bg-primary rounded-full transition-[width] duration-300",
								style: { width: `${Math.min(100, filled / needed * 100)}%` }
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: cn("grid gap-2.5 mt-5", needed > 8 ? "grid-cols-5" : "grid-cols-4"),
							children: Array.from({ length: needed }).map((_, i) => {
								const filledDot = i < filled;
								const last = i === needed - 1;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: cn("stamp-dot", filledDot ? "is-filled" : "is-empty"),
									"aria-label": filledDot ? `Stamp ${i + 1}` : last ? "Reward stamp" : "Empty stamp",
									children: filledDot ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
										className: "size-4",
										strokeWidth: 2.4
									}) : last ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gift, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs tabular-nums",
										children: i + 1
									})
								}, i);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-center text-sm text-muted mt-4 leading-relaxed",
							children: program?.description
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								const r = giveStamp(me.id);
								setJustStamped(true);
								toast.success(r.completed ? "Card complete — show this to staff" : "Stamp added");
							},
							className: "btn-primary w-full mt-5",
							children: justStamped ? "Stamp added" : "I’m at the counter"
						})
					]
				}),
				scratch ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "panel-lg p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "Instant gift"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-2xl mt-1",
							children: "Scratch & win"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted mt-2 mb-4",
							children: scratch.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScratchFoil, {
							locked: !me,
							result: scratchResult,
							hint: scratch.title,
							onBegin: () => {
								if (!me) return;
								const r = playScratch(me.id);
								setScratchResult({
									won: r.won,
									title: r.prize?.title ?? scratch.title
								});
								toast[r.won ? "success" : "message"](r.won ? `You won: ${r.prize?.title}` : "Better luck next visit");
							}
						})
					]
				}) : null,
				business.menuLive ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/m",
					className: "panel p-4 flex items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "size-12 rounded-md bg-primary-soft text-primary flex items-center justify-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Store, { className: "size-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex-1 min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block font-medium",
								children: "Tonight’s menu"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-sm text-muted",
								children: "Dishes, prices, what’s on"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4 text-muted" })
					]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "panel p-5 space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "Visit"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: `https://maps.google.com/?q=${encodeURIComponent([
								business.address,
								business.city,
								business.pincode
							].filter(Boolean).join(", "))}`,
							target: "_blank",
							rel: "noreferrer",
							className: "flex items-start gap-3 text-sm min-h-11",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-4 mt-0.5 text-muted shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								business.address,
								business.city ? `, ${business.city}` : "",
								business.pincode ? ` ${business.pincode}` : ""
							] })]
						}),
						business.phone ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: `tel:+91${business.phone.replace(/\D/g, "").slice(-10)}`,
							className: "flex items-center gap-3 text-sm min-h-11",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-4 text-muted shrink-0" }), business.phone]
						}) : null
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BusinessDetails, {
					business,
					compact: true
				})
			]
		})
	});
}
//#endregion
export { CollectPage as component };
