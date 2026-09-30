import { useEffect, useState } from "react";

export function usePublicUrl(path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const [url, setUrl] = useState(() =>
    typeof window === "undefined" ? normalized : `${window.location.origin}${normalized}`,
  );
  useEffect(() => {
    setUrl(`${window.location.origin}${normalized}`);
  }, [normalized]);
  return url;
}

export function isEmbeddedFrame() {
  return typeof window !== "undefined" && window.parent !== window;
}

function copyViaExecCommand(text: string, field?: HTMLInputElement | HTMLTextAreaElement | null): boolean {
  const el =
    field ??
    (() => {
      const input = document.createElement("textarea");
      input.value = text;
      input.setAttribute("readonly", "true");
      input.setAttribute("aria-hidden", "true");
      input.style.cssText =
        "position:fixed;top:0;left:0;width:2px;height:2px;padding:0;border:0;outline:none;opacity:0.01;z-index:-1;";
      document.body.appendChild(input);
      return input;
    })();
  const created = !field;
  try {
    el.focus();
    el.select();
    el.setSelectionRange(0, text.length);
    return document.execCommand("copy");
  } catch {
    return false;
  } finally {
    if (created) el.remove();
  }
}

export async function copyText(
  text: string,
  field?: HTMLInputElement | HTMLTextAreaElement | null,
): Promise<boolean> {
  if (typeof window === "undefined" || !text) return false;
  // execCommand first so we keep the user gesture (clipboard API often fails in iframes).
  if (copyViaExecCommand(text, field)) return true;
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* iframe / permissions — fall through */
  }
  return false;
}

function clickAnchor(href: string, download?: string) {
  const a = document.createElement("a");
  a.href = href;
  if (download) a.download = download;
  a.rel = "noopener";
  a.target = "_blank";
  a.style.display = "none";
  document.body.appendChild(a);
  a.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true, view: window }));
  a.remove();
}

export async function triggerDownload(filename: string, dataUrl: string): Promise<boolean> {
  try {
    const res = await fetch(dataUrl);
    const blob = await res.blob();
    const objectUrl = URL.createObjectURL(blob);
    clickAnchor(objectUrl, filename);
    window.setTimeout(() => URL.revokeObjectURL(objectUrl), 2500);
    // Framed previews usually swallow <a download>; callers should show a save sheet.
    return !isEmbeddedFrame();
  } catch {
    try {
      clickAnchor(dataUrl, filename);
      return !isEmbeddedFrame();
    } catch {
      return false;
    }
  }
}

export function shareMessage(businessName: string, url: string, kind: "rewards" | "menu" = "rewards") {
  if (kind === "menu") return `View the menu at ${businessName}: ${url}`;
  return `Scan to collect rewards at ${businessName}: ${url}`;
}

export function whatsappHref(text: string) {
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}

export function smsHref(text: string) {
  return `sms:?body=${encodeURIComponent(text)}`;
}

export function mailtoHref(subject: string, text: string) {
  return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
}
