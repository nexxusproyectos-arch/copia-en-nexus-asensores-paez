type SiteEvent = "click_whatsapp" | "click_llamar" | "Lead";
export function trackEvent(event: SiteEvent) {
  if (typeof window === "undefined") return;
  const target = window as Window & { dataLayer?: Record<string, unknown>[] };
  target.dataLayer = target.dataLayer ?? [];
  target.dataLayer.push({ event });
}
