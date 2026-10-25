import { describe, expect, it } from "vitest";
import { waLink } from "@/lib/site";

describe("WhatsApp", () => {
  it("abre el número comercial +57 321 900 5713 con el mensaje", () => {
    expect(waLink("Hola Páez")).toBe("https://wa.me/573219005713?text=Hola%20P%C3%A1ez");
  });
});
