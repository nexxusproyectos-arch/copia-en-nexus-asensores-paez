import { describe, expect, it } from "vitest";
import { contactServiceSelection } from "@/lib/contact-details";
import { CURRENT_SERVICE_SLUGS, elevatorAnchor } from "@/lib/services";
import { sitemapStaticPaths, sitemapXML, sitemapPathForLocation } from "@/lib/sitemap";
import { routeTree } from "@/routeTree.gen";
import { createRouter } from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";

describe("final client service destinations", () => {
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
  it("retains the six requested non-elevator service pages", () => {
    expect(CURRENT_SERVICE_SLUGS).toEqual(["ascensores", "puertas-vehiculares", "escaleras-electricas", "instalacion", "modernizacion", "mantenimiento", "adecuacion-normativa"]);
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