import { i as __toESM } from "../_runtime.mjs";
import { S as useNavigate, X as require_react, Y as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { h as useAppStore } from "./store-B4tRn7lE.mjs";
import { U as ChevronLeft, o as UserPlus } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Overlay } from "./ui-bits-yFL1YA4g.mjs";
import { t as QrImage } from "./qr-block-BmByxBJE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/presenter-YD5Os_Mn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function collectUrl() {
	if (typeof window === "undefined") return "https://druto.in/c";
	return `${window.location.origin}/c`;
}
function PresenterPage() {
	const navigate = useNavigate();
	const business = useAppStore((s) => s.business);
	const customers = useAppStore((s) => s.customers);
	const addCustomer = useAppStore((s) => s.addCustomer);
	const giveStamp = useAppStore((s) => s.giveStamp);
	const playScratch = useAppStore((s) => s.playScratch);
	const url = (0, import_react.useMemo)(() => collectUrl(), []);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [phone, setPhone] = (0, import_react.useState)("");
	const [name, setName] = (0, import_react.useState)("");
	function simulate() {
		const digits = phone.replace(/\D/g, "").slice(-10);
		if (digits.length < 10) {
			toast.error("Enter a 10-digit phone");
			return;
		}
		let customer = customers.find((c) => c.phone === digits);
		if (!customer) {
			const id = addCustomer({
				name: name.trim() || "Guest",
				phone: digits,
				notes: ""
			});
			customer = useAppStore.getState().customers.find((c) => c.id === id);
		}
		if (!customer) return;
		const stamp = giveStamp(customer.id);
		const scratch = playScratch(customer.id);
		toast.success(`${customer.name}: stamp ${stamp.completed ? "completed a card" : "added"}${scratch.won ? " · scratch win" : ""}`);
		setOpen(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background text-fg flex flex-col items-center px-5 py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => navigate({ to: "/" }),
				className: "self-start flex items-center gap-1 font-medium text-muted min-h-11",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4" }), " Back"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: business.logo,
				alt: "",
				className: "size-16 rounded-full mt-6 bg-surface border border-border p-1 object-cover"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl mt-3",
				children: business.name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-muted text-sm",
				children: [business.category, " · Scan to collect rewards"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "qr-plate p-3 mt-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrImage, {
					value: url,
					alt: "Business QR Code",
					className: "size-64"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setOpen(true),
				className: "btn-primary mt-8 px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "size-4" }), " Simulate a scan"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, {
				open,
				onClose: () => setOpen(false),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg mb-3",
							children: "Simulate customer scan"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "field mb-2",
							placeholder: "Name",
							value: name,
							onChange: (e) => setName(e.target.value)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "field",
							placeholder: "Phone",
							value: phone,
							onChange: (e) => setPhone(e.target.value),
							inputMode: "numeric"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: simulate,
							className: "btn-primary w-full mt-4",
							children: "Scan & stamp"
						})
					]
				})
			})
		]
	});
}
//#endregion
export { PresenterPage as component };
