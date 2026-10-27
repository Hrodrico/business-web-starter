@AGENTS.md

# CLAUDE.md

Guía para trabajar en este repositorio y en los proyectos clonados desde él.

## Qué es este repo

`business-web-starter` es la **versión inicial** de sitios y apps para negocios (construcción, barbería, mecánica, fletes, e-commerce…). Cada cliente se crea con "Use this template" en un repo propio y evoluciona por separado: no hay sincronización automática con la base.

Antes de cambiar algo, identifica en cuál de los dos contextos estás:

- **Base** (`business-web-starter`): solo cambios genéricos que sirvan a cualquier rubro. Nada específico de un cliente en componentes, `lib/` ni `types/`. Los negocios de `src/sites/` son demos para validar la base.
- **Clon de cliente** (ej: `noua-construccion-web`): se puede extender libremente (login, base de datos, nuevas rutas), pero respetando la arquitectura de abajo para que el proyecto siga siendo mantenible.

## Stack y comandos

Next.js 16 (App Router, `cacheComponents` + `partialPrefetching`), React 19, TypeScript estricto, Tailwind CSS 4, despliegue en Vercel. Node >= 20.19.

```bash
npm run dev                      # sitio por defecto
SITE_ID=barberia npm run dev     # otro negocio de src/sites
npm run lint
npm run build                    # verificación obligatoria antes de cerrar una tarea
```

No hay tests automatizados todavía. Como mínimo, toda tarea termina con `npm run lint` y `npm run build` sin errores; en la base, ejecuta además `SITE_ID=barberia npm run build` para confirmar que el cambio no depende de un negocio.

## Arquitectura

```text
src/app/            Rutas, layouts, metadatos. Único lugar que importa config y datos.
  (site)/           Sitio público. Futuras áreas: (auth)/, (dashboard)/ con su layout.
src/components/
  layout/           Header, Footer, MobileMenu, Container
  sections/         Bloques de página (Hero, Services, Projects, Reviews, Contact…)
  ui/               Piezas pequeñas (ButtonLink, Media, Rating, SocialLinks, icons)
src/lib/
  data.ts           Capa de acceso a datos: única puerta al contenido
  site.ts           Config del negocio activo
  contact.ts, navigation.ts, theme.ts, format.ts
src/sites/<id>/     config.ts (SiteConfig) + content.ts (SiteContent) por negocio
src/types/          Contratos: site.ts (configuración), content.ts (contenido)
```

### Reglas que no se rompen

1. **Componentes agnósticos al negocio.** Los componentes reciben todo por props y nunca importan `@/lib/site`, `@/lib/data` ni `@/sites`. El cableado se hace en `src/app/`.
2. **Contenido solo vía `src/lib/data.ts`.** Páginas y metadatos llaman a `getServices()`, `getProjects()`, `getReviews()`, etc. Para pasar a base de datos o CMS se reescribe el cuerpo de esas funciones manteniendo la firma (o se agregan nuevas), no se lee la base de datos desde componentes.
3. **Una sola fuente por dato.** Identidad, contacto, colores, SEO, secciones activas y etiquetas viven en `config.ts`; textos e items en `content.ts`. No duplicar entre ambos ni escribir textos de negocio en componentes.
4. **Vocabulario genérico en código, etiquetas en config.** En código: `projects`, `services`, `reviews`. Lo visible sale de `config.labels` ("Obras realizadas", "Nuestros cortes").
5. **Colores por tokens.** Usa las clases del tema (`bg-primary`, `text-primary-foreground`, `bg-accent`, `bg-surface`, `text-muted`, `border-border`, `bg-background`, `text-foreground`). Nunca colores hex ni paletas de Tailwind fijas (`bg-gray-100`) en componentes; un tema oscuro (barbería) y uno claro (construcción) deben verse bien con el mismo componente.
6. **Tipos primero.** Un campo nuevo se agrega en `src/types/` antes de usarlo; si es obligatorio, actualiza todos los negocios de `src/sites/`.

## Next.js 16: particularidades de este proyecto

Esta versión difiere de lo que suele conocerse de Next.js; consulta `node_modules/next/dist/docs/` ante cualquier duda (ver AGENTS.md).

- **Cache Components está activo.** Las funciones de `lib/data.ts` usan `"use cache"`. Valores inestables (`new Date()`, `Math.random()`) en render requieren `"use cache"` + `cacheLife`, `await connection()` o un componente cliente (ver `getCurrentYear` en `src/app/(site)/layout.tsx`).
- **No usar** `export const dynamic`, `revalidate`, `dynamicParams`, `fetchCache` ni `runtime`: no existen con Cache Components.
- **Rutas dinámicas:** `generateStaticParams` debe devolver al menos un parámetro (ver el placeholder en `trabajos/[slug]/page.tsx`). `params` es una Promise: `const { slug } = await props.params`.
- **Tipos de rutas globales:** `PageProps<"/ruta/[param]">` y `LayoutProps<"/">` no se importan; se generan con `next dev`, `next build` o `next typegen`.
- **Datos por usuario (login):** leer `cookies()`/`headers()` fuera de los scopes con `"use cache"` y pasar los valores como argumento; envolver lo dinámico en `<Suspense>`. Revisar `02-guides/authentication-with-cache-components.md` en la doc local.
- **Server Components por defecto.** `"use client"` solo para interactividad (ej: `MobileMenu`), lo más abajo posible en el árbol.

## Cómo escalar en un clon

| Necesidad | Cómo hacerlo |
| --- | --- |
| Quitar demos | Borrar carpetas sobrantes de `src/sites/`, dejar un solo negocio en `src/sites/index.ts` y ajustar `DEFAULT_SITE`. |
| Nueva sección del home | Tipo en `types/content.ts` → contenido en `content.ts` → getter en `lib/data.ts` → componente en `components/sections/` (props, sin config) → clave en `SectionKey`, `sections` y `labels` → render condicional en `(site)/page.tsx` → navegación en `lib/navigation.ts`. |
| Nueva página pública | `src/app/(site)/<ruta>/page.tsx` con `metadata` (title + `alternates.canonical`) y agregarla a `sitemap.ts`. |
| Login / panel | Grupos `src/app/(auth)/` y `src/app/(dashboard)/` con layout propio; protección de rutas en `src/proxy.ts` (reemplaza a middleware en Next 16). El sitio público no debe depender de la sesión. |
| Base de datos / CMS | Cliente en `src/lib/db.ts` (o similar), reescribir getters de `lib/data.ts`, `cacheTag` + `revalidateTag` al mutar. Los tipos de `types/content.ts` siguen siendo el contrato de la UI. |
| Formularios | Server Actions con validación en servidor (ej: zod) y respuesta accesible; nunca confiar en validación solo del cliente. |
| E-commerce / catálogo | Ruta `(site)/productos/` siguiendo el patrón de `trabajos/` (listado + `[slug]` + `generateStaticParams`). |
| Imágenes remotas | Configurar `images.remotePatterns` en `next.config.ts`. |

Si una mejora hecha en un clon es genérica (sirve a cualquier rubro), anótala para portarla manualmente a la base.

## Variables de entorno y secretos

- Documentar cada variable en `.env.example` (sí se versiona; `.env*` está ignorado salvo ese archivo).
- Nunca commitear secretos. Variables expuestas al cliente solo con prefijo `NEXT_PUBLIC_` y solo si son públicas por naturaleza.
- `SITE_ID` solo tiene sentido en la base; en un clon puede eliminarse.

## Calidad mínima

- **Accesibilidad:** HTML semántico, `alt` descriptivo en imágenes informativas, `aria-label` en botones de solo icono, foco visible, navegación por teclado, contraste suficiente con los colores del tema.
- **Responsive / mobile-first:** revisar en móvil antes que en escritorio.
- **Imágenes:** siempre vía `next/image` (componente `Media`), con `sizes` correcto; `priority` solo en la imagen principal visible al cargar.
- **SEO:** cada página con título propio y canonical; `site.url` con el dominio real antes de publicar.
- **Contenido:** no publicar datos de ejemplo (`example.com`, `+56 9 0000 0000`, reseñas inventadas) como si fueran reales.

## Convenciones de código

- TypeScript estricto, sin `any`. Tipos de dominio en `src/types/`, props tipadas con `type Props`.
- Exports nombrados para componentes (`export function HeroSection`); `export default` solo donde Next.js lo exige (pages, layouts, robots, sitemap).
- Alias `@/` para imports desde `src/`.
- Textos de UI y contenido en español; nombres de código (variables, tipos, archivos) en inglés.
- Comentarios breves y solo cuando explican el porqué.
- Commits pequeños y descriptivos; no commitear sin que `npm run build` pase.
