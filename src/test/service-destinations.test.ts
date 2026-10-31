import { describe, expect, it } from "vitest";
import { contactServiceSelection } from "@/lib/contact-details";
import { CURRENT_SERVICE_SLUGS, elevatorAnchor, getService } from "@/lib/services";
import { IMG } from "@/lib/images";
import { sitemapStaticPaths, sitemapXML, sitemapPathForLocation } from "@/lib/sitemap";
import { routeTree } from "@/routeTree.gen";
import { createRouter } from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";

describe("final client service destinations", () => {
  it("omits an empty servicio parameter from contact URLs", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    expect(router.buildLocation({ to: "/contacto", search: { servicio: "" } }).href).toBe("/contacto");
    expect(router.buildLocation({ to: "/contacto", search: { servicio: "ascensores-carga" } }).href).toBe("/contacto?servicio=ascensores-carga");
  });
  it.each([
    ["ascensores-pasajeros", "pasajeros", "Ascensores para Pasajeros"],
    ["ascensores-carga", "carga", "Ascensores de Carga (Montacargas)"],
    ["montacoches", "montacoches", "Montacoches (Elevacoches)"],
    ["movilidad-reducida", "movilidad-reducida", "Ascensores para Movilidad Reducida"],
  ])("maps %s to the requested anchor and selected service", (slug, anchor, selection) => {
    expect(elevatorAnchor(slug)).toBe(anchor);
    expect(contactServiceSelection(slug)).toBe(selection);
  });
  it("does not preselect a service for an unknown query", () => {
    expect(contactServiceSelection("unknown")).toBe("");
  });
  it("retains the requested non-elevator service pages including reparaciones", () => {
    expect(CURRENT_SERVICE_SLUGS).toEqual(["ascensores", "puertas-vehiculares", "escaleras-electricas", "instalacion", "modernizacion", "mantenimiento", "adecuacion-normativa", "reparaciones"]);
  });
  it("preselects Reparaciones Técnicas Especializadas from its service page", () => {
    expect(contactServiceSelection("reparaciones")).toBe("Reparaciones Técnicas Especializadas");
  });
  it("uses the exact client-approved WhatsApp button labels", () => {
    expect(getService("puertas-vehiculares")?.whatsappLabel).toBe("Cotizar y Asesorarme por WhatsApp");
    expect(getService("escaleras-electricas")?.whatsappLabel).toBe("Cotizar y Asesorarme por WhatsApp");
    expect(getService("mantenimiento")?.whatsappLabel).toBe("Cotizar Mantenimiento por WhatsApp");
    expect(getService("reparaciones")?.whatsappLabel).toBe("Solicitar Reparación por WhatsApp");
    expect(getService("modernizacion")?.whatsappLabel).toBe("Cotizar Modernización por WhatsApp");
    expect(getService("adecuacion-normativa")?.whatsappLabel).toBe("Cotizar Adecuación de Hallazgos por WhatsApp");
  });
  it("does not use the camillero photo on the reparaciones page", () => {
    expect(getService("reparaciones")?.image).not.toBe(IMG.camillero);
  });
  it("builds the home lead-form URL with service and anchor", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    expect(router.buildLocation({ to: "/", search: { servicio: "mantenimiento" }, hash: "formulario" }).href).toBe("/?servicio=mantenimiento#formulario");
  });
  it("excludes redirect URLs from the sitemap and includes current public pages", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    const paths = sitemapStaticPaths(router);
    expect(paths).toContain("/");
    expect(paths).toContain("/contacto");
    expect(paths).not.toContain("/proyectos");
    expect(paths).not.toContain("/nosotros");
    const location = router.buildLocation({ to: "/servicios/$slug", params: { slug: "ascensores" }, search: () => ({}), hash: "" });
    expect(sitemapPathForLocation(router, location, "/servicios/$slug")).toBe("/servicios/ascensores");
    expect(sitemapXML("https://asensorespaez.lovable.app", paths.map((path) => ({ path })))).not.toContain("<lastmod>");
  });
});