import { useCallback, useEffect, useState } from "react";
import { X } from "lucide-react";
import { IMG_META, IMG_POSITION, isVerticalImage } from "@/lib/images";
import { Reveal } from "./motion";

type Photo = { src: string; alt: string };

// Galería por servicio: mosaico en desktop, carrusel con scroll-snap en móvil y lightbox al hacer clic.
// Solo se renderiza cuando la página tiene fotos reales del cliente (gallery no vacía).
export function ServiceGallery({ title, photos }: { title: string; photos: Photo[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);
  if (photos.length === 0) return null;
  const current = open !== null ? photos[open] : undefined;
  return (
    <section className="border-t border-border py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-5">
        <Reveal><h2 className="text-3xl font-extrabold md:text-4xl">{title}</h2></Reveal>
        <div className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 lg:grid lg:snap-none lg:grid-cols-3 lg:overflow-visible lg:pb-0">
          {photos.map((photo, i) => {
            const meta = IMG_META[photo.src];
            return (
              <button
                key={photo.src + i}
                type="button"
                onClick={() => setOpen(i)}
                className="group w-4/5 shrink-0 snap-center overflow-hidden rounded-lg border border-border sm:w-2/3 lg:w-auto"
                aria-label={`Ampliar foto: ${photo.alt}`}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  width={meta?.w ?? 720}
                  height={meta?.h ?? 540}
                  style={{ objectPosition: IMG_POSITION[photo.src] ?? "center" }}
                  className={`w-full object-cover transition-transform duration-700 motion-safe:group-hover:scale-[1.04] ${isVerticalImage(photo.src) ? "aspect-[4/5]" : "aspect-[4/3]"}`}
                />
              </button>
            );
          })}
        </div>
      </div>
      {current && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 p-5" role="dialog" aria-modal="true" aria-label={current.alt} onClick={close}>
          <button type="button" onClick={close} aria-label="Cerrar" className="absolute right-5 top-5 rounded-full bg-background/10 p-2 text-ink-foreground hover:bg-background/20"><X className="h-6 w-6" /></button>
          <img src={current.src} alt={current.alt} className="max-h-[85vh] max-w-full rounded-lg object-contain" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </section>
  );
}
