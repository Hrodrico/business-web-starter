# Graph Report - business-web-starter  (2026-11-05)

## Corpus Check
- Corpus is ~11,660 words - fits in a single context window. You may not need a graph.

## Summary
- 352 nodes · 679 edges · 19 communities (12 shown, 7 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 28 edges (avg confidence: 0.85)
- Token cost: 61,275 input · 0 output

## Community Hubs (Navigation)
- Páginas y metadatos SEO
- Config de build y dependencias dev
- Workflow de CI
- Layout del sitio y secciones
- Arquitectura y reglas (docs)
- Contenido de negocios y proyectos
- Layout raíz, navegación y tema
- Runtime Next/React y header
- Config de TypeScript
- Tests E2E Playwright
- Scripts npm
- Reseñas y rating
- Tema, tipos y validación de contenido
- Reglas de graphify
- Fuente única de datos
- Convenciones de código
- Tipos globales de rutas
- Registro de negocios

## God Nodes (most connected - your core abstractions)
1. `Container()` - 19 edges
2. `next` - 16 edges
3. `ContactSection()` - 16 edges
4. `compilerOptions` - 16 edges
5. `vitest` - 15 edges
6. `ButtonLink()` - 13 edges
7. `HomePage()` - 12 edges
8. `SectionHeading()` - 11 edges
9. `Media()` - 10 edges
10. `getProjects()` - 10 edges

## Surprising Connections (you probably didn't know these)
- `graphify skill (project)` --conceptually_related_to--> `graphify usage rules (query before grep, update after edits)`  [INFERRED]
  .claude/CLAUDE.md → CLAUDE.md
- `How to grow a project (outside base)` --semantically_similar_to--> `Scaling a clone (demos removal, sections, pages, login, DB/CMS, forms, e-commerce, remote images)`  [INFERRED] [semantically similar]
  README.md → CLAUDE.md
- `Use this template workflow (clones don't sync)` --semantically_similar_to--> `Base vs client clone contexts`  [INFERRED] [semantically similar]
  README.md → CLAUDE.md
- `Tests (README)` --semantically_similar_to--> `Colocated unit tests (Vitest + Testing Library)`  [INFERRED] [semantically similar]
  README.md → CLAUDE.md
- `Continuous integration and ruleset setup` --semantically_similar_to--> `CI workflow (.github/workflows/ci.yml)`  [INFERRED] [semantically similar]
  README.md → CLAUDE.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Six non-breakable architecture rules** — claude_rule_agnostic_components, claude_rule_data_layer, claude_rule_single_source, claude_rule_generic_vocabulary, claude_rule_color_tokens, claude_rule_types_first [EXTRACTED 1.00]
- **Testing and CI quality gate** — claude_unit_tests_colocated, claude_e2e_playwright, claude_sites_test, claude_ci_workflow, claude_main_branch_protection, claude_verification_workflow [INFERRED 0.85]
- **Next.js 16 project particularities** — claude_cache_components, claude_generate_static_params, claude_global_route_types, claude_per_user_data, claude_server_components_default, claude_proxy_ts [INFERRED 0.85]

## Communities (19 total, 7 thin omitted)

### Community 0 - "Páginas y metadatos SEO"
Cohesion: 0.10
Nodes (35): HomePage(), metadata, metadata, ProjectsPage(), generateMetadata(), generateStaticParams(), ProjectPage(), sitemap() (+27 more)

### Community 1 - "Config de build y dependencias dev"
Cohesion: 0.07
Nodes (39): eslintConfig, nextConfig, devDependencies, eslint@^10.13.0, eslint-config-next@16.4.3, jsdom@^30.1.3, @playwright/test@^1.64.1, tailwindcss@^4 (+31 more)

### Community 2 - "Workflow de CI"
Cohesion: 0.05
Nodes (44): if, name, needs, runs-on, steps, timeout-minutes, concurrency, cancel-in-progress (+36 more)

### Community 3 - "Layout del sitio y secciones"
Cohesion: 0.11
Nodes (26): getCurrentYear(), SiteLayout(), Footer(), Props, Header(), ContactSection(), Item(), Props (+18 more)

### Community 4 - "Arquitectura y reglas (docs)"
Cohesion: 0.06
Nodes (24): generate-agent-files.js (next dev re-adds block), node_modules/next/dist/docs (local Next.js docs), Active business flow (sites/index.ts -> lib/site.ts, lib/data.ts), Project architecture (app/components/lib/sites/types), business-web-starter (template base), Cache Components (use cache, cacheLife, connection), CI workflow (.github/workflows/ci.yml), E2E tests (Playwright, e2e/, Pixel 7 + desktop) (+16 more)

### Community 5 - "Contenido de negocios y proyectos"
Cohesion: 0.11
Nodes (16): ProjectCard(), Props, project, Media(), Props, content, content, Site (+8 more)

### Community 6 - "Layout raíz, navegación y tema"
Cohesion: 0.12
Nodes (15): geistSans, metadata, RootLayout(), buildNavigation(), sectionIds, labels, theme, themeToCssVars() (+7 more)

### Community 7 - "Runtime Next/React y header"
Cohesion: 0.13
Nodes (19): dependencies, next@16.4.3, react@19.3.0, react-dom@19.3.0, next, react, react-dom, NotFound() (+11 more)

### Community 8 - "Config de TypeScript"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 10 - "Scripts npm"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, start, test, test:e2e, test:watch

### Community 11 - "Reseñas y rating"
Cohesion: 0.38
Nodes (4): Props, Props, Rating(), Review

### Community 12 - "Tema, tipos y validación de contenido"
Cohesion: 0.33
Nodes (4): src/sites/sites.test.ts content validation, Theme flow (config.theme -> themeToCssVars -> --brand-* -> globals.css @theme inline), Colocated unit tests (Vitest + Testing Library), Tests (README)

## Knowledge Gaps
- **17 isolated node(s):** `{ config, content }`, `graphify skill (project)`, `generate-agent-files.js (next dev re-adds block)`, `Node 24 LTS requirement (engines.node, .nvmrc, .npmrc engine-strict)`, `Mandatory verification: lint + test + build (+ e2e)` (+12 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 131 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `Runtime Next/React y header` to `Páginas y metadatos SEO`, `Config de build y dependencias dev`, `Layout del sitio y secciones`, `Contenido de negocios y proyectos`, `Layout raíz, navegación y tema`?**
  _High betweenness centrality (0.090) - this node is a cross-community bridge._
- **What connects `{ config, content }`, `graphify skill (project)`, `generate-agent-files.js (next dev re-adds block)` to the rest of the system?**
  _17 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Páginas y metadatos SEO` be split into smaller, more focused modules?**
  _Cohesion score 0.09869375907111756 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `Config de build y dependencias dev` to `Páginas y metadatos SEO`, `Layout del sitio y secciones`, `Contenido de negocios y proyectos`, `Layout raíz, navegación y tema`, `Runtime Next/React y header`, `Reseñas y rating`?**
  _High betweenness centrality (0.057) - this node is a cross-community bridge._
- **Should `Config de build y dependencias dev` be split into smaller, more focused modules?**
  _Cohesion score 0.06565656565656566 - nodes in this community are weakly interconnected._
- **Why does `react` connect `Runtime Next/React y header` to `Páginas y metadatos SEO`, `Config de build y dependencias dev`, `Layout del sitio y secciones`, `Layout raíz, navegación y tema`?**
  _High betweenness centrality (0.045) - this node is a cross-community bridge._
- **Should `Workflow de CI` be split into smaller, more focused modules?**
  _Cohesion score 0.049494949494949494 - nodes in this community are weakly interconnected._