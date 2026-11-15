# ADR-0004: User state in localStorage with a versioned schema

- **Status:** Proposed
- **Date:** 2026-11-15

## Context

The app tracks per-page progress, flashcard schedules, quiz history, notes and bookmarks (§4.1-4.2).
§4.4 rules out a backend, database and accounts. Browser storage belongs to one browser and one site,
and the user or the browser can clear it, so the data must be recoverable. The data's shape will change
as features are added in A1-A2, and existing saved data must survive those changes.

## Decision

All user state is stored in `localStorage` under one namespaced key, as a single JSON document with a
`schemaVersion` number. A pure, unit-tested migration function upgrades older versions on load. Every
read and write is wrapped in error handling, and the app still works (with empty state) when storage is
unavailable. JSON export/import of the whole document is provided (A2).

## Alternatives considered

### IndexedDB

- The browser's structured database for larger data.
- Not chosen: the data is small and simple, and the async API adds complexity with no benefit at this
  size. Revisit if the data outgrows `localStorage`.

### A backend or sync service

- Store state on a server for cross-device sync.
- Not chosen: explicitly a non-goal (§4.4); adding it needs its own ADR.

## Consequences

**Positive**

- No infrastructure; state survives reloads in the same browser.
- Versioning plus migrations let the schema evolve without losing progress.

**Negative**

- No cross-device sync; moving to another device needs a manual export/import.
- Clearing site data loses everything that was not exported.

**Follow-ups**

- A1: implement the store with `schemaVersion: 1` and migration tests.
- A2: export/import, with a reminder to export regularly.

## References

- LEARNING_APP_PLAN.md §4.1, §4.2, §4.4, §5 (User state)
