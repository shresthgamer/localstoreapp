import { i as __toESM } from "../_runtime.mjs";
import { S as useNavigate, X as require_react, Y as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { h as useAppStore, i as fileToDataUrl } from "./store-B4tRn7lE.mjs";
import { B as CirclePlay, D as LogOut, E as Mail, G as Camera, H as ChevronRight, L as Download, T as MapPin, V as CircleHelp, W as Check, f as Star, h as Shield, i as User, n as X } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as AppShell } from "./app-shell-DkvLa-n_.mjs";
import { n as Toggle, t as Overlay } from "./ui-bits-yFL1YA4g.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-BzA5VJx4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PLANS = [
	{
		id: "basic",
		name: "Basic",
		price: "₹999 / year",
		note: "1 location",
		perks: [
			"Stamp + scratch cards",
			"Digital QR menu",
			"Physical QR stand"
		]
	},
	{
		id: "growth",
		name: "Growth",
		price: "₹2,499 / year",
		note: "Up to 3 locations",
		perks: [
			"Everything in Basic",
			"GPS branch detection",
			"Priority support"
		]
	},
	{
		id: "pro",
		name: "Pro",
		price: "₹4,999 / year",
		note: "Up to 6 locations",
		perks: [
			"Everything in Growth",
			"Multi-staff accounts",
			"Custom branding"
		]
	}
];
function UpgradeSheet({ open, onClose }) {
	const setPlan = useAppStore((s) => s.setPlan);
	const plan = useAppStore((s) => s.business.plan);
	function pick(id) {
		setPlan(id);
		toast.success(`${id[0].toUpperCase() + id.slice(1)} plan activated`);
		onClose();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, {
		open,
		onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-5 pb-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between mb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium uppercase tracking-widest text-muted",
					children: "Plans"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg",
					children: "Choose a subscription"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onClose,
					className: "size-11 rounded-full bg-background border border-border flex items-center justify-center",
					"aria-label": "Close",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: PLANS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => pick(p.id),
					className: "w-full text-left rounded-xl border border-border p-4 bg-surface",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-semibold",
								children: p.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: p.note
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-semibold",
								children: p.price
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-2 space-y-1",
							children: p.perks.map((perk) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center gap-2 text-sm text-muted",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5 text-primary" }),
									" ",
									perk
								]
							}, perk))
						}),
						plan === p.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-xs font-medium text-primary",
							children: "Current plan"
						}) : null
					]
				}, p.id))
			})]
		})
	});
}
function SettingsPage() {
	const b = useAppStore((s) => s.business);
	const patch = useAppStore((s) => s.patchBusiness);
	const logout = useAppStore((s) => s.logout);
	const navigate = useNavigate();
	const [edit, setEdit] = (0, import_react.useState)(false);
	const [hours, setHours] = (0, import_react.useState)(false);
	const [contact, setContact] = (0, import_react.useState)(false);
	const [social, setSocial] = (0, import_react.useState)(false);
	const [owner, setOwner] = (0, import_react.useState)(false);
	const [privacy, setPrivacy] = (0, import_react.useState)(false);
	const [help, setHelp] = (0, import_react.useState)(false);
	const [upgrade, setUpgrade] = (0, import_react.useState)(false);
	const [name, setName] = (0, import_react.useState)(b.name);
	const [category, setCategory] = (0, import_react.useState)(b.category);
	const [about, setAbout] = (0, import_react.useState)(b.about ?? "");
	async function onLogo(file) {
		if (!file) return;
		patch({ logo: await fileToDataUrl(file) });
		toast.success("Logo updated");
	}
	const rows = [
		{
			icon: MapPin,
			title: "Location & hours",
			sub: "Address and opening times",
			onClick: () => setHours(true)
		},
		{
			icon: Mail,
			title: "Phone & email",
			sub: b.email || "No email set",
			onClick: () => setContact(true)
		},
		{
			icon: Star,
			title: "Social & reviews",
			sub: "Shown on the guest scan page",
			onClick: () => setSocial(true)
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		compactHeader: true,
		title: "Settings",
		subtitle: "Your shop details, shown to guests",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3 pb-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "panel p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-4 min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "size-16 bg-surface rounded-xl border border-border relative shrink-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										className: "size-full object-cover rounded-xl",
										alt: "Logo",
										src: b.logo
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "absolute -bottom-1 -right-1 size-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground border-2 border-surface cursor-pointer",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											className: "hidden",
											accept: "image/*",
											type: "file",
											onChange: (e) => onLogo(e.target.files?.[0])
										})]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-lg leading-tight truncate",
										children: b.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted mt-0.5",
										children: b.category
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setEdit(true),
								className: "btn-ghost px-4 h-10 text-sm",
								children: "Edit"
							})]
						}), b.about ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted mt-4 leading-relaxed",
							children: b.about
						}) : null]
					}),
					rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: r.onClick,
						className: "w-full panel p-4 flex items-center justify-between text-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "size-11 rounded-lg bg-primary-soft text-primary flex items-center justify-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(r.icon, { className: "size-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-semibold",
								children: r.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: r.sub
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4 text-muted" })]
					}, r.title)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "panel p-4 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pr-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-semibold",
								children: "Auto-approve scans"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: b.autoApprove ? "Stamps apply immediately" : "You review each scan"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
							on: b.autoApprove,
							onToggle: () => patch({ autoApprove: !b.autoApprove })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "panel p-4 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pr-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-semibold",
								children: "Multiple scans"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: b.allowMultipleScans ? "Guests can stamp more than once a day" : "One scan per guest per day"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
							on: b.allowMultipleScans,
							onToggle: () => patch({ allowMultipleScans: !b.allowMultipleScans })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setOwner(true),
						className: "w-full panel p-4 flex items-center justify-between text-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "size-11 rounded-lg bg-primary-soft text-primary flex items-center justify-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "size-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-semibold",
								children: b.ownerName
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: "Owner account"
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4 text-muted" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "panel overflow-hidden",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								icon: CirclePlay,
								title: "How to use Druto",
								sub: "Short tutorial",
								onClick: () => window.open("https://www.youtube.com/results?search_query=druto+loyalty", "_blank")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								icon: Download,
								title: "Install app",
								sub: "Add to home screen",
								onClick: () => toast.message("Open the browser menu and tap Add to Home Screen")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								icon: Star,
								title: "Subscription",
								sub: "Manage your plan",
								onClick: () => setUpgrade(true)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								icon: Shield,
								title: "Privacy",
								sub: "How guest data is stored",
								onClick: () => setPrivacy(true)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								icon: CircleHelp,
								title: "Help",
								sub: "support@druto.in",
								last: true,
								onClick: () => setHelp(true)
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => {
							logout();
							toast.success("Logged out");
							navigate({ to: "/" });
						},
						className: "btn-ghost w-full text-primary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4" }), " Log out"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, {
				open: edit,
				onClose: () => setEdit(false),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg mb-4",
							children: "Edit shop"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-xs font-medium uppercase tracking-widest text-muted",
							children: "Name"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "field mt-1",
							value: name,
							onChange: (e) => setName(e.target.value)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mt-3 block text-xs font-medium uppercase tracking-widest text-muted",
							children: "Category"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "field mt-1",
							value: category,
							onChange: (e) => setCategory(e.target.value)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mt-3 block text-xs font-medium uppercase tracking-widest text-muted",
							children: "About"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							className: "mt-1 w-full min-h-24 rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary",
							value: about,
							onChange: (e) => setAbout(e.target.value)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								patch({
									name,
									category,
									about
								});
								toast.success("Profile updated");
								setEdit(false);
							},
							className: "btn-primary w-full mt-5",
							children: "Save"
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, {
				open: hours,
				onClose: () => setHours(false),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg mb-1",
							children: "Location & hours"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-xs font-medium uppercase tracking-widest text-muted",
							children: "Address"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "field mt-1",
							value: b.address,
							onChange: (e) => patch({ address: e.target.value })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-2 mt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "field",
								value: b.city,
								onChange: (e) => patch({ city: e.target.value }),
								placeholder: "City"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "field",
								value: b.pincode,
								onChange: (e) => patch({ pincode: e.target.value }),
								placeholder: "Pincode"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 space-y-2",
							children: Object.entries(b.hours).map(([day, h]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "w-10 font-medium",
										children: day
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
										on: !h.closed,
										onToggle: () => patch({ hours: {
											...b.hours,
											[day]: {
												...h,
												closed: !h.closed
											}
										} })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: "h-10 rounded-md border border-border px-2 w-24",
										type: "time",
										value: h.open,
										disabled: h.closed,
										onChange: (e) => patch({ hours: {
											...b.hours,
											[day]: {
												...h,
												open: e.target.value
											}
										} })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: "h-10 rounded-md border border-border px-2 w-24",
										type: "time",
										value: h.close,
										disabled: h.closed,
										onChange: (e) => patch({ hours: {
											...b.hours,
											[day]: {
												...h,
												close: e.target.value
											}
										} })
									})
								]
							}, day))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								toast.success("Hours saved");
								setHours(false);
							},
							className: "btn-primary w-full mt-5",
							children: "Save"
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, {
				open: contact,
				onClose: () => setContact(false),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg mb-4",
							children: "Phone & email"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "field mb-2",
							value: b.phone,
							onChange: (e) => patch({ phone: e.target.value }),
							placeholder: "Phone"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "field",
							value: b.email,
							onChange: (e) => patch({ email: e.target.value }),
							placeholder: "Email"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								toast.success("Contact saved");
								setContact(false);
							},
							className: "btn-primary w-full mt-5",
							children: "Save"
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, {
				open: social,
				onClose: () => setSocial(false),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-5 space-y-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg mb-2",
							children: "Social links"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "field",
							placeholder: "Instagram URL",
							value: b.instagram,
							onChange: (e) => patch({ instagram: e.target.value })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "field",
							placeholder: "Google review URL",
							value: b.googleReview,
							onChange: (e) => patch({ googleReview: e.target.value })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "field",
							placeholder: "Facebook URL",
							value: b.facebook,
							onChange: (e) => patch({ facebook: e.target.value })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "field",
							placeholder: "YouTube URL",
							value: b.youtube,
							onChange: (e) => patch({ youtube: e.target.value })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "field",
							placeholder: "LinkedIn URL",
							value: b.linkedin,
							onChange: (e) => patch({ linkedin: e.target.value })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								toast.success("Links saved");
								setSocial(false);
							},
							className: "btn-primary w-full mt-3",
							children: "Save"
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, {
				open: owner,
				onClose: () => setOwner(false),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg mb-4",
							children: "Owner account"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "field mb-2",
							value: b.ownerName,
							onChange: (e) => patch({ ownerName: e.target.value })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "field",
							value: b.ownerPhone,
							onChange: (e) => patch({ ownerPhone: e.target.value })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								toast.success("Owner updated");
								setOwner(false);
							},
							className: "btn-primary w-full mt-5",
							children: "Save"
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, {
				open: privacy,
				onClose: () => setPrivacy(false),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg mb-2",
						children: "Privacy"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted leading-relaxed",
						children: "Guest phone numbers stay on this device in this demo. Auto-approve and multi-scan live on the dashboard. Export a CSV from Customers anytime."
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, {
				open: help,
				onClose: () => setHelp(false),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg mb-2",
							children: "Help"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "Email support@druto.in — we reply in English and Hindi."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "mailto:support@druto.in",
							className: "btn-primary w-full mt-4",
							children: "Email support"
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UpgradeSheet, {
				open: upgrade,
				onClose: () => setUpgrade(false)
			})
		]
	});
}
function Row({ icon: Icon, title, sub, onClick, last }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: `p-4 flex items-center justify-between w-full ${last ? "" : "border-b border-border"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "size-10 rounded-lg bg-primary-soft text-primary flex items-center justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-left",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-semibold",
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: sub
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4 text-muted" })]
	});
}
//#endregion
export { SettingsPage as component };
