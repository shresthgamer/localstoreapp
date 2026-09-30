import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Check, Copy, Download, Eye, Mail, MessageCircle, Monitor, Share2, X } from "lucide-react";
import { toast } from "sonner";
import { copyText, mailtoHref, shareMessage, smsHref, whatsappHref } from "@/lib/actions";
import { downloadQr, useQrDataUrl } from "@/components/qr-block";
import { Overlay } from "@/components/ui-bits";

export function QrActions({
  url,
  businessName,
  filename,
  kind = "rewards",
  linkLabel = "Guest link",
  previewTo = "/c",
  previewLabel = "See what guests see",
  showPresenter = true,
}: {
  url: string;
  businessName: string;
  filename: string;
  kind?: "rewards" | "menu";
  linkLabel?: string;
  previewTo?: "/c" | "/m";
  previewLabel?: string;
  showPresenter?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [saveOpen, setSaveOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const fieldRef = useRef<HTMLInputElement>(null);
  const sheetFieldRef = useRef<HTMLInputElement>(null);
  const qrSrc = useQrDataUrl(url, 720);
  const message = shareMessage(businessName, url, kind);
  const canNativeShare = typeof navigator !== "undefined" && typeof navigator.share === "function";

  useEffect(() => {
    if (!shareOpen) return;
    const el = sheetFieldRef.current;
    if (!el) return;
    const id = window.setTimeout(() => {
      el.focus();
      el.select();
    }, 50);
    return () => window.clearTimeout(id);
  }, [shareOpen]);

  async function onCopy() {
    const ok = await copyText(url, fieldRef.current ?? sheetFieldRef.current);
    if (ok) {
      setCopied(true);
      toast.success(kind === "menu" ? "Menu link copied" : "Reward link copied");
      window.setTimeout(() => setCopied(false), 2000);
      return;
    }
    setShareOpen(true);
    toast.message("Tap the link, then copy");
  }

  async function onNativeShare() {
    if (!canNativeShare) return;
    try {
      await navigator.share({ title: businessName, text: message, url });
      toast.success("Shared");
      setShareOpen(false);
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") return;
      toast.message("Use WhatsApp or copy the link below");
    }
  }

  async function onDownload() {
    setSaving(true);
    try {
      await downloadQr(url, filename);
    } catch {
      /* framed browsers often block silent downloads */
    } finally {
      setSaving(false);
      setSaveOpen(true);
    }
  }

  function selectLink(el: HTMLInputElement) {
    el.focus();
    el.select();
    el.setSelectionRange(0, el.value.length);
  }

  return (
    <div className="relative z-20 space-y-3">
      <div className="grid grid-cols-2 gap-2">
        <button type="button" onClick={() => void onCopy()} className="btn-ghost">
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
          {copied ? "Copied" : "Copy"}
        </button>
        <button type="button" onClick={() => void onDownload()} className="btn-primary" disabled={saving}>
          <Download className="size-4" /> {saving ? "Saving…" : "Download"}
        </button>
        <button type="button" onClick={() => setShareOpen(true)} className="btn-ghost">
          <Share2 className="size-4" /> Share
        </button>
        {showPresenter ? (
          <Link to="/presenter" className="btn-ghost">
            <Monitor className="size-4" /> Presenter
          </Link>
        ) : (
          <Link to="/menu/edit" className="btn-ghost">
            Edit menu
          </Link>
        )}
      </div>

      <label className="block">
        <span className="eyebrow">{linkLabel}</span>
        <input
          ref={fieldRef}
          readOnly
          value={url}
          onFocus={(e) => selectLink(e.currentTarget)}
          onClick={(e) => selectLink(e.currentTarget)}
          className="field mt-1 text-sm"
          aria-label={linkLabel}
        />
      </label>

      <Link to={previewTo} className="btn-ghost w-full">
        <Eye className="size-4" /> {previewLabel}
      </Link>

      <Overlay open={shareOpen} onClose={() => setShareOpen(false)}>
        <div className="p-5 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-lg">{kind === "menu" ? "Share your menu" : "Share your QR"}</h2>
              <p className="text-sm text-muted mt-1">
                {kind === "menu"
                  ? "Send this link so guests open your digital menu."
                  : "Send this link so guests land on your stamp page."}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShareOpen(false)}
              className="size-11 rounded-full bg-background border border-border flex items-center justify-center shrink-0"
              aria-label="Close share"
            >
              <X className="size-4" />
            </button>
          </div>
          <input
            ref={sheetFieldRef}
            readOnly
            value={url}
            onFocus={(e) => selectLink(e.currentTarget)}
            onClick={(e) => selectLink(e.currentTarget)}
            className="field text-sm"
            aria-label={linkLabel}
          />
          <button type="button" onClick={() => void onCopy()} className="btn-primary w-full">
            {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
            {copied ? "Copied" : "Copy link"}
          </button>
          {canNativeShare ? (
            <button type="button" onClick={() => void onNativeShare()} className="btn-ghost w-full">
              <Share2 className="size-4" /> Share from this device
            </button>
          ) : null}
          <a href={whatsappHref(message)} target="_blank" rel="noreferrer" className="btn-ghost w-full">
            <MessageCircle className="size-4" /> WhatsApp
          </a>
          <a href={smsHref(message)} className="btn-ghost w-full">
            Messages
          </a>
          <a
            href={mailtoHref(`${businessName} ${kind === "menu" ? "menu" : "rewards"}`, message)}
            className="btn-ghost w-full"
          >
            <Mail className="size-4" /> Email
          </a>
          <Link to={previewTo} className="btn-ghost w-full" onClick={() => setShareOpen(false)}>
            <Eye className="size-4" /> Open guest view
          </Link>
        </div>
      </Overlay>

      <Overlay open={saveOpen} onClose={() => setSaveOpen(false)}>
        <div className="p-5 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-lg">Save QR code</h2>
              <p className="text-sm text-muted mt-1">Tap Download PNG. If nothing saves, press and hold the image.</p>
            </div>
            <button
              type="button"
              onClick={() => setSaveOpen(false)}
              className="size-11 rounded-full bg-background border border-border flex items-center justify-center shrink-0"
              aria-label="Close save"
            >
              <X className="size-4" />
            </button>
          </div>
          {qrSrc ? (
            <img src={qrSrc} alt="QR code" className="w-full rounded-xl border border-border bg-surface" />
          ) : (
            <div className="aspect-square rounded-xl bg-primary-soft animate-pulse" />
          )}
          {qrSrc ? (
            <a href={qrSrc} download={filename} className="btn-primary w-full">
              <Download className="size-4" /> Download PNG
            </a>
          ) : (
            <button type="button" className="btn-primary w-full" disabled>
              Preparing…
            </button>
          )}
          <button type="button" onClick={() => void onCopy()} className="btn-ghost w-full">
            <Copy className="size-4" /> Copy link instead
          </button>
        </div>
      </Overlay>
    </div>
  );
}
