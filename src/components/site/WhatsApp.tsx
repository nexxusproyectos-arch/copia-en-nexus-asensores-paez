import { MessageCircle } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Magnetic } from "./motion";
import { SITE, WA_GENERAL, waLink } from "@/lib/site";

export function WhatsAppButton({ message, label = "Escribir por WhatsApp", variant = "primary", className = "" }: { message: string; label?: string; variant?: "primary" | "outline" | "light"; className?: string }) {
  const styles = {
    primary: "bg-primary text-primary-foreground hover:brightness-110",
    outline: "border border-current hover:bg-foreground/5",
    light: "bg-background text-foreground hover:bg-muted",
  }[variant];
  const a = (
    <a href={waLink(message)} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center justify-center gap-2 rounded-md px-6 py-3.5 text-sm font-bold transition ${styles} ${variant === "primary" ? "btn-shine" : ""} ${className}`}>
      <MessageCircle className="h-5 w-5" /> {label}
    </a>
  );
  return variant === "primary" ? <Magnetic>{a}</Magnetic> : a;
}

export function WhatsAppFloating() {
  const [tip, setTip] = useState(false);
  useEffect(() => {
    const show = setTimeout(() => setTip(true), 8000);
    const hide = setTimeout(() => setTip(false), 14000);
    return () => { clearTimeout(show); clearTimeout(hide); };
  }, []);
  return (
    <>
      <div className="fixed bottom-6 right-6 z-40 hidden items-center gap-3 lg:flex">
        <AnimatePresence>
          {tip && (
            <motion.span initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 12 }} className="rounded-md bg-ink px-3 py-2 text-sm font-bold text-ink-foreground shadow-lg">
              ¿Hablamos?
            </motion.span>
          )}
        </AnimatePresence>
        <a href={waLink(WA_GENERAL)} target="_blank" rel="noopener noreferrer" aria-label="Escribir a Ascensores Páez por WhatsApp" className="wa-pulse relative isolate flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-ink-foreground shadow-lg transition hover:scale-105">
          <MessageCircle className="h-7 w-7" />
        </a>
      </div>
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-border bg-background/95 p-3 backdrop-blur lg:hidden">
        <a href={`tel:${SITE.phoneE164}`} className="rounded-md border border-border py-3 text-center text-sm font-bold">Llamar</a>
        <a href={waLink(WA_GENERAL)} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-md bg-whatsapp py-3 text-sm font-bold text-ink-foreground">
          <MessageCircle className="h-4 w-4" /> WhatsApp
        </a>
      </div>
    </>
  );
}

export function CtaBand({ message = WA_GENERAL, title = "¿Tienes un proyecto en mente? Hablemos hoy." }: { message?: string; title?: string }) {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-5 py-16 md:flex-row md:items-center md:justify-between">
        <h2 className="max-w-2xl text-3xl font-extrabold tracking-tight md:text-4xl">{title}</h2>
        <WhatsAppButton message={message} variant="light" label="Hablar con un asesor" />
      </div>
    </section>
  );
}
