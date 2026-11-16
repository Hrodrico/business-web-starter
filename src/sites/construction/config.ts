import type { SiteConfig } from "@/types/site";

// TODO: datos provisionales. Reemplazar dominio, contacto y redes reales antes de publicar.
export const config: SiteConfig = {
  name: "Noua Construcción",
  tagline: "Construcción y remodelación",
  description:
    "Soluciones de construcción y remodelación para hogares y empresas en Santiago.",
  url: "https://www.example.com",
  locale: "es-CL",
  contact: {
    phone: "+56 9 0000 0000",
    email: "contacto@example.com",
    whatsapp: {
      number: "+56 9 0000 0000",
      message: "Hola, quisiera solicitar una cotización.",
    },
    city: "Santiago, Chile",
    hours: [
      { label: "Lunes a viernes", value: "09:00 – 18:00" },
      { label: "Sábado", value: "10:00 – 14:00" },
    ],
  },
  social: [
    { network: "instagram", url: "https://instagram.com/" },
    { network: "facebook", url: "https://facebook.com/" },
  ],
  branding: {},
  theme: {
    primary: "#263746",
    primaryForeground: "#FFFFFF",
    accent: "#C58B52",
    accentForeground: "#1A1A1A",
    accentText: "#8A5A2B",
    background: "#FFFFFF",
    foreground: "#20252B",
    surface: "#F4F2EF",
    muted: "#5B6470",
    border: "#E2DED8",
  },
  // Opcional: con themeDark el sitio sigue la preferencia del sistema y muestra el botón sol/luna.
  themeDark: {
    primary: "#3E5A78",
    primaryForeground: "#FFFFFF",
    accent: "#C58B52",
    accentForeground: "#1A1A1A",
    accentText: "#D9A574",
    background: "#121820",
    foreground: "#E6E9EE",
    surface: "#1B232D",
    muted: "#9AA5B5",
    border: "#2C3744",
  },
  seo: {
    title: "Noua Construcción | Construcción y remodelación en Santiago",
    description:
      "Construcción, remodelación y terminaciones para hogares y empresas. Solicita tu cotización.",
    keywords: ["construcción", "remodelación", "Santiago", "obras"],
  },
  sections: {
    about: true,
    services: true,
    projects: true,
    reviews: true,
    contact: true,
  },
  labels: {
    about: "Sobre nosotros",
    services: "Servicios",
    projects: "Obras realizadas",
    reviews: "Lo que dicen nuestros clientes",
    contact: "Contacto",
  },
};
