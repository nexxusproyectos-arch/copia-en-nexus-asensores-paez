import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { ClipboardList, Phone } from "lucide-react";
import { Magnetic } from "./motion";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { Button } from "@/components/ui/button";
import { SITE, WA_GENERAL, waLink } from "@/lib/site";

export function scrollToForm() {
  document.getElementById("formulario")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
}
export function WhatsAppButton({ message, label = "Escribir por WhatsApp", variant = "primary", className = "" }: { message: string; label?: string; variant?: "primary" | "outline" | "light"; className?: string }) {
  const action = <Button asChild variant="whatsapp" className={`btn-shine h-auto min-h-12 whitespace-normal px-6 py-3.5 text-center font-bold ${className}`}><a href={waLink(message)} target="_blank" rel="noopener noreferrer"><WhatsAppIcon className="h-5 w-5" />{label}</a></Button>;
  return variant === "primary" ? <Magnetic className={className.includes("w-full") ? "w-full" : ""}>{action}</Magnetic> : action;
}
export function WhatsAppFloating() {
  const [tip, setTip] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    if (sessionStorage.getItem("whatsapp-tip-shown") === "1") return;
    const show = setTimeout(() => { setTip(true); sessionStorage.setItem("whatsapp-tip-shown", "1"); }, 8000);
    const hide = setTimeout(() => setTip(false), 14000);
    return () => { clearTimeout(show); clearTimeout(hide); };
  }, []);
  return <>
    <div className="fixed bottom-6 right-6 z-40 hidden items-center gap-3 lg:flex">
      <AnimatePresence>{tip && <motion.span initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 12 }} className="rounded-md bg-ink px-3 py-2 text-sm font-bold text-ink-foreground shadow-lg">¿Hablamos?</motion.span>}</AnimatePresence>
      <Button asChild variant="whatsapp" size="icon" className="wa-pulse relative isolate h-14 w-14 rounded-full shadow-lg"><a href={waLink(WA_GENERAL)} target="_blank" rel="noopener noreferrer" aria-label="Escribir a Ascensores Páez por WhatsApp"><WhatsAppIcon className="size-7" /></a></Button>
    </div>
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 gap-2 border-t border-border bg-background/95 p-3 backdrop-blur lg:hidden">
      <Button asChild variant="outline" className="h-12 px-2 font-bold"><a href={`tel:${SITE.phoneE164}`}><Phone />Llamar</a></Button>
      <Button asChild variant="whatsapp" className="h-12 px-2 font-bold"><a href={waLink(WA_GENERAL)} target="_blank" rel="noopener noreferrer"><WhatsAppIcon />WhatsApp</a></Button>
      {pathname === "/" ? <Button className="h-12 px-2 font-bold" onClick={scrollToForm}><ClipboardList />Cotizar</Button> : <Button asChild className="h-12 px-2 font-bold"><Link to="/contacto"><ClipboardList />Cotizar</Link></Button>}
    </div>
  </>;
}
export function CtaBand({ message = WA_GENERAL, title = "¿Tiene un proyecto en mente? Hablemos hoy." }: { message?: string; title?: string }) {
  return <section className="bg-primary text-primary-foreground"><div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-5 py-16 md:flex-row md:items-center md:justify-between"><h2 className="max-w-2xl text-3xl font-extrabold md:text-4xl">{title}</h2><WhatsAppButton message={message} variant="light" label="Hablar con un asesor" /></div></section>;
}
