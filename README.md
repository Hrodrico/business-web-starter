# Business Web Starter

Base reutilizable para crear el sitio web de un negocio con **Next.js**, **TypeScript** y **Tailwind CSS**, desplegada en **Vercel**.

Trae lo que todo negocio necesita desde el día uno: **home, servicios, trabajos realizados con reseñas, contacto (WhatsApp, teléfono, correo) y redes sociales**, con modo claro/oscuro, carrusel de fotos y vistas previas mientras cargan las imágenes. Cada proyecto nuevo (construcción, barbería, mecánica, fletes, e-commerce…) parte clonando este repositorio y crece por su cuenta: uno puede quedarse como sitio informativo y otro sumar login, agenda o carrito.

## Cómo se usa

```text
business-web-starter          ← esta base (GitHub Template repository)
   ├── noua-construccion-web  ← sitio informativo
   ├── barberia-xxx-app       ← + login y seguimiento de atención
   └── ...
```

1. En GitHub: **Use this template → Create a new repository** (ej: `noua-construccion-web`).
2. Personaliza la configuración y el contenido del negocio (ver más abajo).
3. Conecta el repositorio nuevo a Vercel y asigna el dominio.

Los clones no se sincronizan con la base. Si mejoras algo aquí, cópialo manualmente a los proyectos que lo necesiten.

## Stack

- [Next.js 16](https://nextjs.org/) (App Router, Cache Components)
- [React 19](https://react.dev/) y [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Vercel](https://vercel.com/) para hosting

Requiere **Node.js 24 LTS** (obligatorio). Con `nvm use` se activa la versión de `.nvmrc`. Con otra versión, `npm install` falla (`engine-strict` en `.npmrc`) y `dev`/`build`/`start` se detienen con un aviso.

## Desarrollo local

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build de producción
npm run start      # sirve el build
npm run lint
npm run images:placeholders   # vistas previas de las fotos (corre solo antes de dev y build)
```

La base incluye dos negocios de ejemplo para comprobar que todo cambia sin tocar componentes:

```bash
npm run dev                          # construction (por defecto)
SITE_ID=barbershop npm run dev       # barbería de ejemplo
```

## Tests

```bash
npm test                          # unitarios (Vitest), una pasada
npm run test:watch                # unitarios en modo watch
npx playwright install chromium   # solo la primera vez
npm run test:e2e                  # E2E (Playwright) contra el build de producción
```

- Los tests unitarios viven **junto a cada archivo** (`Rating.tsx` + `Rating.test.tsx`).
- Los E2E viven en `e2e/` y recorren el sitio en móvil y escritorio.
- `src/sites/sites.test.ts` valida el contenido de cada negocio: slugs, fechas, reseñas, textos `alt`, que existan las fotos y los logos locales (y su vista previa) y el contraste de los colores del tema en modo claro y oscuro.
- Los tests no dependen de un negocio: `SITE_ID=barbershop npm run test:e2e` prueba la otra demo.

### Integración continua

`.github/workflows/ci.yml` corre en GitHub Actions en cada push a `main` y en cada pull request: lint y tests unitarios, build + E2E por cada negocio de `src/sites`, y al final el job **CI completo**, que solo pasa si todo lo anterior pasó. Si falla un E2E, el reporte de Playwright queda como artefacto del run.

Vercel no ejecuta los tests: solo hace el build y publica. Para que no llegue nada roto a `main` (y por tanto a producción), protege la rama en GitHub. Hazlo en **cada repo** (la base y cada clon), porque "Use this template" copia los archivos pero no la configuración de GitHub. La regla está versionada en [`.github/rulesets/main.json`](.github/rulesets/main.json): **Settings → Rules → Rulesets → New ruleset → Import a ruleset**. Exige PR, bloquea force push y borrado, pide la rama al día y los checks **`Lint y tests unitarios`** y **`CI completo`**.

Exige solo esos dos checks: los de build + E2E cambian de nombre según la matriz, y `CI completo` ya los cubre.

En un clon de cliente, deja en la matriz `site` del workflow solo el sitio del cliente; la regla de protección no cambia.

## Estructura

```text
src/
  app/
    layout.tsx               Layout raíz: <html>, fuente, tema y metadatos SEO
    (site)/                  Sitio público (grupo de rutas)
      layout.tsx             Header (con botón sol/luna), footer y botón de WhatsApp
      page.tsx               Home: hero + secciones activas
      trabajos/page.tsx      Listado de trabajos realizados
      trabajos/[slug]/       Detalle de un trabajo: galería, reseñas y skeleton de carga
    not-found.tsx
    robots.ts, sitemap.ts
  components/
    layout/                  Header, Footer, MobileMenu, Container, HashlessSectionLinks
    sections/                Hero, About, Services, Projects, Reviews, Contact
    ui/                      ButtonLink, Media, ImageCarousel, ImageGallery, ThemeToggle,
                             Breadcrumbs, Rating, SocialLinks, iconos…
  lib/
    data.ts                  Capa de acceso a datos (getServices, getProjects…)
    site.ts                  Configuración del negocio activo
    contact.ts               Enlaces wa.me, tel: y mailto:
    navigation.ts            Menú derivado de las secciones activas
    theme.ts                 Colores → variables CSS y script del modo oscuro
    images.ts                Aplica las vistas previas generadas al contenido
    swipe.ts, useSwipeTrack  Gesto de deslizar del carrusel y la galería
  sites/
    index.ts                 Registro de negocios y selección por SITE_ID
    construction/            config.ts + content.ts (demo con modo claro y oscuro)
    barbershop/              config.ts + content.ts (demo con solo tema oscuro)
  types/
    site.ts                  Contrato de configuración (SiteConfig)
    content.ts               Contrato de contenido (Project, Review, Service…)
  generated/
    image-placeholders.json  Vistas previas generadas (se versiona)
scripts/
  generate-image-placeholders.mjs
public/
  images/projects/           Fotos de trabajos, en <año>/<slug>/
  logos/
```

### Reglas de la arquitectura

- **Los componentes no conocen al negocio.** Reciben todo por props. Solo `src/app/` importa la configuración (`@/lib/site`) y los datos (`@/lib/data`).
- **El contenido se lee solo a través de `src/lib/data.ts`.** Hoy esas funciones devuelven lo que está en `src/sites/<negocio>/content.ts`. Cuando un proyecto necesite base de datos o CMS, se reescriben esas funciones (misma firma) y el resto del código no cambia.
- **Los colores se definen una sola vez** en `config.ts` y llegan a Tailwind como clases: `bg-primary`, `text-muted`, `border-border`, `bg-surface`, `text-accent`, etc.
- **Vocabulario genérico en el código, etiquetas en la config.** En el código se habla de `projects`, `services` y `reviews`; lo que ve el usuario sale de `labels` ("Obras realizadas", "Nuestros cortes"…).

## Personalizar un negocio

### 1. Configuración: `src/sites/<negocio>/config.ts`

Nombre, descripción, dominio (`url`), idioma, contacto (teléfono, correo, WhatsApp con mensaje precargado, dirección, mapa, horarios), redes sociales, logo, colores, SEO, **secciones activas** y **etiquetas** de cada sección. El tipo `SiteConfig` marca qué es obligatorio.

### 2. Contenido: `src/sites/<negocio>/content.ts`

Hero, quiénes somos, servicios, trabajos realizados (con galería) y reseñas. Una reseña se asocia a un trabajo con `projectSlug` y aparece en su página de detalle.

### 3. Imágenes

Copia las fotos a `public/images/...` (formato `.webp` o `.jpg`) y referéncialas en el contenido:

```ts
cover: { src: "/images/projects/2026/remodelacion-cocina-nunoa/cocina.webp", alt: "Cocina remodelada con isla central" },
```

Las fotos de cada trabajo van en `/images/projects/<año>/<slug>/` (lo verifica `sites.test.ts`). En `hero.images`, una imagen se muestra fija y varias como carrusel; la galería de cada trabajo se desliza con el dedo o arrastrando.

Mientras cargan, las fotos locales muestran una vista previa difuminada: `npm run images:placeholders` (corre solo antes de `dev` y `build`, con `sharp`) la genera en `src/generated/image-placeholders.json`, que se versiona. Las imágenes remotas no la tienen. Si no hay foto, se muestra un marcador con los colores del tema. En modo oscuro las fotos se atenúan levemente.

**Logo:** va en `public/logos/`, con fondo transparente, y se configura en `branding.logo`. Si en modo oscuro no se ve bien, agrega una versión en `branding.logoDark`. Reemplaza también `src/app/favicon.ico`.

**Colores y modo oscuro:** `theme` es la paleta clara y `themeDark` (opcional) la oscura. Si `themeDark` existe, el sitio sigue la preferencia del sistema y muestra un botón sol/luna en el header; la elección se guarda en el navegador. Un negocio con una sola paleta (la barbería de ejemplo, oscura) no muestra el botón. `accentText` es el acento usado como texto: debe tener contraste de 4,5:1 sobre `background` y `surface`, igual que cada par texto/fondo en ambas paletas.

**Textos de botones:** `actions` (opcional) adapta "Cotiza tu proyecto", "Ver todas las obras", "Ver obra" al rubro; sin valor se usa un texto genérico.

### 4. Dejar un solo negocio en el clon

En el repositorio del cliente:

1. Borra las carpetas de `src/sites/` que no correspondan.
2. En `src/sites/index.ts`, deja registrado solo ese negocio y ajusta `DEFAULT_SITE`.
3. En `.github/workflows/ci.yml`, deja solo ese sitio en la matriz `site`.
4. Importa en GitHub la protección de `main` desde `.github/rulesets/main.json` (ver Integración continua).
5. Regenera el grafo de graphify con `graphify update .`, porque el que trae el clon describe la base. Si el clon no usará graphify, borra `graphify-out/` y la sección `## graphify` de `CLAUDE.md`.

### 5. graphify (opcional)

El repositorio incluye un grafo del código en `graphify-out/` y la skill en `.claude/skills/graphify/`, que Claude Code usa para orientarse en el proyecto. Para usarlo, instala la CLI una vez por máquina:

```bash
uv tool install graphifyy   # o: pipx install graphifyy
graphify hook install       # hook post-commit que actualiza el grafo después de cada commit
```

El hook de git no se copia con el repositorio: instálalo en cada clon. Los hooks de Claude Code (`.claude/settings.json`) no hacen nada si graphify no está instalado.

## Cómo crecer en un proyecto (fuera de la base)

| Necesidad | Dónde |
| --- | --- |
| Login / panel privado | Nuevo grupo de rutas `src/app/(dashboard)/` con su propio layout, más `src/app/(auth)/login`. |
| Base de datos o CMS | Reescribir las funciones de `src/lib/data.ts`. |
| Nueva sección (ej: precios, FAQ) | Componente en `components/sections/`, tipo en `types/content.ts` y nueva clave en `sections`/`labels`. |
| Catálogo / e-commerce | Ruta `src/app/(site)/productos/` siguiendo el patrón de `trabajos/`. |
| Formulario de contacto | Server Action + servicio de correo (documentar variables en `.env.example`). |

## Despliegue en Vercel

1. Importa el repositorio en Vercel (detecta Next.js automáticamente).
2. Si el repositorio aún tiene varios negocios, define la variable `SITE_ID`.
3. Asigna el dominio y actualiza `url` en la configuración del negocio.

Vercel publica cada push a `main` en producción y cada PR como vista previa.

> Nota: con Cache Components, una URL de trabajo inexistente (`/trabajos/no-existe`) muestra la página 404 con `noindex`, pero responde HTTP 200 porque la página se transmite por streaming. Es el comportamiento esperado de Next.js 16.

## Licencia

Define la licencia del repositorio antes de distribuir o reutilizar públicamente el código.
