import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { ClipboardList } from "lucide-react";
import { ELEVATOR_BLOCKS } from "@/lib/services";
import { IMG_META, IMG_POSITION, isVerticalImage } from "@/lib/images";
import { Button } from "@/components/ui/button";
import { NormativeSection } from "./NormativeSection";
import { WhatsAppButton } from "./WhatsApp";

export function ElevatorServices() {
  const reduce = useReducedMotion();
  return <>
    <section className="bg-ink text-ink-foreground">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:py-16">
        <nav aria-label="Ruta" className="text-xs text-ink-muted"><Link to="/" className="hover:text-ink-foreground">Inicio</Link> / <span>Servicios</span> / <span className="text-ink-foreground">Ascensores</span></nav>
        <h1 className="mt-6 text-4xl font-extrabold md:text-5xl">Ascensores</h1>
        <p className="mt-5 max-w-4xl text-lg leading-relaxed text-ink-muted">Diseño, instalación, mantenimiento y modernización de sistemas de transporte vertical (Pasajeros, Carga, Montacoches y Movilidad Reducida).</p>
      </div>
    </section>
    {ELEVATOR_BLOCKS.map((block, index) => <section key={block.id} id={block.id} className="scroll-mt-28 overflow-hidden border-b border-border py-14 lg:py-20">
      <motion.div initial={false} whileInView={{ opacity: [0.6, 1], x: reduce ? 0 : [index % 2 === 0 ? -24 : 24, 0] }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: reduce ? 0.2 : 0.6 }} className="mx-auto grid max-w-7xl items-center gap-8 px-5 lg:grid-cols-2 lg:gap-14">
        <div className={`group overflow-hidden rounded-lg ${index % 2 === 1 ? "lg:order-2" : ""}`}><img src={block.image} alt={block.imageAlt} loading="lazy" width={IMG_META[block.image]?.w ?? 720} height={IMG_META[block.image]?.h ?? 540} style={{ objectPosition: IMG_POSITION[block.image] ?? "center" }} className={`w-full object-cover transition-transform duration-700 motion-safe:group-hover:scale-[1.04] ${isVerticalImage(block.image) ? "mx-auto aspect-[4/5] max-h-[560px]" : "aspect-[4/3]"}`} /></div>
        <div className="min-w-0"><h2 className="text-3xl font-extrabold leading-tight">{block.title}</h2><p className="mt-6 leading-relaxed text-muted-foreground">{block.text}</p>
          <div className="mt-8 flex flex-col items-start gap-3 xl:flex-row xl:flex-wrap">
            <WhatsAppButton message={block.whatsapp} label="Cotizar por WhatsApp" />
            <Button asChild className="h-auto min-h-12 whitespace-normal px-6 py-3.5 font-bold"><Link to="/contacto" search={{ servicio: block.slug }}><ClipboardList />Prefiero Dejar Datos</Link></Button>
          </div>
        </div>
      </motion.div>
    </section>)}
    <NormativeSection />
  </>;
}