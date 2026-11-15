---
name: ingest-learnings
description: Fold project learnings from ../learning-inbox/ into the Handbook. Verifies each note's claims, maps it to a CURRICULUM.md topic, adds a draft "Applied in practice" entry (or a stub page), logs it, then moves the note to processed/. Shows every change for approval before applying it.
argument-hint: '[optional: one note filename]'
disable-model-invocation: true
---

# Ingest learnings

Implements LEARNING_APP_PLAN.md §12.1 (Flow A, step 2). Projects produce raw experience; the Handbook
holds verified knowledge. A note enters a page only through this quality gate, never by direct paste.

Rules that apply throughout: [docs/STYLE_GUIDE.md](../../../docs/STYLE_GUIDE.md) §1 (accuracy) and §2
(sources). In short: no invented facts, numbers, links or quotes; every link is fetched before it is used;
anything not verified is labeled **unverified** and logged.

## 0. Inputs

- Inbox: `../learning-inbox/*.md`, top level only. **Never** read or touch `../learning-inbox/processed/`.
- If an argument names one file, process only that file. Otherwise process every note, oldest first
  (the filenames start with `YYYY-MM-DD`).
- If the inbox is empty, say so and stop.
- If `../learning-inbox/` cannot be read, stop and tell the user to grant access (see "Access" below).

## 1. Read and check each note

Expected fields (§12.1): `project`, `type` (concept | decision | bug | incident | trade-off |
measurement | doubt), `what happened`, `what I learned`, `alternatives`, `related topic`, `evidence`,
`confidence`. Report any missing fields, but keep going when the meaning is still clear.

**Confidentiality gate (before anything else).** Look for secrets (API keys, tokens, passwords,
connection strings, private keys), personal data (emails, phone numbers, customer names), and proprietary
details (employer or client names, internal system/service names, hostnames, schemas, code from a work
repo). If any are found:

- Never copy them anywhere: not into pages, the log, the summary or a commit.
- In the summary, say _that_ something sensitive was found and where (field name only), not what it is.
- Propose a generalized wording ("an internal payments service" → "a payment service"). If the note
  cannot be generalized safely, mark it `skipped: confidentiality` and leave it in the inbox for the user.

## 2. Map the note to a topic

The Handbook takes any **system design or backend engineering** learning, not only topics already in
the curriculum. A system-design note is never dropped for being off-syllabus; it always gets a home.

**Out of scope:** data structures and algorithms (LeetCode-style practice, plan §4.4) and anything that
is not system design or backend engineering. For those, add no page and no curriculum line. Log the note
as `skipped: out of scope`, leave it in the inbox, and tell the user in the summary.

1. Use `related topic` as a hint, then search [docs/CURRICULUM.md](../../../docs/CURRICULUM.md) for the
   best-matching item, and `content/` for an existing page on it.
2. Outcomes:
   - **Page exists** → plan an "Applied in practice" entry on that page (step 4a).
   - **Curriculum item exists, no page yet** → plan a stub page (step 4b).
   - **No curriculum item fits, but a track does (T00-T21)** → propose a new line in that track: the exact
     text, a `[C]`/`[E]` tag, `_(added YYYY-MM-DD from a field note)_` and a one-line reason. Then plan a
     stub page for it (step 4b).
   - **No track fits** → propose a new line under **T22 Open learnings** in CURRICULUM.md, tagged `[E]`,
     with a stub page in `content/open/`. Use this for system design or backend topics that no track
     covers (for example build tooling or dev environments for backend services). If several T22 items
     start to share a theme, propose promoting them to a new track of their own.
3. Curriculum additions are part of the summary in step 5, so the user approves them with the rest
   (§12.1, "Vijay approves"). Nothing is written before that.
4. Never force a weak match. If two topics fit equally, list both and ask.

## 3. Verify the claims

Split the note into separate technical claims. For each one:

- Check it against a primary source: official docs, the package registry (`npm view <pkg>@<ver> ...`), a
  changelog or the spec. Fetch every URL you cite; record `verifiedOn: <today>`.
- Classify it as `verified` (with source), `personal observation` (true for the author's machine and
  setup only, such as measurements and logs; state the machine and method, never generalize it), or
  `unverified`.
- Label certainty as in the style guide: Fact / Common practice / Opinion/trade-off.
- `unverified` claims never appear on a page as facts. They go into `docs/needs-verification.md` and the
  log, or appear on the page explicitly marked _unverified_.
- The note's own `confidence: unverified` stays in the log until its claims are checked; it is not
  evidence of anything.

## 4. Draft the change

### 4a. Entry on an existing page

Put it under the template section "Where this shows up in real projects, and field notes" (section 13 in
STYLE_GUIDE §4). Create the `## Where this shows up in real projects, and field notes` heading in the
right position if the page doesn't have it. Use this shape, written in our own words:

```mdx
### Applied in practice: <short title> (draft)

_Personal experience from **<project>**, <YYYY-MM-DD>. A field note, not sourced fact._

- **What happened:** <generalized, one or two sentences>
- **Lesson:** <the generalizable lesson>
- **Checked:** <claim> ([source](url), verified <date>)
- **Unverified:** <claim>, logged in needs-verification
```

Also add the project's kebab-case slug to the page's `appliedIn` frontmatter if it is missing.

### 4b. Stub page (curriculum item exists, no page yet)

Create `content/<track>/<page-slug>.mdx` and add `<page-slug>` to `content/<track>/meta.json` `pages`.
If the track folder is new, create its `meta.json` and add the track to `content/meta.json`. The
frontmatter must pass `lib/content-schema.ts`:

```yaml
title: '<curriculum item title>'
description: 'Stub: full page not written yet. Holds field notes until then.'
track: <track>
order: <next free number in the track>
levelsCovered: [fundamentals]
readingTimeMin: 1
priority: <core | extended, from the [C]/[E] tag>
status: draft
lastVerified: <today>
reviewAfter: <today + 6 months>
appliedIn: [<project-slug>]
```

Body: one line saying this is a stub that the full 17-section page (written via the write-topic workflow)
will replace, then the section 13 heading with the 4a entry under it.

### 4c. Log

Append a row to `docs/field-notes-log.md` (create it with this header if missing):

```md
| Date ingested | Note file | Project | Type | Page (slug) | Outcome | Unverified items |
| ------------- | --------- | ------- | ---- | ----------- | ------- | ---------------- |
```

Outcome is one of: `entry added` · `stub created` · `curriculum addition proposed` ·
`skipped: confidentiality` · `skipped: duplicate` · `skipped: out of scope`.

## 5. Show the summary and wait for approval

Before writing **anything**, show the user one block per note:

```text
Note:          <filename>  (project, type)
Confidential:  none found | found in <field>; proposed generalization: ...
Maps to:       <CURRICULUM item>  ->  <existing page slug | new stub path | proposed addition>
Claims:        [verified] ... (source)  /  [personal] ...  /  [unverified] ...
Changes:       1. <file>: <what is added/changed>
               2. ...
Then:          move <filename> -> ../learning-inbox/processed/
```

Then **stop and ask**. Apply only what the user approves, per note. Approval for one note does not cover
the next. If the user rejects a change, leave that note in the inbox.

## 6. Apply (approved notes only)

1. Make the edits exactly as shown in the summary.
2. Run `pnpm check`. If it fails, fix it or revert, and report. Do not move the note while the check is red.
3. Move the note: `mv ../learning-inbox/<file> ../learning-inbox/processed/<file>`. If that name already
   exists, append `-2`, `-3` and so on. Never delete or edit inbox notes.
4. Report what changed (file list) and any open needs-verification items. Do not commit unless the user asks.

## Access

The session needs read/write access to `../learning-inbox/`. It is granted by
`permissions.additionalDirectories` in `.claude/settings.local.json` (this machine's path, not committed),
or for one session with `claude --add-dir ../learning-inbox` / `/add-dir ../learning-inbox`.
