# Systems Handbook: Learning App Build Plan (for Claude Code)

> Put this file at the root of a **new, separate repo** (suggested name: `systems-handbook`). It is NOT part of the NotifyX repo.
> Owner: Vijay (full-stack: Next.js, NestJS, MongoDB; 2 YOE; targeting product-based companies).
> **Main motto: learning.** This app is Vijay's single, ultimate source of learning for ALL system design and backend engineering topics (not tied to any one project): fundamentals to production-grade thinking, design patterns, and interview scenarios, built for revision.
> **Goal timeline: 4-6 months** of upskilling at ~1-2 hours/day. Everything Vijay learns lives in this one app.

---

## 0. How to use this document

**For Vijay:** build the app once (Phase A, Section 13), then Claude Code writes the content in waves (Section 14), one topic at a time. You read, ask doubts, do the recall exercises, and revise from the app. Do not mix this with project coding sessions (for example NotifyX). Learn here; building a project alongside is optional.

**For Claude Code:** this is the source of truth for scope, quality rules, content format and order of work. Read Sections 1-7 before any change. Read the current phase/wave before starting. If anything here conflicts with what you find in the repo, stop and tell the user instead of guessing.

---

## 1. Purpose and success criteria

Mixing "learn the concept" with "get the code working" in the same session was confusing. So learning and building are separated:

| Track | Where | Goal |
|---|---|---|
| **Learn** | This repo (Systems Handbook) | Understand concepts deeply; revise; prepare for interviews. **Independent of any project.** |
| **Build (optional)** | Any project repo, e.g. NotifyX | Apply concepts in a real project whenever Vijay wants |

The Handbook must never depend on a specific project. Projects are examples that point back into it, not the other way round.

The Handbook is **successful** if Vijay can:
1. Open it and find any topic in under 10 seconds (navigation + search).
2. Learn a topic from zero to production-grade depth **without needing any other resource** (though good further reading is provided).
3. Revise a topic in 10-15 minutes using the cheat sheet, flashcards and quiz.
4. Practice interview scenarios ("what will you do if X happens?") and case studies, and compare his answer with a model answer.
5. Trust the content: it is accurate, sourced, current, and honest about uncertainty.
6. Finish the **Core** curriculum (Section 8.2) in 4-6 months by following the study plan (Section 11.1), and see at any time whether he is ahead or behind.
7. Optionally pair any topic with a hands-on project (NotifyX is the first example; Section 12).

---

## 2. Decision: what format should the app be?

**Recommendation: a standalone Next.js static site with content written as MDX files in git.**

| Option | Verdict | Why |
|---|---|---|
| Claude artifact (single HTML/React file) | Not recommended as the main home | One file; a 150-page knowledge base is hard to author, search, version and grow. Fine for one-off visuals. |
| Plain HTML/CSS/JS | Not recommended | We would rebuild navigation, search, MDX, diagrams, progress. No benefit. |
| Notion / Obsidian | Good for notes, but weak here | No custom revision tools (spaced repetition, scenario drills, progress map); less control over quality gates. |
| **Next.js + MDX (static export)** | **Recommended** | Vijay already knows Next.js (so he can read and tweak the app); content is plain files in git (portable, diff-able, reviewable); custom components for quizzes/flashcards/scenarios; free static hosting or just run locally; no backend needed. |

Content stays as plain-text files so it is never locked into the app. Write an ADR for the final choice of docs framework (see Section 5).

---

## 3. Content quality rules (the most important section)

The notes must be **high quality, accurate and honest**. A learner cannot detect a hallucinated fact, so the writer must not produce one.

### 3.1 Anti-hallucination rules
1. **Source-grounded.** Every non-obvious technical claim must be traceable to a source listed on that page (official docs, paper, reputable engineering blog, standard book). Research first (web search/fetch), then write.
2. **Verify versions.** For version-specific facts (Kafka, PostgreSQL, Redis, MongoDB, Node.js, NestJS, Next.js, etc.) check the current official docs and state the version and date verified.
3. **No invented numbers.** Latency tables, throughput numbers, benchmark results and "company X handles N requests/sec" must cite a source, or be clearly labeled `illustrative`.
4. **No invented provenance.** Never write "asked at Google/Amazon/..." unless a verifiable public source says so. Tag questions by **pattern** and **level** instead (e.g. `pattern: idempotency`, `level: senior`).
5. **No invented links.** Only include a URL after fetching it and confirming it exists and says what you claim. Record `verifiedOn: YYYY-MM-DD`.
6. **No invented quotes.** Paraphrase in your own words. At most one short quote (under 15 words) per source, in quotation marks, with attribution.
7. **Label certainty.** Distinguish: `Fact` (documented), `Common practice` (widely done, not a standard), `Opinion/trade-off` (reasonable people differ), `Company-specific` (how one company did it).
8. **Say "unverified".** If you cannot verify something, say so in the page and add it to `docs/needs-verification.md`. Never silently include it.
9. **Run the code.** Code examples must be executed or type-checked in the sandbox. Otherwise mark them `pseudo-code`.
10. **Diagrams must show the real mechanism** (what happens, in what order, where it fails), not decorative boxes.
11. **Freshness.** Each page has `lastVerified` and `reviewAfter` (6-12 months). Fast-moving topics (library versions, cloud services) use the shorter interval.

### 3.2 Copyright and article policy
- Do **not** copy or closely mirror articles. Summarize in your own words and link out.
- Each further-reading entry: title, author/org, URL, type (official docs / paper / engineering blog / book chapter), **why read it**, 2-4 takeaways in your own words, what to skip, `verifiedOn`.
- Prefer: official documentation, papers, engineering blogs of known companies, well-known practitioner blogs. Medium articles are allowed only if the author/org is credible and the link is reachable; note if it is paywalled.
- Minimum 3 and maximum ~8 further-reading items per topic (quality over quantity).
- A link checker runs in CI; dead links fail the build.

### 3.3 Teaching quality rules
- **Plain English first, precise terms second.** Define every jargon term at first use.
- Always answer: *What problem does this solve? What breaks without it? What are the alternatives? When should I NOT use it?*
- Build from **fundamentals to production-grade** (levels in Section 7.2). A reader can stop at any level.
- Use concrete examples and small numbers before abstractions.
- Include **common misconceptions** and **common mistakes** on every topic.
- Include **failure modes** and "what would you do if..." scenarios on every topic.
- Active recall is built in: Q&A (answers hidden until clicked), flashcards, quizzes. Notes are not just text to read.
- Keep projects out of the way: each topic may have one small "Where this shows up in real projects" box (pointer only; NotifyX is one example). No project build instructions here.

---

## 4. Product spec

### 4.1 Must have (MVP: Phase A1)
- Topic tree sidebar (track → topic → subtopic), breadcrumbs, previous/next.
- MDX rendering: headings, tables, callouts, code blocks (syntax highlighting + copy button), **Mermaid diagrams**.
- Right-hand table of contents; reading-time estimate.
- **Level selector**: show Fundamentals only / up to Intermediate / Production / Staff-level (Section 7.2).
- **Full-text search** across all content (works offline, static).
- **Progress tracking** per subtopic: `not started → learning → revised → confident`, stored locally. Progress overview page.
- **Learning paths** page: curated orders (e.g. "6-month full curriculum", "4-month compressed (Core only)", "Interview crash course", "Project-aligned path (NotifyX as the first example)").
- **Study plan** page: the week-by-week schedule from Section 11.1 (choose 4, 5 or 6 months), with this week's targets and an ahead/behind indicator computed from progress.
- Q&A blocks with answer hidden until clicked ("interview mode").
- Dark/light theme, responsive, keyboard-friendly, printable.

### 4.2 Should have (Phase A2: revision tools)
- **Flashcards** with spaced repetition (SM-2 style scheduling) and a **"Revise today"** queue.
- **Quizzes** (multiple choice with explanations) with score history.
- **Scenario drill mode:** show a random "what will you do if..." scenario, let the user think (optional timer), then reveal the model approach.
- **Cheat-sheet mode:** every topic's cheat sheet aggregated and printable.
- Personal notes per topic (the user's own words), bookmarks.
- **Export/import progress as JSON** (browser storage is fragile).
- "Doubts" capture: user records a question on a topic; Claude Code answers it and folds the answer back into the notes.

### 4.3 Later (Phase A4)
- PWA/offline use, accessibility audit, performance polish, optional free static hosting (private if possible).
- Concept graph (prerequisite links visualization).

### 4.4 Non-goals
No backend, no database, no accounts/auth, no analytics, no CMS, no AI chat inside the app, no social features, no paid services. Everything is static files plus browser storage. Do not add these without an ADR. Data structures and algorithms (LeetCode-style practice) are out of scope for this app and are tracked separately.

---

## 5. Tech stack (verify current versions; record in `docs/STACK.md`)

| Concern | Choice | Notes |
|---|---|---|
| Framework | Next.js (App Router), TypeScript strict, static export | Vijay knows it |
| Docs shell | Evaluate **Fumadocs**, **Nextra**, or custom Next.js + MDX. Choose via ADR | Criteria: MDX custom components, sidebar/ToC, search, static export, maintenance health, effort. Prefer less custom code unless it blocks the features above |
| Styling | Tailwind CSS (+ shadcn/ui if useful) | Clean, readable typography matters most |
| Content | MDX (or Markdown + MDX components) in `content/` | Frontmatter validated by zod |
| Diagrams | Mermaid (rendered client-side or at build time) | Verify theme support for dark mode |
| Code highlighting | Shiki (or the docs framework's default) | |
| Search | **Pagefind** (static, offline) or the docs framework's search. Decide via ADR | Verify it works with static export |
| User state | `localStorage` with a **versioned schema**, plus JSON export/import | No backend |
| Spaced repetition | Own small SM-2-style module, unit-tested | Pure TypeScript, no dependencies |
| Testing | Vitest (logic: SM-2, progress store, content parsing), Playwright smoke tests (nav, search, quiz, flashcard) | |
| Content tooling | Node scripts: frontmatter/section validator, internal link checker, external link checker, source-freshness report | Section 13, Phase A3 |
| CI | GitHub Actions: typecheck, lint, tests, content validation, build, link check (scheduled weekly for external links) | |
| Hosting | Local first (`pnpm dev`). Optional: free static hosting later | |

Pin versions. Record each significant choice as an ADR in `docs/adr/`.

---

## 6. Repository layout

```text
systems-handbook/
├── app/                      Next.js app (routes, layout)
├── components/               UI + MDX components (Callout, Level, QA, Scenario, Quiz, Flashcards, Sources, CheatSheet)
├── lib/                      content loading, progress store, SM-2, search glue
├── content/
│   ├── 00-cs-fundamentals/
│   ├── 01-foundations/
│   │   ├── _track.json       track title, summary, order
│   │   ├── 01-latency-throughput.mdx
│   │   └── ...
│   ├── 02-api-design/ ...
│   ├── ...
│   ├── 17-case-studies/
│   ├── 18-scenario-bank/
│   ├── 19-interview-playbook/
│   ├── 20-applied-projects/
│   └── 21-ai-llm-systems/
├── scripts/                  validate-content, check-links, freshness-report
├── docs/
│   ├── STYLE_GUIDE.md        writing rules (distilled from Section 3)
│   ├── CURRICULUM.md         the syllabus (Section 8) as the living checklist
│   ├── STACK.md
│   ├── needs-verification.md
│   ├── doubts.md             user's questions + answers (folded into notes)
│   └── adr/
├── CLAUDE.md                 (generated by Claude Code, see Section 15)
└── LEARNING_APP_PLAN.md      this file
```

---

## 7. Content model

### 7.1 Page frontmatter (validated by zod; build fails if invalid)

```yaml
title: "Cache-aside and cache stampede"
slug: caching/cache-aside-stampede
track: caching
order: 2
levelsCovered: [fundamentals, intermediate, production, staff]
prerequisites: [caching/why-cache]
readingTimeMin: 25
tags: [caching, redis, consistency]
interviewPatterns: [cache-invalidation, thundering-herd]
appliedIn: [notifyx-m5]          # optional: projects/milestones where this is applied
priority: core                    # core | extended
status: reviewed                  # draft | reviewed
lastVerified: 2026-11-20
reviewAfter: 2027-05-20
sources: [ ...ids from the Sources block... ]
```

### 7.2 Levels (every subtopic is layered; the reader picks how deep to go)

1. **Fundamentals:** what it is, the problem it solves, a mental model, a tiny example.
2. **Intermediate:** how it works inside; trade-offs; alternatives; common mistakes.
3. **Production:** configuration, failure modes, monitoring, real incidents, numbers (cited), checklists.
4. **Staff-level thinking:** design-for-scale, cost, org/ops concerns, when to break the rules, how to defend decisions in interviews.

Use a `<Level of="production">...</Level>` wrapper (or equivalent) so the level selector can show/hide sections.

### 7.3 Subtopic page template (required sections, in this order)

1. **TL;DR** (5 lines max)
2. **Why this exists** (problem → what breaks without it)
3. **Mental model** (analogy + one real mechanism diagram)
4. **Fundamentals** `[Level: fundamentals]`
5. **How it works** (internals) `[Level: intermediate]`
6. **Trade-offs and alternatives** (comparison table: when to use / when NOT to)
7. **Production-grade guidance** `[Level: production]` (config, pitfalls, monitoring, numbers with citations)
8. **Failure modes and "what would you do if..."** (2-5 mini scenarios: symptom → diagnose → mitigate → prevent)
9. **Staff-level thinking** `[Level: staff]`
10. **Interview Q&A** (graded: basic / intermediate / senior; model answers hidden by default; tagged by pattern)
11. **Common misconceptions and mistakes**
12. **Optional 15-minute experiment** (e.g. a docker command to observe the behavior; clearly optional, not a project)
13. **Where this shows up in real projects, and field notes** (optional: 1-3 lines pointing to projects such as NotifyX, plus personal field notes ingested via Section 12.1, clearly labeled as personal experience, not sourced fact)
14. **Cheat sheet** (revision box, fits on one screen)
15. **Flashcards** (5-15) and **Quiz** (5-10 questions with explanations)
16. **Further reading** (verified, annotated, per Section 3.2)
17. **Sources used for this page** + `lastVerified`

Split a page when it passes ~2,500 words. Target 1,200-2,500 words per subtopic page.

### 7.4 Scenario template (`content/18-scenario-bank/`)

```text
ID + title
Category + level + related topics
Context (the system, scale, constraints)
Symptom (what you observe: metrics, user complaints)
Clarifying questions you should ask first
Approach (step by step: how to triage and diagnose)
Likely root causes (ranked) and how to confirm each
Mitigation: immediate / short-term / long-term
Prevention (design change, monitoring, alerts)
What the interviewer is testing
Follow-up questions
Common wrong answers
Related topics (links)
```

### 7.5 Case study template (`content/17-case-studies/`)

```text
1. Problem + clarifying questions
2. Functional and non-functional requirements
3. Capacity estimation (show the math; mark assumptions)
4. API design
5. Data model + storage choice (with reasoning)
6. High-level design (diagram of the real flow)
7. Deep dives (2-3 hardest parts)
8. Scaling, bottlenecks, hot spots
9. Failure handling and consistency
10. Trade-offs and alternatives considered
11. What to say at 5 min / 15 min / 45 min of a real interview
12. Follow-up questions interviewers ask
13. Related topics
```

### 7.6 Flashcards and quiz format
- Flashcard: one atomic idea per card; question on front, concise answer on back; tag with topic + level.
- Quiz: multiple choice with exactly one correct option, plausible distractors, and an explanation that also explains why each distractor is wrong. Claude Code must re-verify every answer against the page's sources.

---

## 8. Curriculum (the syllabus)

Treat this as the checklist in `docs/CURRICULUM.md`. Claude Code may propose splitting/merging subtopics (with reasons), but must not silently drop topics. Expect roughly **120-180 pages** in total. Build in waves (Section 14); every wave is usable on its own.

### 8.1 Coverage audit (do this before Wave 1)
The goal is that this app contains **all major topics system design requires**. Before writing content, Claude Code must compare the syllabus below against independent references (fetch and cite what it actually used), for example: the table of contents of *Designing Data-Intensive Applications*, the AWS Well-Architected pillars, the topics in the Google SRE books, and several popular system-design interview syllabi and problem lists. Produce `docs/COVERAGE.md`: topic → page that covers it → gaps. Propose additions; **Vijay approves** before they enter the syllabus. Repeat the audit at the end of Wave 4 and again before the final revision sprint.

### 8.2 Core vs Extended
With 4-6 months at ~1-2 h/day, the limit is Vijay's learning time, not page count. Every page is tagged `priority: core | extended`. **Core** is what a strong candidate must know (roughly 100-120 pages, an estimate). **Extended** is extra depth and breadth (roughly 30-60 pages, an estimate). Finish Core first; Extended is the buffer.

| Track | Core | Extended |
|---|---|---|
| T00 CS foundations | All | n/a |
| T01 Foundations | All | n/a |
| T02 API design | REST, pagination, idempotency, versioning, webhooks, REST vs gRPC vs GraphQL, sync vs async | BFF, protobuf details |
| T03 Relational DB | Modeling, indexes, EXPLAIN, transactions/isolation/MVCC, locking, replication, partitioning, sharding | Postgres internals (WAL/vacuum), zero-downtime migration deep dive |
| T04 NoSQL and storage | NoSQL families, MongoDB (incl. sharding), database selection framework, search basics | LSM/Cassandra deep dive, columnar/OLAP |
| T05 Caching and Redis | All | n/a |
| T06 Messaging | Queues vs logs, Kafka, delivery semantics, outbox, DLQ/retries, sagas, CQRS | Schema registry details, event sourcing depth |
| T07 Distributed systems | Replication, quorums, Raft concepts, distributed transactions, locks/fencing, ID generation | Clock theory depth, CRDTs, probabilistic data structures |
| T08 Reliability | Timeouts/retries/backoff/jitter, circuit breaker, bulkhead, rate limiting, deploy strategies, DR basics, scheduling | Hedged requests, chaos engineering |
| T09 Infrastructure | Load balancing, API gateway, scaling, CDN, Docker, cloud building blocks | Kubernetes depth, multi-region, cost |
| T10 Security | All core security and multi-tenancy | GDPR depth |
| T11 Observability | Logs/metrics/traces, SLOs, incident response | Profiling depth |
| T12 Real-time | All | n/a |
| T13 Software design | All | n/a |
| T14 LLD | 6 problems: parking lot, LRU cache, rate limiter, notification service, seat-locking booking, in-memory pub/sub | Remaining problems |
| T15 Node/NestJS/Next.js | Node internals, NestJS DI and lifecycle | Next.js rendering/caching, advanced TypeScript |
| T16 Data processing | n/a | All |
| T17 Case studies | 12: URL shortener, rate limiter, notification system, distributed cache, key-value store, news feed, chat, ticket booking, payments, web crawler, typeahead, file storage | Remaining |
| T18 Scenario bank | All scenarios in Section 9 | Extra cross-topic scenarios |
| T19 Playbook | All | n/a |
| T20 Applied projects | Optional | Optional |
| T21 AI/LLM systems | n/a | All (light) |

### T00. Computer Science Foundations for Backend Engineers
- OS essentials: processes vs threads, context switching, memory (stack/heap, virtual memory), file systems and I/O, blocking vs non-blocking I/O, the event-driven model (epoll-style)
- Concurrency: race conditions, mutex/semaphore, deadlock, atomic operations, memory visibility, async vs parallel, and how this maps to Node.js
- Networking in more depth: sockets, TCP handshake/congestion control/head-of-line blocking, TLS handshake, NAT, latency numbers every engineer should know (cited)
- Data structures behind real systems: hash tables, B-trees, LSM trees, skip lists, tries, heaps, ring buffers, inverted index
- Serialization and compression: JSON, protobuf, Avro, MessagePack; trade-offs

### T01. Foundations of System Design
- How to approach any design problem (framework); functional vs non-functional requirements
- Scalability: vertical vs horizontal; stateless vs stateful services
- Latency, throughput, percentiles (p50/p95/p99), tail latency, Little's Law
- Availability and reliability; SLI/SLO/SLA; the math of "nines"
- Back-of-envelope estimation (QPS, storage, bandwidth, memory) with worked examples
- Consistency models (strong, eventual, causal, read-your-writes); CAP and PACELC (correctly explained)
- Networking essentials: DNS, TCP vs UDP, TLS, HTTP/1.1 vs 2 vs 3, keep-alive, connection reuse, CDN basics

### T02. API Design and Communication
- REST fundamentals; resource modeling; status codes; error format (verify current standard: RFC 9457 vs older RFC 7807)
- Pagination: offset vs keyset/cursor; filtering and sorting; consistency under concurrent inserts
- Idempotency and `Idempotency-Key`; safe retries
- Versioning, backward compatibility, deprecation
- Rate limit headers and client behavior
- Webhooks: signing, retries, replay, ordering, receiver failures
- REST vs gRPC vs GraphQL (trade-offs); protobuf basics
- Sync vs async APIs: 202 + polling, callbacks, long polling (links to T12)
- API gateway and BFF patterns

### T03. Relational Databases and PostgreSQL
- Data modeling, normalization vs denormalization, constraints and keys
- Indexing: B-tree internals, composite index column order, covering/partial indexes, selectivity, when indexes hurt
- Reading `EXPLAIN` / `EXPLAIN ANALYZE`; query optimization; N+1; slow-query triage
- Transactions and ACID; isolation levels and anomalies (dirty/non-repeatable/phantom/write skew); MVCC
- Locking: row locks, `SELECT ... FOR UPDATE`, `SKIP LOCKED`, advisory locks, deadlocks; optimistic vs pessimistic concurrency
- Postgres internals essentials: WAL, vacuum, bloat; connection pooling (PgBouncer concepts)
- Replication (sync/async), replication lag, read replicas, failover
- Partitioning (range/list/hash), partition pruning, constraints on partitioned tables, retention
- Sharding: shard key choice, hot shards, resharding, cross-shard queries and transactions
- Consistent hashing (used in several places; cross-link T05/T07)
- Zero-downtime migrations and schema changes on large tables
- Pagination and counting at scale

### T04. NoSQL, Search and Choosing Storage
- NoSQL families: key-value, document, wide-column, graph, time-series
- **MongoDB deep dive:** document modeling (embed vs reference), indexes, aggregation pipeline, replica sets, read/write concern, transactions, **sharding (shard keys, chunks, balancer, mongos, targeted vs scatter-gather)**, common production pitfalls
- Dynamo/Cassandra-style systems: partition key, tunable consistency, LSM trees, compaction
- Search engines: inverted index, relevance basics, Elasticsearch/OpenSearch overview
- Object storage (S3-style), file/blob design; OLTP vs OLAP; columnar stores overview
- **Decision framework: how to choose a database in an interview** (with a worked comparison)

### T05. Caching and Redis
- Why cache; where (client, CDN, app, DB); cache hierarchy
- Patterns: cache-aside, read-through, write-through, write-behind, refresh-ahead
- Eviction (LRU/LFU/TTL), sizing, hit ratio, what to cache and what not
- Invalidation and consistency; **stampede/thundering herd, penetration, avalanche, hot keys**, request coalescing, TTL jitter
- **Redis internals and use:** data structures and when to use each; persistence (RDB/AOF); replication; Sentinel vs Cluster (hash slots); memory management; atomicity (Lua, transactions); pipelining; pub/sub vs Streams; common pitfalls (big keys, `KEYS`, blocking commands)
- Distributed cache design and consistent hashing
- HTTP caching and CDN (`Cache-Control`, `ETag`, stale-while-revalidate)

### T06. Messaging and Event-Driven Architecture
- Queue vs log vs pub/sub; RabbitMQ/SQS-style vs Kafka-style
- **Kafka deep dive:** brokers, topics, partitions, replication, leader/ISR, KRaft; producers (acks, batching, idempotent producer); consumers (groups, offsets, rebalancing); retention and compaction; **partition-key design and ordering**; consumer lag; tuning; transactions and "exactly-once" (what it does and does not guarantee)
- Delivery semantics: at-most-once / at-least-once / exactly-once; **idempotent consumers**
- **The dual-write problem, transactional outbox, inbox pattern, CDC concept**
- Retries, retry topics, **DLQ**, poison messages, backpressure, delay queues
- Event design: envelopes, schema evolution, versioning, schema registry concepts
- Sagas (orchestration vs choreography), CQRS, event sourcing (and when NOT to use them)

### T07. Distributed Systems Theory
- Failure models; partial failure; the fallacies of distributed computing
- Time and ordering: physical vs logical clocks; Lamport and vector clocks; hybrid logical clocks
- Replication strategies: leader-follower, multi-leader, leaderless; quorums (R+W>N); conflict resolution (LWW, CRDT basics)
- Consensus: Raft (leader election, log replication), Paxos overview; where it is used (etcd, KRaft, ZooKeeper-style systems)
- Distributed transactions: 2PC vs sagas vs TCC; why 2PC is avoided
- Distributed locks, leases, **fencing tokens**, leader election (and the Redlock debate, presented fairly)
- Probabilistic data structures: Bloom filter, HyperLogLog, count-min sketch
- Unique ID generation: UUID versions, Snowflake-style, ULID/UUIDv7; trade-offs

### T08. Reliability and Resilience Patterns
- Timeouts (and why default/no timeouts are dangerous); retries; exponential backoff and **jitter**; retry budgets; retry storms
- Circuit breaker (closed/open/half-open); bulkhead; load shedding; backpressure; graceful degradation; fallbacks; hedged requests
- **Rate limiting:** token bucket, leaky bucket, fixed window, sliding window (log vs counter); distributed rate limiting; per-tenant fairness; noisy neighbor; fail-open vs fail-closed
- Health checks (liveness/readiness), graceful shutdown, zero-downtime deploys, blue/green, canary, feature flags
- Backups, RPO/RTO, multi-AZ and multi-region basics, disaster recovery, chaos engineering
- Scheduling at scale: delayed jobs, cron at scale, avoiding the "midnight thundering herd", exactly-one execution

### T09. Scalability and Infrastructure
- Load balancing (L4 vs L7, algorithms), reverse proxy, API gateway, service discovery
- Horizontal scaling, sessions and statelessness, autoscaling signals
- Docker essentials and Kubernetes essentials (pods, deployments, services, HPA, probes) at interview level
- DNS-based routing, CDN, multi-region patterns, data locality
- Capacity planning and cost awareness
- Cloud building blocks: generic concept → AWS/GCP/Azure equivalents (object storage, queues, pub/sub, managed databases, serverless, load balancers, managed caches); when managed beats self-hosted

### T10. Security for Backend Engineers
- AuthN vs AuthZ; sessions vs JWT; access/refresh tokens and rotation; OAuth 2.0 and OIDC flows; API keys; RBAC vs ABAC
- Password hashing (argon2/bcrypt), encryption at rest/in transit, envelope encryption, secrets management
- OWASP Top 10 for backends; CSRF, XSS, SSRF, injection, template injection; CORS explained properly
- **Multi-tenancy:** silo/pool/bridge models, tenant isolation, row-level security, noisy-neighbor, tenant-scoped caching and rate limits
- Audit logging, PII handling, GDPR basics

### T11. Observability and Operations
- Logs, metrics, traces; RED/USE/golden signals; metric cardinality
- Distributed tracing, correlation IDs, OpenTelemetry concepts
- SLO-based alerting, error budgets, on-call, incident response, blameless postmortems
- Load testing and performance profiling; capacity testing

### T12. Real-Time Systems
- Polling vs long polling vs **SSE** vs **WebSocket** (and when each wins)
- Scaling stateful connections; sticky sessions; pub/sub fan-out across instances
- Presence; reconnect, resume and replay (`Last-Event-ID`); backpressure; slow consumers
- Authenticating sockets/streams; multi-tenant rooms; the "celebrity fan-out" problem

### T13. Software Design: OOP, SOLID, Patterns, Architecture
- OOP properly: encapsulation, abstraction, polymorphism, composition over inheritance
- **SOLID**, each with a violation and a fix in TypeScript (real examples, not toy shapes)
- Patterns (when to use AND when not to): Strategy, Factory/Abstract Factory, Adapter, Decorator, Observer, Builder, Singleton (and DI), Chain of Responsibility, Command, State, Template Method, Proxy, Facade, Repository, Unit of Work
- Architecture styles: layered, hexagonal/ports-and-adapters, clean architecture, modular monolith vs microservices, DDD essentials (bounded context, aggregate), 12-factor, CQRS
- Dependency injection and inversion; testing strategy (unit/integration/contract/e2e)

### T14. Low-Level Design (Machine Coding)
- Approach: requirements → entities → relationships → patterns → code → extensibility
- Problems (each with class design, patterns used, concurrency notes, TypeScript code that runs): parking lot, elevator, LRU/LFU cache, rate limiter, notification service, in-memory pub/sub, Splitwise, BookMyShow seat locking, file system, logger framework, vending machine, task scheduler, chess/tic-tac-toe, library management

### T15. Node.js, NestJS and Next.js Internals (Vijay's stack)
- Node: event loop phases, libuv, microtasks vs macrotasks, blocking the loop, streams and backpressure, worker threads, cluster, memory and GC, leak hunting, profiling
- TypeScript: advanced types useful in backend design
- NestJS: modules, DI and provider scopes, lifecycle, guards/interceptors/pipes/filters, request-scoped provider cost, microservice transports, testing
- Next.js: rendering models (SSR/SSG/ISR/RSC), caching layers, data fetching trade-offs, auth patterns

### T16. Data Processing and Analytics (light)
- Batch vs stream; rollups and pre-aggregation; OLAP basics; Lambda vs Kappa overview; time-series considerations

### T17. System Design Case Studies (HLD)
Use the template in 7.5. Priority order: URL shortener, rate limiter, **notification system**, distributed cache, key-value store, unique ID generator, news feed, chat/messaging, ticket booking with seat locking, payment/wallet system (idempotency, double-entry), e-commerce checkout + inventory, flash sale, web crawler, typeahead/autocomplete, file storage (Drive/Dropbox), video streaming, ride matching/proximity service, metrics and log aggregation, distributed job scheduler, distributed message queue, collaborative editor (OT/CRDT), leaderboard, API gateway, feature-flag service, search engine basics, food delivery, hotel booking.

### T18. Scenario Bank ("What will you do if...")
See Section 9. Scenarios are written per topic as they appear, then aggregated and extended here with cross-topic scenarios.

### T19. Interview Playbook
- How to run a 45-minute design interview; clarifying questions; estimation habits; trade-off language; whiteboarding; handling "what if it fails?" follow-ups
- Mistakes that cost offers; level expectations (2 YOE vs senior); how to answer when you don't know
- **How to present NotifyX** in an interview (story, trade-offs, numbers you actually measured; no inflated claims)
- Mock interview scripts and self-evaluation rubrics; behavioral questions for backend engineers

### T20. Applied Projects Companion (optional)
- Pages that map the Handbook's topics onto hands-on projects, starting with NotifyX (Section 12): which topics to read before each milestone, and an index of the concepts each project uses. Pointers only; no build instructions. More projects can be added later without touching the core topics.

### T21. AI/LLM Systems Design (Extended, light)
- Architecture of LLM-backed applications: request flow, streaming responses (SSE), RAG pipeline basics (embeddings, vector search, chunking), caching, rate limits and cost control, evaluation and observability, reliability patterns, safe tool-calling. Not the focus; only after Core is done.

---

## 9. Scenario bank seeds (expand each using the template in 7.4)

**Databases:** DB CPU hits 100% after a deploy · query is slow only at peak · replica lag causes stale reads · deadlocks suddenly increase · connection pool exhausted · a 5B-row table is slow · migration locks a critical table · hot-row contention on a counter · unique-constraint race in concurrent requests · accidental data deletion, recover · poorly chosen shard key creates a hot shard · add a column to a 1B-row table safely.

**Caching:** cache stampede when a hot key expires · cache and DB disagree · Redis memory full and evicting · one hot key melts a Redis node · Redis goes down, what happens to the system · users see stale prices.

**Messaging:** Kafka consumer lag keeps growing · duplicate processing · messages arrive out of order · poison message blocks a partition · rebalance storm · hot partition · broker failure · producer loses messages · event schema change breaks consumers · outbox table keeps growing.

**Reliability:** a slow provider causes cascading failure · retry storm after an outage · midnight thundering herd from scheduled jobs · noisy tenant degrades others · one availability zone/region fails · deploy causes error spike, rollback strategy · memory leak in a Node service · event loop blocked by CPU work.

**API:** client retries cause duplicate charges · pagination breaks under concurrent inserts · need a breaking API change · webhook receivers are down · a huge export request takes the service down.

**Security:** API key leaked · cross-tenant data leak found · stolen JWT · abusive traffic/DDoS · SSRF via user-supplied webhook URL.

**Real-time:** 100k concurrent WebSocket connections · users miss messages after reconnect · fan-out to a million followers.

**Scale and cost:** traffic grows 10x in a day · infrastructure cost doubled · design for 100x growth · p99 latency spikes · new multi-region requirement.

---

## 10. Reading list policy and seed sources

The planner has **not verified any URL**. Claude Code must discover, fetch and verify each link, and confirm that it says what the annotation claims. Prioritize these *kinds* of sources (examples, not an exhaustive or guaranteed list):

- **Official docs:** PostgreSQL, Redis, Apache Kafka, MongoDB, Node.js, NestJS, Next.js, Docker, Kubernetes, OpenTelemetry, OWASP cheat sheets.
- **Practitioner and cloud-architecture guides:** AWS Builders' Library, AWS Architecture Blog, Google SRE books (free online), Microsoft Azure Architecture Center (cloud design patterns), Google Cloud Architecture Center.
- **Engineering blogs with real production lessons:** Stripe (idempotency, rate limiting), Cloudflare, Netflix TechBlog, Uber Engineering, Discord, Shopify Engineering, LinkedIn Engineering (Kafka origins), Slack, GitHub, Dropbox, Meta engineering.
- **Papers and canonical essays:** Dynamo, Bigtable, Spanner, Raft, Kafka paper, Lamport's "Time, Clocks and the Ordering of Events", Pat Helland on distributed transactions, Jepsen analyses.
- **Respected individual authors:** Martin Kleppmann (talks/blog; *Designing Data-Intensive Applications* as a book recommendation), Martin Fowler, Brandur (Postgres and idempotency), Use The Index, Luke (SQL indexing).
- **Medium and newsletters:** only credible, reachable ones; mark paywalled.

Rules: no link without fetching it; record `verifiedOn`; prefer primary sources over summaries of summaries; note when an article is old and what has changed since.

---

## 11. Learning method (how Vijay uses the Handbook)

Built-in learning science: active recall, spaced repetition, the Feynman technique (explain it simply), and deliberate practice with scenarios and timed designs.

**Per subtopic:**
1. Read to the level you need (start with Fundamentals + Intermediate).
2. Close the page and **explain it out loud or in writing** in your own words. Note gaps.
3. Do the Q&A (answers hidden) and the quiz.
4. Add flashcards to the "Revise today" queue.
5. Log doubts in `docs/doubts.md`; Claude Code answers and folds them into the page.

**Revision rhythm:** Day 0 learn · Day 1 recall quiz · Day 3 flashcards · Day 7 · Day 21 · then monthly. The app schedules this (A2).

**Suggested weekly rhythm (1-2 h/day):**
- Mon-Wed: learn new subtopics (read + explain-back)
- Thu: recall day (quiz + flashcards on the week's topics)
- Fri: one **scenario drill** (think 5-10 min, then reveal)
- Sat: one **case study**: design it on paper in 45 minutes first, then compare with the notes
- Sun: rest, or light revision

**Daily loop (1-2 h):**
1. Open the Study plan page; today's subtopic is already chosen (~5 min).
2. Read, explain it back in your own words, then take the quiz (40-60 min).
3. Clear the "Revise today" flashcards (~10 min).
4. If you did project work today, capture one learning with `/capture-learning` (~2 min).
5. Optional: run `ingest-learnings` if the inbox has items (~10 min).

The daily subtopic comes from the **curriculum**, not from ingest. Ingest only folds in what your projects produced, so some days it has nothing to do.

### 11.1 Four-to-six-month study plan (default: 24 weeks)

Assumes ~1-2 h/day (about 8-12 h/week). Rough time per subtopic: read 25 min + explain-back 15 min + quiz/flashcards 10 min + doubts 10 min, so about 1 hour. That is roughly 5-7 new subtopics per week, plus revision, drills and case studies. Claude Code writes content **at least one wave ahead** of Vijay so he is never blocked. A checkpoint every 4 weeks: one timed mock design, a gap list, and a re-plan if behind.

| Weeks | Focus | Outcome |
|---|---|---|
| 1 | Build the app (A0-A1) + Wave 0 pilot page | Handbook runs; style approved |
| 2-3 | T00 CS foundations · T01 Foundations (estimation, CAP, consistency) | Shared vocabulary |
| 4-5 | T13 SOLID, patterns, architecture · T02 API design | Design thinking basics |
| 6-8 | T03 relational databases (core, then replication/partitioning/sharding) | Strong DB fundamentals |
| 9 | T10 Security and multi-tenancy | Auth, isolation |
| 10 | T15 Node/NestJS internals | Own-stack depth |
| 11-12 | T05 Caching and Redis | Caching patterns |
| 13 | T08 Reliability and rate limiting | Resilience toolkit |
| 14-15 | T06 Messaging, Kafka, event-driven | Async systems |
| 16 | T07 Distributed systems theory | Consistency, consensus |
| 17 | T04 NoSQL/MongoDB/search + choosing storage | Storage decisions |
| 18 | T12 Real-time · T11 Observability | Live systems, operations |
| 19 | T09 Infrastructure (Core) | Scale-out basics |
| 20 | T14 LLD (6 core problems) + first case studies | Machine-coding readiness |
| 21-22 | T17 Case studies (2-3 per week, timed) + scenario drills | Interview practice |
| 23 | T18 cross-topic scenarios · T19 Playbook · mock interviews | Interview readiness |
| 24 | Revision sprint on weakest topics, final mocks, tell-your-project-story practice | Consolidation |

**Compressed 4-month version (about 16 weeks):** Core only. Week 1 app build; 2-3 foundations + patterns; 4 API + security; 5-6 databases; 7 Node/NestJS; 8-9 caching + reliability; 10-11 messaging; 12 distributed theory + NoSQL; 13 real-time + observability + infrastructure; 14-15 case studies + scenarios; 16 mocks and revision.

**Extended** topics (T16, T21, remaining LLD problems and case studies, Kubernetes depth, etc.) fill any spare time, or run after the 6 months.

---

## 12. Optional: pair the Handbook with a project (NotifyX example)

The Handbook is complete on its own. If Vijay wants hands-on practice, he can build any project beside it. The rule stays the same: **learn the topic here first, then build.** Below is the mapping for NotifyX (milestone numbers refer to `NOTIFYX_BUILD_PLAN.md`). Other projects can get their own table later (T20).

| NotifyX milestone | Read these Handbook topics first |
|---|---|
| M1 Foundation + infra | T09 Docker basics · T11 logs, health checks · T13 hexagonal architecture, DI |
| M2 Domain + database | T03 modeling, indexes, transactions · T13 SOLID, State, Repository |
| M3 Auth + multi-tenancy | T10 auth, API keys, JWT/refresh rotation, multi-tenancy |
| M4 Sync notification MVP | T13 Strategy/Adapter/Factory · T02 API design, pagination · T10 template injection |
| M5 Gateway hardening (Redis) | T05 caching + Redis · T08 rate limiting · T02 idempotency |
| M6 Kafka + outbox | T06 Kafka, delivery semantics, outbox · T07 consistency basics |
| M7 Reliability + workers | T08 retries/backoff/jitter, circuit breaker · T06 DLQ, retry topics |
| M8 Preferences, routing, scheduling, digests | T08 scheduling at scale · T13 Chain of Responsibility · T06 |
| M9 Real-time | T12 SSE vs WebSocket, fan-out, reconnect/replay |
| M10 Partitioning + sharding + analytics | T03 partitioning/sharding · T04 MongoDB sharding · T16 rollups |
| M11 Observability + load testing | T11 · T08 capacity/load · T09 scaling |

This ordering ships as one of the Learning Paths ("Project-aligned path"). It differs slightly from the 24-week study plan, because it follows the project's needs instead of the full curriculum.

### 12.1 Project Bridge: how learnings from any project flow into the Handbook

**Principle:** projects produce raw experience; the Handbook holds verified knowledge. Experience enters the Handbook only through a quality gate (Section 3), never by direct paste. One Handbook serves all projects; never create a separate notes app per project.

**Flow A: Project → Handbook (capture, then ingest)**

1. **Capture (in the project repo, ~2 minutes at the end of a work session).** A `capture-learning` skill (or a rule in the project's `CLAUDE.md`) writes one small file into the **shared inbox** at `/learning/learning-inbox/` (one level above every repo; see 12.2), named `YYYY-MM-DD-short-title.md`:

```text
project:            (name)
type:               concept | decision | bug | incident | trade-off | measurement | doubt
what happened:      (facts: symptoms, context)
what I learned:     (my own words)
alternatives:       (what else I considered, and why not)
related topic:      (Handbook topic slug, if known)
evidence:           (commit, log line, measurement WITH machine and method)
confidence:         unverified   (default)
```

   For NotifyX, its `docs/learning-journal/` entries and teach-back answers can serve as the inbox.

2. **Ingest (in the Handbook repo: a quick ~10-minute pass on days when the inbox has items, or one weekly ~30-minute batch; either works).** Run the `ingest-learnings` skill in the Handbook repo. It reads `../learning-inbox/` (every project's notes in one place, told apart by the `project:` field) and moves processed items to `../learning-inbox/processed/`. The session needs access to that folder (see 12.2 for how to grant it). For each inbox item Claude Code:
   - finds the right page, or proposes a new one;
   - **verifies every technical claim** against sources (all Section 3 rules apply);
   - folds it in as a **Field note** (clearly labeled personal experience, not sourced fact), or as a new **scenario** (real incidents make the best scenarios), flashcard, misconception entry or Q&A item;
   - adds the project to the page's `appliedIn` frontmatter;
   - records the item in `docs/field-notes-log.md` and moves the inbox item to `processed/`;
   - if it reveals a gap in the curriculum, proposes an addition to `CURRICULUM.md` (Vijay approves).

3. Items that cannot be verified stay in the log as `unverified` and never appear in pages as facts.

**What is worth capturing:** the root cause of a bug; a decision and the alternatives you rejected; a concept you did not know; a measurement you took (always label as measured on your machine, with method, never generalized); a mistake you made; a question you could not answer; and **interview stories** (problem, options, decision, result), which feed T19 "project stories".

**Flow B: Handbook → Project (use)**

- Each project's `CLAUDE.md` gets a rule so Claude Code uses your verified notes as context while building. This also reduces hallucination in project work. Starter snippet (Claude Code generates the final version):

```text
## Learning bridge
- Handbook location: ../learning-app/content/
- Before designing or implementing a concept (caching, queues, auth, etc.), read the matching Handbook page and follow its production guidance. If the Handbook and this project disagree, say so.
- At the end of a work session, run /capture-learning to log lessons into ../learning-inbox/ (concept, decision, bug, incident, trade-off, measurement, doubt). Never include secrets or proprietary data.
```

- Each project gets one page under T20 (Applied Projects) mapping its milestones to Handbook topics (like the table above).
- The `appliedIn` frontmatter links each topic back to the projects that use it, so a topic page shows where you have applied it.

**Rules**
- Project-specific detail (ADRs, journals, code) stays in the project repo. Only **generalizable lessons** enter the Handbook.
- **Confidentiality for work projects:** never put proprietary code, schemas, internal names, customer data or secrets into the inbox or the Handbook. Describe the pattern, not the company's system. When unsure, leave it out, and follow your employer's policy.
- Keep capture tiny; the weekly ingest does the heavy lifting. Skip ingest in a busy week; the inbox simply waits.

### 12.2 Workspace layout (all projects side by side)

```text
/learning
├── CLAUDE.md            shared rules for every session under /learning
├── learning-inbox/      shared drop box: every project writes notes here
│   └── processed/       the Handbook moves ingested notes here
├── learning-app/        this Handbook (its own git repo)
├── notifyx/             project (its own git repo)
└── toolbridge/          project (its own git repo)
```

- `/learning` itself is a **plain folder, not a git repo**. Keeping the inbox outside every project repo means personal or work-adjacent notes can never be committed or pushed by accident with a project.
- **Root `CLAUDE.md`** holds only the shared rules; each project keeps its own `CLAUDE.md` for project-specific rules. Claude Code is expected to load `CLAUDE.md` files from parent folders too, so sessions started in any subfolder pick it up. Claude Code must verify this in the official docs. Starter content:

```text
# Learning workspace (shared rules for all sessions under /learning)
Layout: learning-app/ (Systems Handbook), notifyx/, toolbridge/, learning-inbox/ (shared drop box)
- The Handbook is verified knowledge. Before designing a concept, read the matching page in learning-app/content/ and follow it. Flag conflicts.
- End of a session: /capture-learning writes one note to learning-inbox/ (type, what happened, what I learned, alternatives, evidence, confidence: unverified).
- Never put secrets or proprietary/work-confidential data in notes.
```

- **Access (verify the current mechanism in the official docs):**
  - **Option A (recommended):** start Claude Code inside each project folder and grant extra access to `../learning-inbox` (write) and `../learning-app` (read), using the additional-directories feature or settings. Clean git context and a focused session.
  - **Option B (simplest):** start Claude Code at `/learning`. Every folder is in scope with no setup, but the context is noisier and git commands need care because the repos are nested.
- Each new project gets a folder next to the others, a `CLAUDE.md` with the learning-bridge snippet, and one T20 page in the Handbook.

---

## 13. App build phases

Build the app first and keep it small. Content waves start as soon as A1 is done.

### A0. Decisions and scaffold (1-2 sessions)
- Create repo, pnpm workspace (single app is fine), strict TypeScript, ESLint/Prettier.
- Evaluate docs framework options; write ADRs (docs shell, search, state storage, diagrams).
- Write `docs/STYLE_GUIDE.md` from Section 3, and `docs/CURRICULUM.md` from Section 8.
- **Done when:** `pnpm dev` shows one sample topic rendered from MDX with a sidebar; CI passes.

### A1. Reading-experience MVP
- Track/topic tree, routing, breadcrumbs, prev/next, ToC, reading time, level selector, callouts, code blocks, Mermaid, dark/light, responsive.
- Full-text search.
- Progress status per subtopic + progress overview page.
- Q&A hide/reveal component; Learning Paths page (6-month full, 4-month Core-only, interview crash course, project-aligned).
- **Done when:** a pilot page (Wave 0) reads beautifully on laptop and phone; search finds it; progress persists after a refresh; Playwright smoke tests pass.

### A2. Revision tools
- Flashcards + SM-2 scheduler + "Revise today"; quizzes with history; scenario drill mode; cheat-sheet aggregator/print; personal notes and bookmarks; progress export/import; study plan page with weekly targets and an ahead/behind indicator.
- **Done when:** SM-2 logic is unit-tested (including edge cases); a full learn → quiz → flashcard → revise cycle works end to end; export then import restores state.

### A3. Content pipeline and quality tooling
- `validate-content`: frontmatter schema, required sections present and in order, word-count bounds, tags valid, prerequisites exist, internal links resolve, flashcard/quiz format valid.
- `check-links`: external links reachable (scheduled weekly in CI; failures create a report).
- `freshness-report`: pages past `reviewAfter`; coverage dashboard (topic counts by status).
- **Done when:** a deliberately broken page fails CI with a clear message; the coverage report matches `CURRICULUM.md`.

### A4. Polish
- PWA/offline, accessibility pass, performance, print styles, optional static deploy, concept graph.

---

## 14. Content waves

Per page, follow the Section 16 workflow. Each wave ends with Vijay reviewing and doing the recall exercises.

| Wave | Content (Core first, then Extended pages of the same tracks) | Study-plan weeks |
|---|---|---|
| **W0 Pilot** | One gold-standard subtopic: **Caching → Cache-aside and stampede** (all 17 template sections). Proves the template, tone and tooling. **Vijay approves the style before any more content is written.** Also run the coverage audit (8.1). | 1 |
| **W1** | T00 CS foundations · T01 Foundations · T13 Software design · T02 API design | 2-5 |
| **W2** | T03 Relational databases (all) · T10 Security and multi-tenancy · T15 Node/NestJS | 6-10 |
| **W3** | T05 Caching/Redis · T08 Reliability and rate limiting | 11-13 |
| **W4** | T06 Messaging/Kafka · T07 Distributed systems theory | 14-16 |
| **W5** | T04 NoSQL/MongoDB · T12 Real-time · T11 Observability · T09 Infrastructure | 17-19 |
| **W6** | T14 LLD · T17 Case studies · T18 Scenario bank (cross-topic) · T19 Playbook · T20 Applied projects | 20-24 |
| **W7 (Extended)** | T16 Data processing · T21 AI/LLM systems · remaining Extended pages and case studies | Spare time / after month 6 |

Claude Code stays at least one wave ahead of Vijay's reading. If Vijay falls behind, pause new content and use the time for revision and scenarios instead.

Case studies and scenarios are written **continuously** alongside topics when natural, not only at the end. Each wave: a short "Wave review" page listing what was added, open `needs-verification` items, and the next revision date.

---

## 15. Claude Code tooling to generate (propose, then Vijay approves each)

Ask Claude Code to **verify current Claude Code conventions in the official docs** before creating any of these.

**`CLAUDE.md` (short, under ~150 lines):** purpose (learning handbook), non-goals, current phase/wave pointer, the content quality rules (Section 3, condensed), the page template list, commands (dev, test, validate, link-check), and pointers to `docs/`. Details stay in `docs/`.

**Rules (path-scoped if supported):**
- `content/**`: follow `STYLE_GUIDE.md`; sources required; no unverifiable claims; frontmatter must validate.
- `components/**`, `lib/**`: TypeScript strict; tests for logic; no new dependencies without an ADR.
- `docs/needs-verification.md`: every unverified item is logged, never hidden.

**Skills (suggested):**
- `write-topic`: the full content workflow in Section 16
- `write-scenario`, `write-case-study`: fill the templates in 7.4/7.5
- `verify-sources`: fetch each link, confirm it exists and supports the claim, record `verifiedOn`
- `make-quiz`: generate flashcards and quizzes, then re-verify every answer against the page's sources
- `answer-doubt`: answer a question from `docs/doubts.md` and fold it into the right page
- `freshness-review`: update pages past `reviewAfter`
- `capture-learning` (lives in each **project** repo): writes one inbox item in the format from Section 12.1
- `ingest-learnings` (lives in the Handbook repo): the weekly verify-and-fold-in workflow from Section 12.1

**Subagents (suggested):**
- `fact-checker` (read-only + web): independently re-checks claims against sources; lists unsupported or doubtful statements.
- `pedagogy-reviewer` (read-only): checks clarity, level progression, jargon definitions, example quality, missing "when not to use".
- `link-verifier`: bulk-verifies further-reading links.

**Hooks (suggested):** run `validate-content` on edited content files; block commits that fail validation; remind to log unverified items.

---

## 16. Session workflow and prompt templates

**Rules of thumb:** one subtopic (or one app feature) per session. Use a fresh session per topic (`/clear` or a new session). Keep `CLAUDE.md` short. Use subagents for fact-checking, but do not spawn many agents for small tasks. This keeps usage efficient and quality high on a Pro plan.

**Content workflow for one subtopic (`write-topic`):**
1. **Plan:** read the `CURRICULUM.md` entry; propose the page outline and the sources to use; **Vijay approves**.
2. **Research:** fetch at least 3 primary/credible sources; note claims with source IDs; verify versions.
3. **Draft:** follow the 17-section template and the level layers; write in plain English first.
4. **Prove it:** run all code; check diagrams show real mechanisms; make sure every number is cited or marked illustrative.
5. **Self-test:** generate Q&A, flashcards, quiz; re-verify each answer against sources.
6. **Fact-check:** run the `fact-checker` subagent; fix or log every flagged item.
7. **Validate:** run `validate-content` and the link checker.
8. **Hand-off:** summarize what was added, list open `needs-verification` items, and ask Vijay 3 questions to test his understanding.

**Prompt: kick off a wave**
> Read `LEARNING_APP_PLAN.md` Sections 3, 7 and the current wave in Section 14. List the subtopic pages for this wave (titles, one-line scope, prerequisites, sources you plan to use). Do not write content yet. Flag anything missing or wrong in the syllabus.

**Prompt: write one subtopic**
> Write the subtopic "{slug}" using the `write-topic` workflow. Research first and show me your source list. Verify versions and links. Run all code. Mark anything you could not verify. At the end, ask me 3 questions to test my understanding.

**Prompt: scenario**
> Write scenario "{title}" using the scenario template. Include clarifying questions, a ranked list of root causes with how to confirm each, and common wrong answers. Cite sources for any numbers.

**Prompt: case study**
> Write the case study "{name}" using the HLD template. Show the capacity math. Put the 5/15/45-minute interview guidance at the end. Draw the flow in Mermaid.

**Prompt: answer a doubt**
> Answer my doubt in `docs/doubts.md` item {n} in simple English with an example. Then update the right page(s) so the answer lives in the notes, and add a flashcard.

**Prompt: audit**
> Audit the page "{slug}" with the `fact-checker` and `pedagogy-reviewer` subagents. Give me only the issues that matter, ranked.

---

## 17. Definition of Done

**App feature done when:** typecheck, lint, unit tests and Playwright smoke tests pass; works on laptop and phone; keyboard accessible; documented where needed; ADR written for any significant decision.

**Topic page done when:**
- [ ] Frontmatter valid; all 17 template sections present (or explicitly marked not applicable with a reason)
- [ ] Every non-obvious claim traceable to a listed source; versions stated; numbers cited or marked illustrative
- [ ] All links fetched and verified (`verifiedOn` set); 3-8 annotated further-reading items
- [ ] All code executed (or marked pseudo-code); diagrams render and show real mechanisms
- [ ] Q&A, flashcards and quiz answers re-verified; no company attribution without a source
- [ ] `fact-checker` and `pedagogy-reviewer` issues resolved or logged
- [ ] `validate-content` passes; `status: reviewed`; `lastVerified` and `reviewAfter` set
- [ ] Vijay has read it and answered the teach-back questions

---

## Appendix A: Minimal page skeleton (illustrative; adapt to the chosen docs framework)

```mdx
---
title: "Cache-aside and cache stampede"
slug: caching/cache-aside-stampede
track: caching
order: 2
levelsCovered: [fundamentals, intermediate, production, staff]
prerequisites: [caching/why-cache]
readingTimeMin: 25
tags: [caching, redis]
interviewPatterns: [cache-invalidation, thundering-herd]
appliedIn: [notifyx-m5]
priority: core
status: draft
lastVerified: YYYY-MM-DD
reviewAfter: YYYY-MM-DD
---

## TL;DR
...

## Why this exists
...

## Mental model
(Mermaid diagram of the real read path and where it fails)

<Level of="fundamentals">...</Level>
<Level of="intermediate">...</Level>
<Level of="production">...</Level>
<Level of="staff">...</Level>

## What would you do if...
<Scenario id="cache-stampede-hot-key" ... />

## Interview Q&A
<QA level="intermediate" pattern="thundering-herd" q="...">hidden model answer</QA>

## Cheat sheet
...

<Flashcards ... />
<Quiz ... />
<Sources ... />
```

## Appendix B: ADRs to write (minimum)
0001 format: Next.js + MDX static site · 0002 docs framework (Fumadocs / Nextra / custom) · 0003 search (Pagefind vs built-in) · 0004 user-state storage and schema versioning · 0005 diagram rendering · 0006 spaced-repetition algorithm · 0007 content validation rules · 0008 hosting (local vs static host) · 0009 study-plan generation (static schedule vs computed from CURRICULUM.md and progress).
