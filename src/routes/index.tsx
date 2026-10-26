import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Compass, FileCheck2, HardHat, MessageCircle, Phone, ShieldCheck, UserRound } from "lucide-react";
import { useState } from "react";
import { Cotizador } from "@/components/site/Cotizador";
import { IMG } from "@/lib/images";
import { SERVICES } from "@/lib/services";
import { HOME_STATS, SITE, waLink } from "@/lib/site";
import { WhatsAppButton } from "@/components/site/WhatsApp";
import { Testimonials } from "@/components/site/Testimonials";
import { Gallery } from "@/components/site/Gallery";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ascensores Páez S.A.S. | Ascensores y transporte vertical en Bogotá" },
      { name: "description", content: "Ascensores para pasajeros, montacargas, montacoches, escaleras eléctricas y puertas vehiculares. Instalación, modernización y mantenimiento en Bogotá." },
      { property: "og:title", content: "Ascensores Páez S.A.S. | Movilidad vertical con respaldo técnico" },
      { property: "og:description", content: "Soluciones de transporte vertical y automatización de accesos en Bogotá. Escríbenos por WhatsApp." },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

