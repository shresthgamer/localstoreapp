import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { QrActions } from "@/components/qr-actions";
import { QrImage } from "@/components/qr-block";
import { usePublicUrl } from "@/lib/actions";
import { useAppStore } from "@/lib/store";

export const Route = createFileRoute("/menu/live")({ component: MenuLivePage });

function MenuLivePage() {
  const navigate = useNavigate();
  const business = useAppStore((s) => s.business);
  const url = usePublicUrl("/m");

  return (
    <AppShell hideStats>
      <div className="w-full mx-auto pb-8 animate-fade-in">
        <button
          type="button"
          onClick={() => navigate({ to: "/offers" })}
          className="flex items-center gap-1.5 mt-1 text-muted text-sm min-h-11"
        >
          <ChevronLeft className="size-4" /> Back
        </button>
        <div className="mb-6 mt-2">
          <h1 className="text-2xl">Digital menu</h1>
          <p className="text-sm text-muted mt-1">Live and ready for guests.</p>
        </div>
        <div className="panel-lg p-6">
          <div className="flex justify-center mb-6">
            <div className="qr-plate size-64">
              <QrImage value={url} alt="Digital Menu QR" className="size-full object-contain" />
            </div>
          </div>
          <QrActions
            url={url}
            businessName={business.name}
            filename={`${business.name}-menu-qr.png`}
            kind="menu"
            linkLabel="Menu link"
            previewTo="/m"
            previewLabel="Preview as a guest"
            showPresenter={false}
          />
        </div>
      </div>
    </AppShell>
  );
}
