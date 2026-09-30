import { i as __toESM } from "../_runtime.mjs";
import { S as useNavigate, X as require_react, Y as require_jsx_runtime, m as useLocation, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { h as useAppStore, n as cn } from "./store-B4tRn7lE.mjs";
import { P as Gift, U as ChevronLeft, a as UserRound, k as LayoutGrid, m as Sparkles, r as Users } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app-shell-DkvLa-n_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LoginGate() {
	const business = useAppStore((s) => s.business);
	const setSession = useAppStore((s) => s.setSession);
	const [phone, setPhone] = (0, import_react.useState)(business.ownerPhone);
	const [otp, setOtp] = (0, import_react.useState)("");
	const [sent, setSent] = (0, import_react.useState)(false);
	function send() {
		if (phone.replace(/\D/g, "").length < 10) {
			toast.error("Enter a 10-digit mobile number");
			return;
		}
		setSent(true);
		toast.success("OTP sent — use 1234 for this demo");
	}
	function verify() {
		if (otp.trim() !== "1234") {
			toast.error("Incorrect OTP. Use 1234");
			return;
		}
		setSession(true);
		toast.success(`Welcome back, ${business.ownerName}`);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "guest-page flex flex-col items-center justify-center px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-sm panel-lg p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center text-center mb-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: business.logo,
							alt: "",
							className: "size-14 rounded-full object-cover shadow-card"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow mt-4",
							children: "Druto"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-2xl mt-1",
							children: business.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted mt-2",
							children: "Owner sign-in"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "eyebrow",
					children: "Mobile number"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "field mt-2",
					value: phone,
					onChange: (e) => setPhone(e.target.value),
					inputMode: "numeric"
				}),
				sent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "mt-4 block eyebrow",
						children: "OTP"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "field mt-2 tracking-[0.4em]",
						value: otp,
						onChange: (e) => setOtp(e.target.value),
						inputMode: "numeric",
						placeholder: "1234"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: verify,
						className: "btn-primary w-full mt-5",
						children: "Continue"
					})
				] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: send,
					className: "btn-primary w-full mt-5",
					children: "Send OTP"
				})
			]
		})
	});
}
var NAV = [
	{
		to: "/",
		label: "Home",
		icon: LayoutGrid
	},
	{
		to: "/customers",
		label: "Guests",
		icon: Users
	},
	{
		to: "/winners",
		label: "Rewards",
		icon: Gift
	},
	{
		to: "/offers",
		label: "Offers",
		icon: Sparkles
	}
];
function AppShell({ children, stats, compactHeader, title, subtitle, hideStats }) {
	const location = useLocation();
	const navigate = useNavigate();
	const business = useAppStore((s) => s.business);
	const session = useAppStore((s) => s.session);
	const setHydrated = useAppStore((s) => s.setHydrated);
	(0, import_react.useEffect)(() => {
		(async () => {
			await useAppStore.persist.rehydrate();
			setHydrated();
		})();
	}, [setHydrated]);
	if (!session) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoginGate, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-background font-sans flex flex-col",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "w-full flex-1 max-w-xl mx-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-h-screen flex flex-col pb-24",
				children: [
					compactHeader ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
						className: "px-4 pt-6 pb-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => navigate({ to: "/" }),
								className: "size-11 rounded-md bg-surface shadow-card flex items-center justify-center",
								"aria-label": "Back",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-xl leading-tight",
								children: title
							}), subtitle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted mt-0.5",
								children: subtitle
							}) : null] })]
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "px-4 pt-6 pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									alt: "",
									src: business.logo,
									className: "size-11 rounded-full object-cover bg-surface shadow-card"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
										className: "text-lg leading-tight truncate",
										children: business.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted",
										children: business.category
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => navigate({ to: "/settings" }),
								className: "size-11 rounded-full bg-surface shadow-card flex items-center justify-center",
								"aria-label": "Profile and settings",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, { className: "size-5" })
							})]
						}), !hideStats && stats ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4",
							children: stats
						}) : null]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex-1 w-full mx-auto px-4 pt-2",
						children
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "fixed bottom-0 left-0 right-0 z-50 bg-background/92 backdrop-blur-md pb-safe",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center justify-around h-16 max-w-xl mx-auto px-2 border-t border-border",
							children: NAV.map((item) => {
								const active = item.to === "/" ? location.pathname === "/" : location.pathname === item.to || location.pathname.startsWith(item.to + "/");
								const Icon = item.icon;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: item.to,
									className: cn("flex flex-col items-center justify-center gap-1 flex-1 min-h-11 text-xs font-medium whitespace-nowrap", active ? "text-primary" : "text-muted"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
										className: "size-5",
										strokeWidth: active ? 2.2 : 1.7
									}), item.label]
								}, item.to);
							})
						})
					})
				]
			})
		})
	});
}
function HeaderStats({ scans, users, rewards, repeatPct }) {
	const cells = [
		{
			n: String(scans),
			l: "Scans"
		},
		{
			n: String(users),
			l: "Guests"
		},
		{
			n: String(rewards),
			l: "Rewards"
		},
		{
			n: `${repeatPct}%`,
			l: "Repeat"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-4 gap-2",
		children: cells.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "panel px-2 py-3 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-lg font-medium tabular-nums leading-none",
				children: c.n
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "eyebrow mt-2",
				children: c.l
			})]
		}, c.l))
	});
}
//#endregion
export { HeaderStats as n, AppShell as t };
