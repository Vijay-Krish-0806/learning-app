# ADR-0002: Fumadocs as the docs shell

- **Status:** Proposed
- **Date:** 2026-11-15

## Context

ADR-0001 chose Next.js + MDX. The app still needs a docs shell: sidebar tree, breadcrumbs, previous/next,
table of contents, MDX pipeline, search and theming. The plan's criteria (§5): MDX custom components,
sidebar/ToC, search, static export, maintenance health and effort, preferring less custom code.

Facts checked on the npm registry on 2026-11-15:

- `fumadocs-core` / `fumadocs-ui` had releases through 2026-11-14 (16.19.3); `fumadocs-mdx` through 15.6.2.
- `nextra` / `nextra-theme-docs` latest is 4.6.1, published 2025-12-04 (no release for about 11 months).

## Decision

The app uses Fumadocs (`fumadocs-core` + `fumadocs-ui` 16.19.0, `fumadocs-mdx` 15.6.0, pinned exactly)
with the `fumadocs-mdx/macro` content API, reading from `content/` and serving pages under `/docs`.
Frontmatter is validated by a zod schema extending Fumadocs' `pageSchema` (`lib/content-schema.ts`).

## Alternatives considered

### Nextra 4

- The Guild's docs framework for the Next.js App Router.
- Not chosen: no release in about 11 months at decision time, against an active Fumadocs release
  cadence. Feature fit was not evaluated hands-on.

### Custom Next.js + MDX

- `@next/mdx` or a hand-rolled MDX loader with self-built sidebar, ToC and search.
- Not chosen: sidebar, ToC, breadcrumbs, prev/next and search would all be written and maintained by
  hand, against the plan's "prefer less custom code" criterion.

## Consequences

**Positive**

- Sidebar, ToC, breadcrumbs and prev/next come from `DocsLayout`/`DocsPage` with no custom code.
- Frontmatter is validated at build time: a page with an invalid field fails `pnpm build`
  (verified: `priority: maybe` failed with "Invalid option: expected one of core|extended").
- Fumadocs documents static export, static search and a Mermaid component.

**Negative**

- The project follows Fumadocs conventions: a `meta.json` per folder sets sidebar order and titles,
  replacing the plan's `_track.json`.
- Fumadocs releases very often, so upgrades need care. Versions are pinned exactly, and only versions
  that pass pnpm's minimum-release-age check are used (16.19.3 was too new on 2026-11-15).
- UI customization beyond the provided slots means learning Fumadocs internals.

**Follow-ups**

- Folder names are track slugs without number prefixes (`content/caching/`); `meta.json` sets the
  order. The page slug is derived from the file path, so it is not repeated in frontmatter.
- A1 adds a `/docs` landing page; A0 has none.

## References

- https://fumadocs.dev/docs/manual-installation, https://fumadocs.dev/docs/mdx/collections,
  https://fumadocs.dev/docs/next/page-conventions (read 2026-11-15)
- Installed package type definitions: `fumadocs-mdx/dist/macro/index.d.ts` (15.6.0)
