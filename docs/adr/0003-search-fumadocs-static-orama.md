# ADR-0003: Built-in static search (Fumadocs + Orama)

- **Status:** Accepted
- **Date:** 2026-11-15

## Context

Full-text search across all content is an MVP requirement (§4.1): find any topic in under 10 seconds,
offline, with a static build (ADR-0001). The Fumadocs static export guide states that its default
search uses a route handler, which static export does not support. It offers a static mode instead: the
search index is generated at build time and searched in the browser. The same guide warns that large
sites pay for an expensive index download.

## Decision

The app uses Fumadocs' built-in Orama search in static mode: `staticGET` from `createFromSource(source)`
in `app/api/search/route.ts`, and `useStaticSearch` on the client. Implementation is in phase A1.

## Alternatives considered

### Pagefind (1.6.0 on npm)

- A static search library that indexes the built HTML.
- Not chosen now: it is a separate tool and build step to integrate with the Fumadocs search dialog,
  while the built-in option needs neither. Not evaluated hands-on; it stays the fallback.

### Hosted search (Orama Cloud, Algolia)

- Search as a third-party service.
- Not chosen: it needs network access and an external account, against "works offline" and "no paid
  services" (§4.4).

## Consequences

**Positive**

- No extra dependency or build step; it works with the existing content source.
- Works offline once the index is loaded.

**Negative**

- The whole index downloads to the browser. Its size at about 150 pages has **not been measured**.

**Follow-ups**

- A1: measure index size and search speed with the pilot content, then with a synthetic 150-page set.
  If it is too large or slow, switch to Pagefind in a new ADR that supersedes this one.

## References

- https://fumadocs.dev/docs/deploying/static, https://fumadocs.dev/docs/headless/search/orama
  (read 2026-11-15)
