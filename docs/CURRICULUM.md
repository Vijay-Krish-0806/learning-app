# Curriculum

The living syllabus, from LEARNING_APP_PLAN.md §8. Tick an item when its page is `status: reviewed`.
Tags: **[C]** = core (finish first), **[E]** = extended (buffer), following the §8.2 table. Where one plan
bullet mixed core and extended items, it is split into separate lines. Nothing has been dropped.

Rules: changes to this list (splits, merges, additions) are proposed with a reason, and the owner
approves them. The coverage audit (§8.1, `docs/COVERAGE.md`) runs in Wave 0, again after Wave 4, and
before the final revision sprint. Page slugs are assigned when each wave is planned.

Status: **0 / all pages reviewed** · Last updated 2026-11-15

## T00. CS foundations for backend engineers (all core)

- [ ] [C] OS essentials: processes vs threads, context switching, memory (stack/heap, virtual memory), file systems and I/O
- [ ] [C] Blocking vs non-blocking I/O; the event-driven model (epoll-style)
- [ ] [C] Concurrency: race conditions, mutex/semaphore, deadlock, atomic operations, memory visibility
- [ ] [C] Async vs parallel, and how this maps to Node.js
- [ ] [C] Networking in depth: sockets; TCP handshake, congestion control, head-of-line blocking
- [ ] [C] TLS handshake; NAT
- [ ] [C] Latency numbers every engineer should know (cited)
- [ ] [C] Data structures behind real systems: hash tables, B-trees, LSM trees, skip lists, tries, heaps, ring buffers, inverted index
- [ ] [C] Serialization and compression: JSON, protobuf, Avro, MessagePack; trade-offs

## T01. Foundations of system design (all core)

- [ ] [C] How to approach any design problem (framework); functional vs non-functional requirements
- [ ] [C] Scalability: vertical vs horizontal; stateless vs stateful services
- [ ] [C] Latency, throughput, percentiles (p50/p95/p99), tail latency, Little's Law
- [ ] [C] Availability and reliability; SLI/SLO/SLA; the math of "nines"
- [ ] [C] Back-of-envelope estimation (QPS, storage, bandwidth, memory) with worked examples
- [ ] [C] Consistency models (strong, eventual, causal, read-your-writes); CAP and PACELC
- [ ] [C] Networking essentials: DNS, TCP vs UDP, TLS, HTTP/1.1 vs 2 vs 3, keep-alive, connection reuse, CDN basics

## T02. API design and communication

- [ ] [C] REST fundamentals; resource modeling; status codes; error format (verify RFC 9457 vs RFC 7807)
- [ ] [C] Pagination: offset vs keyset/cursor; filtering and sorting; consistency under concurrent inserts
- [ ] [C] Idempotency and `Idempotency-Key`; safe retries
- [ ] [C] Versioning, backward compatibility, deprecation
- [ ] [C] Rate-limit headers and client behavior
- [ ] [C] Webhooks: signing, retries, replay, ordering, receiver failures
- [ ] [C] REST vs gRPC vs GraphQL (trade-offs)
- [ ] [E] Protobuf details
- [ ] [C] Sync vs async APIs: 202 + polling, callbacks, long polling (links to T12)
- [ ] [C] API gateway pattern
- [ ] [E] BFF (backend-for-frontend) pattern

## T03. Relational databases and PostgreSQL

- [ ] [C] Data modeling, normalization vs denormalization, constraints and keys
- [ ] [C] Indexing: B-tree internals, composite index column order, covering/partial indexes, selectivity, when indexes hurt
- [ ] [C] Reading `EXPLAIN` / `EXPLAIN ANALYZE`; query optimization; N+1; slow-query triage
- [ ] [C] Transactions and ACID; isolation levels and anomalies (dirty / non-repeatable / phantom / write skew); MVCC
- [ ] [C] Locking: row locks, `SELECT ... FOR UPDATE`, `SKIP LOCKED`, advisory locks, deadlocks; optimistic vs pessimistic concurrency
- [ ] [E] Postgres internals: WAL, vacuum, bloat
- [ ] [C] Connection pooling (PgBouncer concepts)
- [ ] [C] Replication (sync/async), replication lag, read replicas, failover
- [ ] [C] Partitioning (range/list/hash), partition pruning, constraints on partitioned tables, retention
- [ ] [C] Sharding: shard key choice, hot shards, resharding, cross-shard queries and transactions
- [ ] [C] Consistent hashing (cross-link T05/T07)
- [ ] [E] Zero-downtime migrations and schema changes on large tables (deep dive)
- [ ] [C] Pagination and counting at scale

## T04. NoSQL, search and choosing storage

- [ ] [C] NoSQL families: key-value, document, wide-column, graph, time-series
- [ ] [C] MongoDB: document modeling (embed vs reference), indexes, aggregation pipeline
- [ ] [C] MongoDB: replica sets, read/write concern, transactions
- [ ] [C] MongoDB sharding: shard keys, chunks, balancer, mongos, targeted vs scatter-gather; production pitfalls
- [ ] [E] Dynamo/Cassandra-style systems: partition key, tunable consistency, LSM trees, compaction
- [ ] [C] Search basics: inverted index, relevance basics, Elasticsearch/OpenSearch overview
- [ ] [C] Object storage (S3-style), file/blob design
- [ ] [E] OLTP vs OLAP; columnar stores overview
- [ ] [C] Decision framework: how to choose a database in an interview (worked comparison)

## T05. Caching and Redis (all core)

- [ ] [C] Why cache; where (client, CDN, app, DB); cache hierarchy
- [ ] [C] Patterns: cache-aside, read-through, write-through, write-behind, refresh-ahead
- [ ] [C] Eviction (LRU/LFU/TTL), sizing, hit ratio, what to cache and what not
- [ ] [C] Invalidation and consistency; stampede/thundering herd, penetration, avalanche, hot keys; request coalescing; TTL jitter (**W0 pilot: cache-aside and stampede**)
- [ ] [C] Redis data structures and when to use each
- [ ] [C] Redis persistence (RDB/AOF) and replication; Sentinel vs Cluster (hash slots)
- [ ] [C] Redis memory management; atomicity (Lua, transactions); pipelining
- [ ] [C] Redis pub/sub vs Streams; pitfalls (big keys, `KEYS`, blocking commands)
- [ ] [C] Distributed cache design and consistent hashing
- [ ] [C] HTTP caching and CDN (`Cache-Control`, `ETag`, stale-while-revalidate)

## T06. Messaging and event-driven architecture

- [ ] [C] Queue vs log vs pub/sub; RabbitMQ/SQS-style vs Kafka-style
- [ ] [C] Kafka: brokers, topics, partitions, replication, leader/ISR, KRaft
- [ ] [C] Kafka producers (acks, batching, idempotent producer) and consumers (groups, offsets, rebalancing)
- [ ] [C] Kafka retention and compaction; partition-key design and ordering; consumer lag; tuning
- [ ] [C] Kafka transactions and "exactly-once" (what it does and does not guarantee)
- [ ] [C] Delivery semantics: at-most-once / at-least-once / exactly-once; idempotent consumers
- [ ] [C] The dual-write problem, transactional outbox, inbox pattern, CDC concept
- [ ] [C] Retries, retry topics, DLQ, poison messages, backpressure, delay queues
- [ ] [C] Event design: envelopes, schema evolution, versioning
- [ ] [E] Schema registry details
- [ ] [C] Sagas (orchestration vs choreography); CQRS
- [ ] [E] Event sourcing in depth (and when NOT to use it)

## T07. Distributed systems theory

- [ ] [C] Failure models; partial failure; the fallacies of distributed computing
- [ ] [C] Time and ordering basics: physical vs logical clocks
- [ ] [E] Clock theory depth: Lamport and vector clocks, hybrid logical clocks
- [ ] [C] Replication strategies: leader-follower, multi-leader, leaderless; quorums (R+W>N); conflict resolution (LWW)
- [ ] [E] CRDT basics
- [ ] [C] Consensus: Raft (leader election, log replication), Paxos overview; where it is used (etcd, KRaft, ZooKeeper-style)
- [ ] [C] Distributed transactions: 2PC vs sagas vs TCC; why 2PC is avoided
- [ ] [C] Distributed locks, leases, fencing tokens, leader election (the Redlock debate, presented fairly)
- [ ] [E] Probabilistic data structures: Bloom filter, HyperLogLog, count-min sketch
- [ ] [C] Unique ID generation: UUID versions, Snowflake-style, ULID/UUIDv7; trade-offs

## T08. Reliability and resilience patterns

- [ ] [C] Timeouts (why default/no timeouts are dangerous); retries; exponential backoff and jitter; retry budgets; retry storms
- [ ] [C] Circuit breaker (closed/open/half-open); bulkhead
- [ ] [C] Load shedding; backpressure; graceful degradation; fallbacks
- [ ] [E] Hedged requests
- [ ] [C] Rate limiting: token bucket, leaky bucket, fixed window, sliding window (log vs counter)
- [ ] [C] Distributed rate limiting; per-tenant fairness; noisy neighbor; fail-open vs fail-closed
- [ ] [C] Health checks (liveness/readiness), graceful shutdown, zero-downtime deploys, blue/green, canary, feature flags
- [ ] [C] Backups, RPO/RTO, multi-AZ and multi-region basics, disaster recovery
- [ ] [E] Chaos engineering
- [ ] [C] Scheduling at scale: delayed jobs, cron at scale, the "midnight thundering herd", exactly-one execution

## T09. Scalability and infrastructure

- [ ] [C] Load balancing (L4 vs L7, algorithms), reverse proxy, API gateway, service discovery
- [ ] [C] Horizontal scaling, sessions and statelessness, autoscaling signals
- [ ] [C] Docker essentials
- [ ] [E] Kubernetes essentials (pods, deployments, services, HPA, probes)
- [ ] [C] DNS-based routing and CDN
- [ ] [E] Multi-region patterns, data locality
- [ ] [E] Capacity planning and cost awareness
- [ ] [C] Cloud building blocks: generic concept → AWS/GCP/Azure equivalents; when managed beats self-hosted

## T10. Security for backend engineers

- [ ] [C] AuthN vs AuthZ; sessions vs JWT; access/refresh tokens and rotation
- [ ] [C] OAuth 2.0 and OIDC flows; API keys; RBAC vs ABAC
- [ ] [C] Password hashing (argon2/bcrypt), encryption at rest/in transit, envelope encryption, secrets management
- [ ] [C] OWASP Top 10 for backends; CSRF, XSS, SSRF, injection, template injection; CORS explained properly
- [ ] [C] Software supply chain: lockfiles and exact pins, peer-dependency compatibility, install-script allowlists, minimum release age (OWASP A03:2025) _(added 2026-11-15 from a field note)_
- [ ] [C] Multi-tenancy: silo/pool/bridge models, tenant isolation, row-level security, noisy neighbor, tenant-scoped caching and rate limits
- [ ] [C] Audit logging, PII handling
- [ ] [E] GDPR in depth

## T11. Observability and operations

- [ ] [C] Logs, metrics, traces; RED/USE/golden signals; metric cardinality
- [ ] [C] Distributed tracing, correlation IDs, OpenTelemetry concepts
- [ ] [C] SLO-based alerting, error budgets, on-call, incident response, blameless postmortems
- [ ] [C] Load testing and capacity testing
- [ ] [E] Performance profiling in depth

## T12. Real-time systems (all core)

- [ ] [C] Polling vs long polling vs SSE vs WebSocket (and when each wins)
- [ ] [C] Scaling stateful connections; sticky sessions; pub/sub fan-out across instances
- [ ] [C] Presence; reconnect, resume and replay (`Last-Event-ID`); backpressure; slow consumers
- [ ] [C] Authenticating sockets/streams; multi-tenant rooms; the "celebrity fan-out" problem

## T13. Software design: OOP, SOLID, patterns, architecture (all core)

- [ ] [C] OOP properly: encapsulation, abstraction, polymorphism, composition over inheritance
- [ ] [C] SOLID, each with a violation and a fix in TypeScript
- [ ] [C] Creational patterns: Factory/Abstract Factory, Builder, Singleton (and DI)
- [ ] [C] Structural patterns: Adapter, Decorator, Proxy, Facade
- [ ] [C] Behavioral patterns: Strategy, Observer, Chain of Responsibility, Command, State, Template Method
- [ ] [C] Data patterns: Repository, Unit of Work
- [ ] [C] Architecture styles: layered, hexagonal/ports-and-adapters, clean architecture
- [ ] [C] Modular monolith vs microservices; DDD essentials (bounded context, aggregate); 12-factor; CQRS
- [ ] [C] Dependency injection and inversion; testing strategy (unit/integration/contract/e2e)

## T14. Low-level design (machine coding)

- [ ] [C] Approach: requirements → entities → relationships → patterns → code → extensibility
- [ ] [C] Parking lot
- [ ] [C] LRU/LFU cache
- [ ] [C] Rate limiter
- [ ] [C] Notification service
- [ ] [C] In-memory pub/sub
- [ ] [C] Seat-locking booking (BookMyShow-style)
- [ ] [E] Elevator
- [ ] [E] Splitwise
- [ ] [E] File system
- [ ] [E] Logger framework
- [ ] [E] Vending machine
- [ ] [E] Task scheduler
- [ ] [E] Chess / tic-tac-toe
- [ ] [E] Library management

## T15. Node.js, NestJS and Next.js internals

- [ ] [C] Node: event loop phases, libuv, microtasks vs macrotasks, blocking the loop
- [ ] [C] Node: streams and backpressure, worker threads, cluster
- [ ] [C] Node: memory and GC, leak hunting, profiling
- [ ] [E] Advanced TypeScript types useful in backend design
- [ ] [C] NestJS: modules, DI and provider scopes, lifecycle
- [ ] [C] NestJS: guards/interceptors/pipes/filters, request-scoped provider cost, microservice transports, testing
- [ ] [E] Next.js: rendering models (SSR/SSG/ISR/RSC), caching layers, data fetching trade-offs, auth patterns

## T16. Data processing and analytics (all extended, light)

- [ ] [E] Batch vs stream; rollups and pre-aggregation
- [ ] [E] OLAP basics; Lambda vs Kappa overview; time-series considerations

## T17. System design case studies (HLD)

Core (12):

- [ ] [C] URL shortener
- [ ] [C] Rate limiter
- [ ] [C] Notification system
- [ ] [C] Distributed cache
- [ ] [C] Key-value store
- [ ] [C] News feed
- [ ] [C] Chat/messaging
- [ ] [C] Ticket booking with seat locking
- [ ] [C] Payment/wallet (idempotency, double-entry)
- [ ] [C] Web crawler
- [ ] [C] Typeahead/autocomplete
- [ ] [C] File storage (Drive/Dropbox-style)

Extended:

- [ ] [E] Unique ID generator
- [ ] [E] E-commerce checkout + inventory
- [ ] [E] Flash sale
- [ ] [E] Video streaming
- [ ] [E] Ride matching / proximity service
- [ ] [E] Metrics and log aggregation
- [ ] [E] Distributed job scheduler
- [ ] [E] Distributed message queue
- [ ] [E] Collaborative editor (OT/CRDT)
- [ ] [E] Leaderboard
- [ ] [E] API gateway
- [ ] [E] Feature-flag service
- [ ] [E] Search engine basics
- [ ] [E] Food delivery
- [ ] [E] Hotel booking

## T18. Scenario bank ("What will you do if...")

- [ ] [C] All seed scenarios in LEARNING_APP_PLAN.md §9 (databases, caching, messaging, reliability, API, security, real-time, scale and cost). They are written per topic as they come up, then aggregated here.
- [ ] [E] Extra cross-topic scenarios

## T19. Interview playbook (all core)

- [ ] [C] Running a 45-minute design interview; clarifying questions; estimation habits; trade-off language; whiteboarding; handling "what if it fails?"
- [ ] [C] Mistakes that cost offers; level expectations (2 YOE vs senior); answering when you don't know
- [ ] [C] Presenting a project (NotifyX first): story, trade-offs, numbers actually measured, no inflated claims
- [ ] [C] Mock interview scripts and self-evaluation rubrics; behavioral questions for backend engineers

## T20. Applied projects companion (optional)

- [ ] NotifyX: milestones → Handbook topics (§12 table), concept index
- [ ] One page per future project

## T21. AI/LLM systems design (all extended, light; after Core)

- [ ] [E] Architecture of LLM-backed apps: request flow, streaming (SSE)
- [ ] [E] RAG basics: embeddings, vector search, chunking
- [ ] [E] Caching, rate limits and cost control; evaluation and observability; reliability; safe tool-calling

## T22. Open learnings (system design topics outside T00-T21)

Home for system design and backend learnings from projects that fit no other track (added 2026-11-15).
Items are added by the `ingest-learnings` skill with approval. Pages live in `content/open/`. Related
items can be promoted to a track of their own later. DSA and non-system-design topics do not go here.

_No items yet._

## Out of scope

Data structures and algorithms (LeetCode-style practice) are tracked separately (§4.4), as is anything
that is not system design or backend engineering. The `ingest-learnings` skill skips such notes.
