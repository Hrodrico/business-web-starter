import type { SiteConfig } from "@/types/site";
import type { SiteContent } from "@/types/content";
import * as construccion from "./construccion/config";
import * as construccionContent from "./construccion/content";
import * as barberia from "./barberia/config";
import * as barberiaContent from "./barberia/content";

export type Site = {
  config: SiteConfig;
  content: SiteContent;
};

/**
 * Sitios disponibles en la base. Al clonar para un cliente, deja solo su
 * carpeta, registra aquí ese único sitio y borra los demás.
 */
const sites = {
  construccion: { config: construccion.config, content: construccionContent.content },
  barberia: { config: barberia.config, content: barberiaContent.content },
} satisfies Record<string, Site>;

type SiteId = keyof typeof sites;

const DEFAULT_SITE: SiteId = "construccion";

function resolveSite(): Site {
  const id = process.env.SITE_ID ?? DEFAULT_SITE;
  if (!(id in sites)) {
    throw new Error(
      `SITE_ID "${id}" no existe. Opciones: ${Object.keys(sites).join(", ")}`,
    );
  }
  return sites[id as SiteId];
}

export const activeSite = resolveSite();
