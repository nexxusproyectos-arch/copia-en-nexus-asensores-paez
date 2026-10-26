import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { PROJECTS, type ProjectCategory } from "@/lib/images";

const CATS: ("Todos" | ProjectCategory)[] = ["Todos", "Pasajeros", "Carga", "Montacoches", "Movilidad reducida", "Puertas vehiculares", "Escaleras eléctricas"];

export function Gallery({ limit }: { limit?: number }) {
  const [cat, setCat] = useState<(typeof CATS)[number]>("Todos");
  const [idx, setIdx] = useState<number | null>(null);
  const items = PROJECTS.filter((p) => cat === "Todos" || p.category === cat).slice(0, limit);

  useEffect(() => {
    if (idx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIdx(null);
      if (e.key === "ArrowRight") setIdx((i) => (i === null ? i : (i + 1) % items.length));
      if (e.key === "ArrowLeft") setIdx((i) => (i === null ? i : (i - 1 + items.length) % items.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [idx, items.length]);

  return (
    <div>
      <LayoutGroup id="gallery"><div className="flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Filtrar proyectos">
        {CATS.map((c) => (
          <button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)} className={`relative shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${cat === c ? "border-foreground text-background" : "border-border hover:border-foreground"}`}>
            {cat === c && <motion.span layoutId="gallery-pill" className="absolute inset-0 -z-0 rounded-full bg-foreground" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
            <span className="relative">{c}</span>
          </button>
        ))}
      </div>
      </LayoutGroup>
      <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3">
        <AnimatePresence mode="popLayout" initial={false}>
        {items.map((p, i) => (
          <motion.button layout initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.35 }} key={p.src + p.title} onClick={() => setIdx(i)} className={`group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-lg bg-muted text-left ${["h-80", "h-56", "h-64"][i % 3]}`} aria-label={`Ver foto: ${p.title}`}>
            <img src={p.src} alt={p.alt} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent p-4 text-ink-foreground">
              <span className="text-[0.65rem] font-bold uppercase tracking-widest text-primary">{p.category}</span>
              <span className="block font-bold">{p.title}</span>
            </div>
          </motion.button>
        ))}
        </AnimatePresence>
      </div>
      {idx !== null && items[idx] && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/95 p-4" role="dialog" aria-modal="true" aria-label={items[idx].title} onClick={() => setIdx(null)}>
          <button className="absolute right-4 top-4 rounded-full p-2 text-ink-foreground" aria-label="Cerrar" onClick={() => setIdx(null)}><X className="h-7 w-7" /></button>
          <button className="absolute left-2 rounded-full p-2 text-ink-foreground md:left-6" aria-label="Anterior" onClick={(e) => { e.stopPropagation(); setIdx((idx - 1 + items.length) % items.length); }}><ChevronLeft className="h-9 w-9" /></button>
          <figure className="max-h-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <img src={items[idx].src} alt={items[idx].alt} className="max-h-[80vh] w-auto rounded object-contain" />
            <figcaption className="mt-3 text-center text-sm text-ink-muted">{items[idx].title} · {items[idx].category}</figcaption>
          </figure>
          <button className="absolute right-2 rounded-full p-2 text-ink-foreground md:right-6" aria-label="Siguiente" onClick={(e) => { e.stopPropagation(); setIdx((idx + 1) % items.length); }}><ChevronRight className="h-9 w-9" /></button>
        </div>
      )}
    </div>
  );
}
