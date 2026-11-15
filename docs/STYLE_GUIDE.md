# Style guide

Writing rules for every page in `content/`, distilled from LEARNING_APP_PLAN.md §3 and §7.
A learner cannot spot a made-up fact, so the writer must never produce one.

## 1. Accuracy (non-negotiable)

- [ ] **Research first, then write.** Every non-obvious technical claim traces to a source listed on the page.
- [ ] **Versions:** for version-specific facts, check the current official docs and state the version and the date checked.
- [ ] **Numbers:** every latency, throughput, benchmark or "company X does N/sec" is cited, or labeled `illustrative`.
- [ ] **Provenance:** never write "asked at Google/Amazon/...". Tag questions by `pattern` and `level` instead.
- [ ] **Links:** only after fetching the URL and confirming it says what we claim. Record `verifiedOn: YYYY-MM-DD`.
- [ ] **Quotes:** paraphrase. At most one quote under 15 words per source, in quotation marks, attributed.
- [ ] **Label certainty:** `Fact` (documented) · `Common practice` · `Opinion/trade-off` · `Company-specific`.
- [ ] **Unverified:** say so on the page and add it to `docs/needs-verification.md`. Never include it silently.
- [ ] **Code:** executed or type-checked. Otherwise label it `pseudo-code`.
- [ ] **Diagrams:** show the real mechanism (what happens, in what order, where it fails), not decorative boxes.
- [ ] **Freshness:** set `lastVerified` and `reviewAfter`: 6 months for fast-moving topics (library versions, cloud services), up to 12 months otherwise.

## 2. Copyright and further reading

- Never copy or closely mirror an article. Summarize in our own words and link out.
- 3-8 further-reading items per topic. Each item has: title, author/org, URL, type (official docs / paper /
  engineering blog / book chapter), **why read it**, 2-4 takeaways in our own words, what to skip, and `verifiedOn`.
- Prefer official docs, papers and known engineering blogs. Medium only from credible authors; mark it if paywalled.
- If a source is old, say what has changed since.

## 3. Teaching

- **Plain English first, precise terms second.** Define every jargon term the first time it appears.
- Every topic answers: _What problem does this solve? What breaks without it? What are the alternatives? When should I NOT use it?_
- Concrete examples with small numbers come before abstractions.
- Every topic has common misconceptions, common mistakes, failure modes and "what would you do if..." scenarios.
- Active recall is built in: Q&A with hidden answers, flashcards, a quiz.
- Projects stay out of the way: at most one small "Where this shows up in real projects" box (pointers only).
- Personal field notes are labeled as personal experience, never as sourced fact.

## 4. Page template (sections in this order)

1. TL;DR (5 lines max)
2. Why this exists
3. Mental model (analogy + one real mechanism diagram)
4. Fundamentals `[Level: fundamentals]`
5. How it works `[Level: intermediate]`
6. Trade-offs and alternatives (table: when to use / when NOT to)
7. Production-grade guidance `[Level: production]`
8. Failure modes and "what would you do if..." (2-5: symptom → diagnose → mitigate → prevent)
9. Staff-level thinking `[Level: staff]`
10. Interview Q&A (basic / intermediate / senior; answers hidden; tagged by pattern)
11. Common misconceptions and mistakes
12. Optional 15-minute experiment
13. Where this shows up in real projects, and field notes (optional)
14. Cheat sheet (fits on one screen)
15. Flashcards (5-15) and quiz (5-10, with explanations)
16. Further reading
17. Sources used for this page + `lastVerified`

A section that does not apply is kept and marked "Not applicable: reason". Target 1,200-2,500 words;
split the page above about 2,500.

## 5. Frontmatter

Validated by `lib/content-schema.ts`; the build fails if it is invalid. The slug comes from the file path
(`content/<track>/<page>.mdx` → `<track>/<page>`), so it is not written in frontmatter.

```yaml
title: 'Cache-aside and cache stampede'
description: 'One sentence shown under the title.'
track: caching
order: 2
levelsCovered: [fundamentals, intermediate, production, staff]
prerequisites: [caching/why-cache]
readingTimeMin: 25
tags: [caching, redis]
interviewPatterns: [cache-invalidation, thundering-herd]
appliedIn: [notifyx-m5]
priority: core # core | extended
status: draft # draft | reviewed
lastVerified: 2026-11-20
reviewAfter: 2027-05-20
sources: [redis-docs-eviction]
```

## 6. Flashcards and quizzes

- Flashcard: one atomic idea, question on the front, a short answer on the back, tagged with topic + level.
- Quiz: exactly one correct option, plausible distractors, and an explanation of why each distractor is wrong.
- Re-verify every answer against the page's sources before marking the page `reviewed`.
