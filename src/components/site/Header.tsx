import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { FloorIndicator } from "./FloorIndicator";
import { ChevronDown, Menu, X } from "lucide-react";
import { IMG } from "@/lib/images";
import { SERVICES } from "@/lib/services";
import { SITE, WA_GENERAL, waLink } from "@/lib/site";
import { UrgencyBar } from "./UrgencyBar";

const nav = [
  { to: "/", label: "Inicio" },
  { to: "/proyectos", label: "Proyectos" },
  { to: "/nosotros", label: "Nosotros" },
  { to: "/contacto", label: "Contacto" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [sol, setSol] = useState(false);
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  useEffect(() => setSolid(window.scrollY > 80), []);
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setSolid(y > 80);
    setHidden(y > 240 && y > prev && !open);
  });
  return (
    <>
    <div className="relative"><UrgencyBar /></div>
    <motion.header
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
      className={`sticky top-0 z-50 border-b transition-[background-color,box-shadow,border-color] duration-300 ${solid ? "border-border bg-background/85 shadow-[0_8px_30px_-12px_color-mix(in_oklab,var(--foreground)_25%,transparent)] backdrop-blur-md" : "border-transparent bg-background"}`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 lg:h-20">
        <div className="flex shrink-0 items-center gap-3">
        <Link to="/" className="flex shrink-0 items-center gap-2" aria-label={`${SITE.name} – inicio`}>
          <img src={IMG.logo} alt="Logo Ascensores Páez S.A.S." className="h-10 w-auto lg:h-12" width={54} height={44} />
        </Link>
        <FloorIndicator />
        </div>
        <nav className="hidden items-center gap-7 text-sm font-semibold lg:flex" aria-label="Principal">
          <Link to="/" activeOptions={{ exact: true }} activeProps={{ className: "text-primary" }} className="hover:text-primary">Inicio</Link>
          <div className="group relative">
            <button className="flex items-center gap-1 hover:text-primary" aria-haspopup="true">
              Soluciones <ChevronDown className="h-4 w-4" />
            </button>
            <div className="invisible absolute left-1/2 top-full w-[34rem] -translate-x-1/2 pt-4 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
              <div className="grid grid-cols-2 gap-1 rounded-lg border border-border bg-background p-3 shadow-xl">
                {SERVICES.map((s) => (
                  <Link key={s.slug} to="/servicios/$slug" params={{ slug: s.slug }} className="rounded-md px-3 py-2 hover:bg-muted">
                    <span className="block text-sm font-bold">{s.name}</span>
                    <span className="block text-xs font-normal text-muted-foreground">{s.short}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          {nav.slice(1).map((n) => (
            <Link key={n.to} to={n.to} activeProps={{ className: "text-primary" }} className="hover:text-primary">{n.label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href={waLink(WA_GENERAL)} target="_blank" rel="noopener noreferrer" className="hidden rounded-md bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition hover:brightness-110 sm:inline-flex">
            Solicitar asesoría
          </a>
          <button className="rounded-md p-2 lg:hidden" onClick={() => setOpen(!open)} aria-label={open ? "Cerrar menú" : "Abrir menú"} aria-expanded={open}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-border bg-background px-5 pb-6 lg:hidden" aria-label="Móvil">
          <Link to="/" onClick={() => setOpen(false)} className="block border-b border-border py-3 font-semibold">Inicio</Link>
          <button onClick={() => setSol(!sol)} className="flex w-full items-center justify-between border-b border-border py-3 font-semibold" aria-expanded={sol}>
            Soluciones <ChevronDown className={`h-4 w-4 transition ${sol ? "rotate-180" : ""}`} />
          </button>
          {sol && (
            <div className="border-b border-border py-2">
              {SERVICES.map((s) => (
                <Link key={s.slug} to="/servicios/$slug" params={{ slug: s.slug }} onClick={() => setOpen(false)} className="block py-2 pl-3 text-sm text-muted-foreground">
                  {s.name}
                </Link>
              ))}
            </div>
          )}
          {nav.slice(1).map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="block border-b border-border py-3 font-semibold">{n.label}</Link>
          ))}
          <a href={waLink(WA_GENERAL)} target="_blank" rel="noopener noreferrer" className="mt-5 block rounded-md bg-primary py-3 text-center font-bold text-primary-foreground">
            Solicitar asesoría
          </a>
        </nav>
      )}
    </motion.header>
    </>
  );
}
