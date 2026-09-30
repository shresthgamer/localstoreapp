import { createFileRoute, Link } from "@tanstack/react-router";
import { VegMark } from "@/components/ui-bits";
import { BusinessDetails, BusinessHero } from "@/components/business-profile";
import { useAppStore } from "@/lib/store";
import { cn, formatInr } from "@/lib/utils";

export const Route = createFileRoute("/m")({ component: PublicMenu });

function PublicMenu() {
  const b = useAppStore((s) => s.business);
  const menu = useAppStore((s) => s.menu);

  return (
    <div className="guest-page">
      <div className="px-4 pt-12 pb-16 max-w-lg mx-auto space-y-5 stagger-in">
        <BusinessHero business={b} />
        {menu.map((cat) => (
          <section key={cat.id}>
            <h2 className="text-lg mb-3">{cat.name}</h2>
            <div className="space-y-2">
              {cat.items.map((item) => (
                <article
                  key={item.id}
                  className={cn("panel p-3 flex gap-3", !item.inStock && "opacity-50")}
                >
                  {item.image ? (
                    <img src={item.image} alt="" className="size-16 rounded-md object-cover shrink-0" />
                  ) : (
                    <div className="size-16 rounded-md shrink-0 bg-primary-soft" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <VegMark veg={item.veg} />
                        <h3 className="font-medium text-sm truncate">{item.name}</h3>
                      </div>
                      <span className="font-medium text-sm shrink-0 tabular-nums">{formatInr(item.price)}</span>
                    </div>
                    {item.description ? <p className="text-sm text-muted mt-1">{item.description}</p> : null}
                    {!item.inStock ? <p className="text-xs font-medium mt-1 text-muted">Out of stock</p> : null}
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
        <BusinessDetails business={b} />
        <Link to="/c" className="btn-primary w-full">
          Collect stamps
        </Link>
      </div>
    </div>
  );
}
