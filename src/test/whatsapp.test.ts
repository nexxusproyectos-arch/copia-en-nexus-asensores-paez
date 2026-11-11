import { describe, expect, it } from "vitest";
import { SITE, waLink } from "@/lib/site";

describe("WhatsApp", () => {
  it("abre el número comercial +57 321 900 5713 con el mensaje", () => {
    expect(waLink("Hola Páez")).toBe("https://wa.me/573219005713?text=Hola%20P%C3%A1ez");
  });
  it("conserva el número secundario 321 339 2269 solo como teléfono adicional", () => {
    expect(SITE.secondaryPhoneDisplay).toBe("+57 321 339 2269");
    expect(SITE.secondaryPhoneE164).toBe("+573213392269");
    expect(SITE.whatsappNumber).toBe("573219005713");
  });
});
