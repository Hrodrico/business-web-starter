import { describe, expect, it, vi } from "vitest";
import { activeSite } from "@/sites";
import { withPlaceholder, withPlaceholders } from "./images";

// JSON simulado: el real depende de las fotos de cada negocio y en la base está vacío.
const localSrc = "/images/projects/2026/ejemplo/foto.webp";
const localBlur = "data:image/webp;base64,UklGRg==";
vi.mock("@/generated/image-placeholders.json", () => ({
  default: { "/images/projects/2026/ejemplo/foto.webp": "data:image/webp;base64,UklGRg==" },
}));

describe("withPlaceholder", () => {
  it("agrega la vista previa generada a una imagen local", () => {
    expect(withPlaceholder({ src: localSrc, alt: "Foto" }).blurDataURL).toBe(localBlur);
  });

  it("respeta una vista previa propia", () => {
    const image = { src: localSrc, alt: "Foto", blurDataURL: "data:image/webp;base64,AAAA" };
    expect(withPlaceholder(image)).toEqual(image);
  });

  it("deja igual una imagen sin vista previa generada", () => {
    const image = { src: "https://example.com/foto.webp", alt: "Foto" };
    expect(withPlaceholder(image)).toEqual(image);
  });
});

describe("withPlaceholders", () => {
  it("no modifica el contenido original", () => {
    const before = JSON.stringify(activeSite.content);
    withPlaceholders(activeSite.content);
    expect(JSON.stringify(activeSite.content)).toBe(before);
  });
});
