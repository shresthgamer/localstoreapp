import { i as __toESM } from "../_runtime.mjs";
import { S as useNavigate, X as require_react, Y as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { h as useAppStore, i as fileToDataUrl, m as uid, n as cn } from "./store-B4tRn7lE.mjs";
import { N as ImagePlus, U as ChevronLeft, b as Plus, u as Trash2, v as ScanLine, y as RotateCcw } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Toggle, r as VegMark, t as Overlay } from "./ui-bits-yFL1YA4g.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/menu.edit-DSWurOWd.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function emptyItem() {
	return {
		id: uid("it"),
		name: "New Item",
		description: "",
		price: 0,
		inStock: true,
		veg: true,
		image: ""
	};
}
function MenuEditPage() {
	const navigate = useNavigate();
	const menu = useAppStore((s) => s.menu);
	const setMenu = useAppStore((s) => s.setMenu);
	const resetMenu = useAppStore((s) => s.resetMenu);
	const setMenuLive = useAppStore((s) => s.setMenuLive);
	const theme = useAppStore((s) => s.business.menuTheme);
	const patchBusiness = useAppStore((s) => s.patchBusiness);
	const [styleOpen, setStyleOpen] = (0, import_react.useState)(false);
	function patchCat(id, p) {
		setMenu(menu.map((c) => c.id === id ? {
			...c,
			...p
		} : c));
	}
	function patchItem(catId, itemId, p) {
		setMenu(menu.map((c) => c.id === catId ? {
			...c,
			items: c.items.map((i) => i.id === itemId ? {
				...i,
				...p
			} : i)
		} : c));
	}
	function scanPage() {
		const extra = {
			id: uid("cat"),
			name: "Chef specials",
			image: "/images/cat-food.png",
			items: [{
				id: uid("it"),
				name: "Lab Burger",
				description: "House patty, cheddar, secret sauce",
				price: 299,
				inStock: true,
				veg: false,
				image: "/images/item-food.png"
			}, {
				id: uid("it"),
				name: "Saffron Lassi",
				description: "Hung curd, saffron, pistachio",
				price: 149,
				inStock: true,
				veg: true,
				image: ""
			}]
		};
		setMenu([...menu, extra]);
		toast.success("Page scanned — 2 items added");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background pb-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "w-full max-w-3xl mx-auto pt-4 mb-6 px-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel sticky top-4 z-50 px-4 py-3 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => navigate({ to: "/offers" }),
						className: "flex items-center gap-1.5 text-sm min-h-11",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4" }), " Menu"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setStyleOpen(true),
						className: "btn-primary h-11 px-5",
						children: "Style"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full max-w-3xl mx-auto pb-24 px-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "panel p-5 mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-center mb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "eyebrow",
								children: "Editor"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => {
									resetMenu();
									toast.success("Menu reset");
								},
								className: "flex items-center gap-1 eyebrow text-danger min-h-11",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-3" }), " Reset"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: scanPage,
								className: "btn-ghost w-full",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScanLine, { className: "size-4" }), " Scan next page"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setMenu([...menu, {
									id: uid("cat"),
									name: "New Category",
									image: "/images/cat-food.png",
									items: [emptyItem()]
								}]),
								className: "btn-ghost w-full",
								children: "Add category"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-3",
						children: menu.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "panel overflow-hidden",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between p-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3 flex-1 min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "size-12 bg-elevated rounded-full overflow-hidden cursor-pointer shrink-0",
											children: [cat.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												alt: "",
												src: cat.image,
												className: "size-full object-cover"
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, { className: "size-4 m-4 text-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												className: "hidden",
												type: "file",
												accept: "image/*",
												onChange: async (e) => {
													const f = e.target.files?.[0];
													if (f) patchCat(cat.id, { image: await fileToDataUrl(f) });
												}
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											className: "font-medium text-sm bg-transparent outline-none w-full",
											placeholder: "Category name",
											value: cat.name,
											onChange: (e) => patchCat(cat.id, { name: e.target.value })
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setMenu(menu.filter((c) => c.id !== cat.id)),
										className: "size-11 text-muted flex items-center justify-center",
										"aria-label": "Delete category",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "border-t border-border",
									children: cat.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "p-4 flex gap-4 items-start border-b border-border last:border-b-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "size-16 bg-elevated rounded-lg overflow-hidden cursor-pointer flex items-center justify-center shrink-0",
											children: [item.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: item.image,
												alt: "",
												className: "size-full object-cover"
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, { className: "size-5 text-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												className: "hidden",
												type: "file",
												accept: "image/*",
												onChange: async (e) => {
													const f = e.target.files?.[0];
													if (f) patchItem(cat.id, item.id, { image: await fileToDataUrl(f) });
												}
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex-1 min-w-0",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex justify-between gap-2 mb-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														placeholder: "Item name",
														className: "font-medium text-sm bg-transparent outline-none w-full",
														value: item.name,
														onChange: (e) => patchItem(cat.id, item.id, { name: e.target.value })
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "bg-elevated font-medium text-xs px-3 py-1.5 rounded-full shrink-0 flex items-center gap-1",
														children: ["₹", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															className: "bg-transparent w-12 outline-none font-medium tabular-nums",
															type: "number",
															value: item.price,
															onChange: (e) => patchItem(cat.id, item.id, { price: Number(e.target.value) || 0 })
														})]
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
													rows: 2,
													placeholder: "Description",
													className: "text-sm text-muted w-full bg-transparent outline-none resize-none",
													value: item.description,
													onChange: (e) => patchItem(cat.id, item.id, { description: e.target.value })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-between mt-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center gap-3",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "eyebrow",
																children: "Stock"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
																on: item.inStock,
																onToggle: () => patchItem(cat.id, item.id, { inStock: !item.inStock })
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																type: "button",
																onClick: () => patchItem(cat.id, item.id, { veg: !item.veg }),
																"aria-label": "Toggle veg",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VegMark, { veg: item.veg })
															})
														]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														onClick: () => patchCat(cat.id, { items: cat.items.filter((i) => i.id !== item.id) }),
														className: "size-11 text-muted flex items-center justify-center",
														"aria-label": "Delete item",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
													})]
												})
											]
										})]
									}, item.id))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "p-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => patchCat(cat.id, { items: [...cat.items, emptyItem()] }),
										className: "btn-ghost w-full",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }),
											" Add item to ",
											cat.name
										]
									})
								})
							]
						}, cat.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							setMenuLive(true);
							toast.success("Menu is live");
							navigate({ to: "/menu/live" });
						},
						className: "mt-6 btn-primary w-full",
						children: "Publish menu"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, {
				open: styleOpen,
				onClose: () => setStyleOpen(false),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg mb-2",
							children: "Menu look"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted mb-4",
							children: "Guests always see the club theme. This keeps a label for your records."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-3 gap-3",
							children: [
								"classic",
								"dark",
								"warm"
							].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									patchBusiness({ menuTheme: t });
									toast.success(`${t} saved`);
								},
								className: cn("h-20 rounded-lg capitalize font-medium shadow-card", theme === t ? "bg-primary text-primary-foreground" : "bg-elevated"),
								children: t
							}, t))
						})
					]
				})
			})
		]
	});
}
//#endregion
export { MenuEditPage as component };
