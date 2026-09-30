import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { HoursDay } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatInr(n: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}

export function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

export function daysAgoIso(days: number) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().slice(0, 10);
}

export function formatShortDate(iso: string) {
  const d = new Date(iso + (iso.length === 10 ? "T12:00:00" : ""));
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

export function formatChartTick(iso: string) {
  const d = new Date(iso + "T12:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function uid(prefix = "id") {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}${Date.now().toString(36).slice(-3)}`;
}

export function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

export function downloadText(filename: string, text: string, mime = "text/plain") {
  const blob = new Blob([text], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.rel = "noopener";
  a.target = "_blank";
  a.style.display = "none";
  document.body.appendChild(a);
  a.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true, view: window }));
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 2500);
}

export function downloadDataUrl(filename: string, dataUrl: string) {
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = filename;
  a.rel = "noopener";
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export async function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

export function formatClock(hhmm: string) {
  const [hRaw, mRaw] = hhmm.split(":");
  const h = Number(hRaw);
  const m = Number(mRaw);
  if (Number.isNaN(h) || Number.isNaN(m)) return hhmm;
  const suffix = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, "0")} ${suffix}`;
}

export function todayHours(hours: Record<string, HoursDay>): { key: string; day: HoursDay } {
  const key = WEEKDAYS[new Date().getDay()] ?? "Mon";
  return { key, day: hours[key] ?? { open: "10:00", close: "22:00", closed: false } };
}

export function formatHoursLine(day: HoursDay) {
  if (day.closed) return "Closed";
  return `${formatClock(day.open)} – ${formatClock(day.close)}`;
}

export function formatPhoneDisplay(phone: string) {
  const d = phone.replace(/\D/g, "").slice(-10);
  if (d.length !== 10) return phone;
  return `+91 ${d.slice(0, 5)} ${d.slice(5)}`;
}

export function telHref(phone: string) {
  const d = phone.replace(/\D/g, "");
  return d ? `tel:+91${d.slice(-10)}` : undefined;
}

export function mapsHref(address: string, city: string, pincode: string) {
  const q = [address, city, pincode].filter(Boolean).join(", ");
  return `https://maps.google.com/?q=${encodeURIComponent(q)}`;
}

export function asHref(value: string) {
  const v = value.trim();
  if (!v) return "";
  if (/^https?:\/\//i.test(v)) return v;
  if (v.includes(".")) return `https://${v.replace(/^\/+/, "")}`;
  return `https://instagram.com/${v.replace(/^@/, "")}`;
}
