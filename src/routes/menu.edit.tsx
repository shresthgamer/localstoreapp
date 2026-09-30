import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ChevronLeft, ImagePlus, Plus, RotateCcw, ScanLine, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { VegMark, Overlay, Toggle } from "@/components/ui-bits";
import { useAppStore } from "@/lib/store";
import type { MenuCategory, MenuItem } from "@/lib/types";
import { fileToDataUrl, uid } from "@/lib/utils";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/menu/edit")({ component: MenuEditPage });

function emptyItem(): MenuItem {
  return { id: uid("it"), name: "New Item", description: "", price: 0, inStock: true, veg: true, image: "" };
}

function MenuEditPage() {
  const navigate = useNavigate();
  const menu = useAppStore((s) => s.menu);
  const setMenu = useAppStore((s) => s.setMenu);
  const resetMenu = useAppStore((s) => s.resetMenu);
  const setMenuLive = useAppStore((s) => s.setMenuLive);
  const theme = useAppStore((s) => s.business.menuTheme);
  const patchBusiness = useAppStore((s) => s.patchBusiness);
  const [styleOpen, setStyleOpen] = useState(false);

  function patchCat(id: string, p: Partial<MenuCategory>) {
    setMenu(menu.map((c) => (c.id === id ? { ...c, ...p } : c)));
  }
  function patchItem(catId: string, itemId: string, p: Partial<MenuItem>) {
    setMenu(menu.map((c) => (c.id === catId ? { ...c, items: c.items.map((i) => (i.id === itemId ? { ...i, ...p } : i)) } : c)));
  }

  function scanPage() {
    const extra: MenuCategory = {
      id: uid("cat"),
      name: "Chef specials",
      image: "/images/cat-food.png",
      items: [
        { id: uid("it"), name: "Lab Burger", description: "House patty, cheddar, secret sauce", price: 299, inStock: true, veg: false, image: "/images/item-food.png" },
        { id: uid("it"), name: "Saffron Lassi", description: "Hung curd, saffron, pistachio", price: 149, inStock: true, veg: true, image: "" },
      ],
    };
    setMenu([...menu, extra]);
    toast.success("Page scanned — 2 items added");
  }

  return (
    <div className="min-h-screen bg-background pb-12">
      <div className="w-full max-w-3xl mx-auto pt-4 mb-6 px-4">
        <div className="panel sticky top-4 z-50 px-4 py-3 flex items-center justify-between">
          <button type="button" onClick={() => navigate({ to: "/offers" })} className="flex items-center gap-1.5 text-sm min-h-11">
            <ChevronLeft className="size-4" /> Menu
          </button>
          <button type="button" onClick={() => setStyleOpen(true)} className="btn-primary h-11 px-5">
            Style
          </button>
        </div>
      </div>

      <div className="w-full max-w-3xl mx-auto pb-24 px-4">
        <div className="panel p-5 mb-4">
          <div className="flex justify-between items-center mb-4">
            <h4 className="eyebrow">Editor</h4>
            <button
              type="button"
              onClick={() => {
                resetMenu();
                toast.success("Menu reset");
              }}
              className="flex items-center gap-1 eyebrow text-danger min-h-11"
            >
              <RotateCcw className="size-3" /> Reset
            </button>
          </div>
          <div className="space-y-2">
            <button type="button" onClick={scanPage} className="btn-ghost w-full">
              <ScanLine className="size-4" /> Scan next page
            </button>
            <button
              type="button"
              onClick={() => setMenu([...menu, { id: uid("cat"), name: "New Category", image: "/images/cat-food.png", items: [emptyItem()] }])}
              className="btn-ghost w-full"
            >
              Add category
            </button>
          </div>
        </div>

        <ul className="space-y-3">
          {menu.map((cat) => (
            <li key={cat.id} className="panel overflow-hidden">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <label className="size-12 bg-elevated rounded-full overflow-hidden cursor-pointer shrink-0">
                    {cat.image ? <img alt="" src={cat.image} className="size-full object-cover" /> : <ImagePlus className="size-4 m-4 text-muted" />}
                    <input className="hidden" type="file" accept="image/*" onChange={async (e) => {
                      const f = e.target.files?.[0];
                      if (f) patchCat(cat.id, { image: await fileToDataUrl(f) });
                    }} />
                  </label>
                  <input
                    className="font-medium text-sm bg-transparent outline-none w-full"
                    placeholder="Category name"
                    value={cat.name}
                    onChange={(e) => patchCat(cat.id, { name: e.target.value })}
                  />
                </div>
                <button type="button" onClick={() => setMenu(menu.filter((c) => c.id !== cat.id))} className="size-11 text-muted flex items-center justify-center" aria-label="Delete category">
                  <Trash2 className="size-4" />
                </button>
              </div>
              <ul className="border-t border-border">
                {cat.items.map((item) => (
                  <li key={item.id} className="p-4 flex gap-4 items-start border-b border-border last:border-b-0">
                    <label className="size-16 bg-elevated rounded-lg overflow-hidden cursor-pointer flex items-center justify-center shrink-0">
                      {item.image ? <img src={item.image} alt="" className="size-full object-cover" /> : <ImagePlus className="size-5 text-muted" />}
                      <input className="hidden" type="file" accept="image/*" onChange={async (e) => {
                        const f = e.target.files?.[0];
                        if (f) patchItem(cat.id, item.id, { image: await fileToDataUrl(f) });
                      }} />
                    </label>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between gap-2 mb-1">
                        <input
                          placeholder="Item name"
                          className="font-medium text-sm bg-transparent outline-none w-full"
                          value={item.name}
                          onChange={(e) => patchItem(cat.id, item.id, { name: e.target.value })}
                        />
                        <div className="bg-elevated font-medium text-xs px-3 py-1.5 rounded-full shrink-0 flex items-center gap-1">
                          ₹
                          <input
                            className="bg-transparent w-12 outline-none font-medium tabular-nums"
                            type="number"
                            value={item.price}
                            onChange={(e) => patchItem(cat.id, item.id, { price: Number(e.target.value) || 0 })}
                          />
                        </div>
                      </div>
                      <textarea
                        rows={2}
                        placeholder="Description"
                        className="text-sm text-muted w-full bg-transparent outline-none resize-none"
                        value={item.description}
                        onChange={(e) => patchItem(cat.id, item.id, { description: e.target.value })}
                      />
                      <div className="flex items-center justify-between mt-1">
                        <div className="flex items-center gap-3">
                          <span className="eyebrow">Stock</span>
                          <Toggle on={item.inStock} onToggle={() => patchItem(cat.id, item.id, { inStock: !item.inStock })} />
                          <button type="button" onClick={() => patchItem(cat.id, item.id, { veg: !item.veg })} aria-label="Toggle veg">
                            <VegMark veg={item.veg} />
                          </button>
                        </div>
                        <button type="button" onClick={() => patchCat(cat.id, { items: cat.items.filter((i) => i.id !== item.id) })} className="size-11 text-muted flex items-center justify-center" aria-label="Delete item">
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="p-4">
                <button
                  type="button"
                  onClick={() => patchCat(cat.id, { items: [...cat.items, emptyItem()] })}
                  className="btn-ghost w-full"
                >
                  <Plus className="size-4" /> Add item to {cat.name}
                </button>
              </div>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => {
            setMenuLive(true);
            toast.success("Menu is live");
            navigate({ to: "/menu/live" });
          }}
          className="mt-6 btn-primary w-full"
        >
          Publish menu
        </button>
      </div>

      <Overlay open={styleOpen} onClose={() => setStyleOpen(false)}>
        <div className="p-5">
          <h2 className="text-lg mb-2">Menu look</h2>
          <p className="text-sm text-muted mb-4">Guests always see the club theme. This keeps a label for your records.</p>
          <div className="grid grid-cols-3 gap-3">
            {(["classic", "dark", "warm"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => {
                  patchBusiness({ menuTheme: t });
                  toast.success(`${t} saved`);
                }}
                className={cn(
                  "h-20 rounded-lg capitalize font-medium shadow-card",
                  theme === t ? "bg-primary text-primary-foreground" : "bg-elevated",
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </Overlay>
    </div>
  );
}
