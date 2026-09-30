import { Y as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as formatPhoneDisplay, d as mapsHref, f as telHref, n as cn, o as formatHoursLine, p as todayHours, t as asHref } from "./store-B4tRn7lE.mjs";
import { E as Mail, F as Facebook, O as Linkedin, T as MapPin, f as Star, j as Instagram, t as Youtube, x as Phone, z as Clock } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/business-profile-Bl0KPctj.js
var import_jsx_runtime = require_jsx_runtime();
function BusinessHero({ business }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "size-20 rounded-full p-1 bg-surface shadow-card",
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
				className: "text-3xl mt-1",
				children: business.name
			}),
			business.about ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted mt-3 leading-relaxed",
				children: business.about
			}) : null
		]
	});
}
function BusinessDetails({ business, compact }) {
	const { key, day } = todayHours(business.hours);
	const phone = telHref(business.phone);
	const maps = mapsHref(business.address, business.city, business.pincode);
	const socials = [
		{
			href: asHref(business.instagram),
			label: "Instagram",
			icon: Instagram
		},
		{
			href: asHref(business.facebook),
			label: "Facebook",
			icon: Facebook
		},
		{
			href: asHref(business.youtube),
			label: "YouTube",
			icon: Youtube
		},
		{
			href: asHref(business.linkedin),
			label: "LinkedIn",
			icon: Linkedin
		},
		{
			href: asHref(business.googleReview),
			label: "Google reviews",
			icon: Star
		}
	].filter((s) => s.href);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [
			compact ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel p-5 space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "Visit"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: maps,
						target: "_blank",
						rel: "noreferrer",
						className: "flex items-start gap-3 text-sm min-h-11",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-4 mt-0.5 text-muted shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							business.address,
							business.city ? `, ${business.city}` : "",
							business.pincode ? ` ${business.pincode}` : ""
						] })]
					}),
					phone ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: phone,
						className: "flex items-center gap-3 text-sm min-h-11",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-4 text-muted shrink-0" }), formatPhoneDisplay(business.phone)]
					}) : null,
					business.email ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: `mailto:${business.email}`,
						className: "flex items-center gap-3 text-sm min-h-11",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-4 text-muted shrink-0" }), business.email]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "flex items-center gap-3 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-4 text-muted shrink-0" }),
							"Today (",
							key,
							") · ",
							formatHoursLine(day)
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow mb-4",
					children: "Hours"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-2",
					children: Object.entries(business.hours).map(([d, h]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center justify-between text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn(d === key ? "text-fg" : "text-muted"),
							children: d
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("tabular-nums", h.closed || d !== key ? "text-muted" : ""),
							children: formatHoursLine(h)
						})]
					}, d))
				})]
			}),
			socials.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow mb-4",
					children: "Follow"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: socials.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: s.href,
						target: "_blank",
						rel: "noreferrer",
						className: "inline-flex items-center gap-2 h-11 px-3 rounded-md bg-elevated text-sm font-medium",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, { className: "size-4" }), s.label]
					}, s.label))
				})]
			}) : null
		]
	});
}
//#endregion
export { BusinessHero as n, BusinessDetails as t };
