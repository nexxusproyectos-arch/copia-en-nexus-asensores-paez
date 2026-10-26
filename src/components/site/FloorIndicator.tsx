import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

const FLOORS = [
  { id: "inicio", n: 1, label: "Inicio" },
  { id: "soluciones", n: 2, label: "Soluciones" },
  { id: "normativa", n: 3, label: "Normativa" },
  { id: "proyectos", n: 4, label: "Proyectos" },
  { id: "testimonios", n: 5, label: "Testimonios" },
  { id: "contacto-final", n: 6, label: "Contacto" },
];

function floorForPath(p: string) {
  if (p.startsWith("/servicios")) return FLOORS[1]!;
  if (p.startsWith("/proyectos")) return FLOORS[3]!;
  if (p.startsWith("/contacto")) return FLOORS[5]!;
  return FLOORS[0]!;
}

export function FloorIndicator() {
  const { pathname } = useLocation();
  const [floor, setFloor] = useState(floorForPath(pathname));
  const [dir, setDir] = useState<1 | -1>(1);
  const prev = useRef(floor.n);

  useEffect(() => {
    setFloor(floorForPath(pathname));
    if (pathname !== "/") return;
    const els = FLOORS.map((f) => document.getElementById(f.id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const onScroll = () => {
      const mid = window.innerHeight * 0.4;
      let cur = FLOORS[0]!;
      for (const f of FLOORS) {
        const el = document.getElementById(f.id);
        if (el && el.getBoundingClientRect().top <= mid) cur = f;
      }
      setFloor((old) => (old.n === cur.n ? old : cur));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    if (floor.n !== prev.current) setDir(floor.n > prev.current ? 1 : -1);
    prev.current = floor.n;
  }, [floor.n]);

  return (
    <div className="hidden items-center gap-2 rounded-md bg-ink px-2.5 py-1.5 font-mono text-ink-foreground sm:flex" aria-label={`Piso ${floor.n}: ${floor.label}`} title={floor.label}>
      <span className="text-[0.6rem] leading-none text-primary">{dir === 1 ? "▲" : "▼"}</span>
      <span className="relative block h-4 w-6 overflow-hidden text-sm font-bold leading-4 text-primary">
        <AnimatePresence initial={false} custom={dir}>
          <motion.span
            key={floor.n}
            custom={dir}
            className="absolute inset-0 text-center"
            initial={{ y: dir * 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: dir * -16, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
          >
            P{floor.n}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="hidden text-[0.6rem] uppercase tracking-widest text-ink-muted md:inline">{floor.label}</span>
    </div>
  );
}
