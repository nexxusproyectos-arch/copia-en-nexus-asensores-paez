import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getService } from "@/lib/services";
const FLOORS = [
  { id: "inicio", n: 1, label: "Inicio" },
  { id: "servicios", n: 2, label: "Servicios" },
  { id: "normativa", n: 3, label: "Norma" },
  { id: "servicios-tecnicos", n: 4, label: "Servicios técnicos" },
  { id: "testimonios", n: 5, label: "Testimonios" },
  { id: "formulario", n: 6, label: "Contacto" },
];
function pageLabel(path: string) {
  if (path.startsWith("/servicios/")) return getService(path.split("/")[2] ?? "")?.name ?? "Servicios";
  if (path === "/nuestra-empresa" || path === "/nosotros") return "Nuestra Empresa";
  if (path === "/contacto") return "Contacto";
  if (path === "/proyectos") return "Proyectos";
  if (path === "/politica-de-privacidad") return "Política de privacidad";
  return "Inicio";
}
export function FloorIndicator() {
  const { pathname } = useLocation();
  const [floor, setFloor] = useState(FLOORS[0]);
  const [dir, setDir] = useState<1 | -1>(1);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (pathname !== "/") return;
    let lastY = window.scrollY;
    const update = () => {
      const y = window.scrollY;
      if (Math.abs(y - lastY) > 4) { setDir(y > lastY ? 1 : -1); lastY = y; }
      let current = FLOORS[0];
      for (const f of FLOORS) { const el = document.getElementById(f.id); if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) current = f; }
      if (window.innerHeight + y >= document.documentElement.scrollHeight - 200) current = FLOORS[5];
      setFloor(current);
    };
    update(); window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [pathname]);
  const label = pathname === "/" ? floor?.label ?? "Inicio" : pageLabel(pathname);
  return <div className="hidden min-w-0 items-center gap-2 rounded-md bg-ink px-2.5 py-1.5 font-mono text-ink-foreground sm:flex" aria-label={pathname === "/" ? `Piso ${floor?.n ?? 1}: ${label}` : label} title={label}>
    {pathname === "/" && <><span className="text-[0.6rem] leading-none text-primary">{dir === 1 ? "▲" : "▼"}</span><span className="relative block h-4 w-6 overflow-hidden text-sm font-bold leading-4 text-primary"><AnimatePresence initial={false}><motion.span key={floor?.n} className="absolute inset-0 text-center" initial={{ y: reduce ? 0 : dir * 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: reduce ? 0 : dir * -16, opacity: 0 }} transition={{ duration: 0.35 }}>P{floor?.n ?? 1}</motion.span></AnimatePresence></span></>}
    <span className="max-w-64 truncate text-[0.6rem] text-ink-muted">{label}</span>
  </div>;
}
