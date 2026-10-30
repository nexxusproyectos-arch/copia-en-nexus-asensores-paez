import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { FloorIndicator } from "./FloorIndicator";
import { UrgencyBar } from "./UrgencyBar";
import { Button } from "@/components/ui/button";
import { IMG } from "@/lib/images";
import { MASTER_SERVICES } from "@/lib/services";
import { SITE } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  useEffect(() => setSolid(window.scrollY > 80), []);
  useMotionValueEvent(scrollY, "change", (y) => {
    setSolid(y > 80);
    setHidden(y > 240 && y > (scrollY.getPrevious() ?? 0) && !open);
  });
  const close = () => { setOpen(false); setServicesOpen(false); };
  return <>
    <div className="relative"><UrgencyBar /></div>
    <motion.header animate={{ y: hidden ? "-100%" : "0%" }} transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }} className={`sticky top-0 z-50 border-b transition-[background-color,border-color] duration-300 ${solid ? "border-border bg-background/85 shadow-xl backdrop-blur-md" : "border-transparent bg-background"}`}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 lg:h-20">
        <div className="flex min-w-0 items-center gap-3">
          <Link to="/" aria-label={`${SITE.name} – inicio`} onClick={close} className="shrink-0"><img src={IMG.logo} alt="Logo Ascensores Páez S.A.S." className="h-10 w-auto lg:h-12" width={54} height={44} /></Link>
          <FloorIndicator />
        </div>
        <nav className="hidden items-center gap-7 text-sm font-semibold lg:flex" aria-label="Principal">
          <Link to="/" activeOptions={{ exact: true }} activeProps={{ className: "text-primary" }} className="hover:text-primary">Inicio</Link>
          <Link to="/nuestra-empresa" activeProps={{ className: "text-primary" }} className="hover:text-primary">Nuestra Empresa</Link>
          <div className="group relative">
            <Button variant="ghost" onClick={() => setServicesOpen(!servicesOpen)} aria-expanded={servicesOpen} className="h-auto p-0 font-semibold hover:bg-transparent hover:text-primary">Servicios <ChevronDown /></Button>
            <div className={`${servicesOpen ? "visible opacity-100" : "invisible opacity-0 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100"} absolute right-0 top-full w-80 pt-4 transition-opacity`}>
              <div className="rounded-md border border-border bg-background p-2 shadow-xl">{MASTER_SERVICES.map((s) => <Link key={s.slug} to="/servicios/$slug" params={{ slug: s.slug }} onClick={close} className="block rounded-md px-3 py-3 hover:bg-muted">{s.name}</Link>)}</div>
            </div>
          </div>
          <Link to="/contacto" activeProps={{ className: "text-primary" }} className="hover:text-primary">Contacto</Link>
        </nav>
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(!open)} aria-label={open ? "Cerrar menú" : "Abrir menú"} aria-expanded={open}>{open ? <X /> : <Menu />}</Button>
      </div>
      {open && <nav className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-border bg-background px-5 pb-6 lg:hidden" aria-label="Móvil">
        <Link to="/" onClick={close} className="block border-b border-border py-3 font-semibold">Inicio</Link>
        <Link to="/nuestra-empresa" onClick={close} className="block border-b border-border py-3 font-semibold">Nuestra Empresa</Link>
        <Button variant="ghost" onClick={() => setServicesOpen(!servicesOpen)} className="h-auto w-full justify-between rounded-none border-b border-border px-0 py-3 font-semibold" aria-expanded={servicesOpen}>Servicios <ChevronDown className={servicesOpen ? "rotate-180" : ""} /></Button>
        {servicesOpen && <div className="border-b border-border py-2">{MASTER_SERVICES.map((s) => <Link key={s.slug} to="/servicios/$slug" params={{ slug: s.slug }} onClick={close} className="block py-2 pl-3 text-sm text-muted-foreground">{s.name}</Link>)}</div>}
        <Link to="/contacto" onClick={close} className="block border-b border-border py-3 font-semibold">Contacto</Link>
      </nav>}
    </motion.header>
  </>;
}
