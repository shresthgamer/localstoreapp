import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { triggerDownload } from "@/lib/actions";
import { cn } from "@/lib/utils";

export function useQrDataUrl(value: string, size = 320) {
  const [src, setSrc] = useState("");
  useEffect(() => {
    let alive = true;
    if (!value) {
      setSrc("");
      return;
    }
    QRCode.toDataURL(value, {
      width: size,
      margin: 1,
      color: { dark: "#121310", light: "#f3f0e7" },
      errorCorrectionLevel: "M",
    })
      .then((url) => {
        if (alive) setSrc(url);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [value, size]);
  return src;
}

export function QrImage({
  value,
  alt,
  className,
  size = 320,
}: {
  value: string;
  alt: string;
  className?: string;
  size?: number;
}) {
  const src = useQrDataUrl(value, size);
  if (!src) {
    return <div className={cn("animate-pulse bg-primary-soft", className)} />;
  }
  return <img src={src} alt={alt} className={className} />;
}

export async function downloadQr(value: string, filename: string) {
  const url = await QRCode.toDataURL(value, {
    width: 720,
    margin: 2,
    color: { dark: "#1c1814", light: "#ffffff" },
  });
  const ok = await triggerDownload(filename, url);
  return { ok, url };
}
