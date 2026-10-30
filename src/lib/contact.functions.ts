import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const contactSchema = z.object({
  nombre: z.string().trim().min(2, "Escribe tu nombre").max(100),
  telefono: z.string().trim().regex(/^[0-9+\s()-]{7,20}$/, "Teléfono no válido"),
  correo: z.string().trim().email("Correo no válido").max(255).optional().or(z.literal("")),
  servicio: z.string().trim().min(1, "Selecciona un servicio").max(100),
  empresa: z.string().trim().max(150).optional(),
  ciudad: z.string().trim().max(100).optional(),
  mensaje: z.string().trim().min(5, "Cuéntanos un poco más").max(1000),
  acepta: z.literal(true, { errorMap: () => ({ message: "Debes aceptar la política de datos" }) }),
});

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => contactSchema.parse(d))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("contact_submissions").insert({
      nombre: data.nombre,
      telefono: data.telefono,
      correo: data.correo || null,
      servicio: data.servicio,
      mensaje: [data.empresa ? `Nombre del Edificio o Empresa: ${data.empresa}` : "", data.ciudad ? `Ciudad: ${data.ciudad}` : "", data.mensaje].filter(Boolean).join("\n\n"),
    });
    if (error) {
      console.error(error);
      throw new Error("No pudimos guardar tu solicitud");
    }
    return { ok: true };
  });
