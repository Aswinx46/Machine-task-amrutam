# Scaling Guide — Doctor Slot Appointment System

This document outlines how to scale a doctor slot appointment platform that uses **MongoDB** for persistence, **Redis** (for OTPs, locks, rate limiting), and **Docker** for containerization. It covers performance, availability, cost-efficiency, and operational readiness.

---

## 1) High-Level Architecture

* **API Layer**: Stateless Node.js/Express services in containers (Docker). Horizontal scale behind a load balancer (NGINX/ALB/Ingress).
* **Database**: MongoDB replica set (HA) → shard as needed for read/write scale.
* **Cache & Co-ordination**: Redis for:

  * OTP storage (TTL-based)
  * Slot locking (`SET slot:<id> <payload> NX PX <ttl-ms>`)
  * Rate limiting and short-lived caches (doctor availability, feature flags)
* **Async Processing**: Queue with BullMQ (Redis) or Kafka/RabbitMQ for email/SMS, notifications, invoice generation.
* **Observability**: Centralized logging, metrics, tracing.
* **CDN**: For static assets and downloadable content.

```
Client → Load Balancer → API Pods/Containers → MongoDB (primary/secondaries)
                                 ↘ Redis (Cluster/Sentinel) ↔ BullMQ Workers
```

---

## 2) Scaling the API Layer

* **Stateless**: Keep all user/session state in JWT/Redis; containers must be disposable.
* **Horizontal autoscaling**: HPA (Kubernetes) or auto-scaling groups (ECS/EC2) based on CPU, p95 latency, RPS, queue depth.
* **Node.js runtime**: Enable `NODE_OPTIONS=--max-old-space-size=<MB>` as needed; use cluster mode only if you *don’t* run multiple containers per node.
* **Connection pooling**: Use a single MongoDB client per process; tune `maxPoolSize` (e.g., 50–200). Reuse Redis clients.

---

## 3) MongoDB Data Model & Performance

* **Collections**: `users`, `doctors`, `slots`, `bookings`, `otps` (optional if not purely in Redis), `audit_logs`.
* **Indexes**:

  * `bookings`: `{ userId: 1, date: -1 }`, `{ doctorId: 1, startTime: 1 }`, `{ status: 1 }`
  * `slots`: `{ doctorId: 1, date: 1, startTime: 1, status: 1 }` (compound, selective prefix)
  * TTL index for soft-deleted/expired temp docs if any
* **Query design**: Always paginate, never unbounded scans. Prefer projections. Avoid `$regex` on large collections unless indexed.
* **Sharding strategy** (when needed):

  * Likely shard **bookings** by `doctorId` or `{ doctorId, date }` to localize writes; or by `userId` for user-centric reads.
  * Use a **monotonically increasing** field (e.g., `date` bucketed) to avoid hot shards; consider hashed sharding on `doctorId`.
* **Transactions**: Keep them short (slot → booking confirmation). Prefer idempotent single-document updates where possible.

---

## 4) Redis Usage Patterns (Critical Path)

### OTP Storage

* Key: `otp:user:<userId>` → value: JSON `{ code, attempts, issuedAt }`
* TTL: 2–10 minutes.
* Rate limit attempts with a counter key per user/IP (e.g., `otp:attempts:<userId>` with TTL).

### Slot Locking

* Acquire lock before confirming a booking:

  * `SET lock:slot:<slotId> <requestId> NX PX 300000`  (5 minutes)
  * If success → proceed; else show "slot held by another user".
* Release lock with Lua (check-and-del): only the holder releases it:

  ```
  -- KEYS[1]=lock key, ARGV[1]=requestId
  if redis.call('get', KEYS[1]) == ARGV[1] then
    return redis.call('del', KEYS[1])
  else
    return 0
  end
  ```
* Idempotency: Use `requestId` (UUID) per booking attempt; store `booking:attempt:<requestId>` for 24h to ignore duplicates.

### Rate Limiting

* Token bucket or fixed window on endpoints: `rl:<route>:<userId or ip>` with TTL.

### Redis Topology

* Start with **Redis Sentinel** for HA (3 sentinels, 1 master, 1+ replicas). Scale to **Redis Cluster** when memory or throughput grows.
* Avoid oversized values (>1MB). Use appropriate eviction (`volatile-ttl` for caches). Keep OTP/locks in a dedicated DB or logical prefix.

---

## 5) Booking Flow for Scale & Correctness

1. **Select slot** → check slot status in Mongo & Redis cache.
2. **Acquire lock** (`SET NX PX` \~5 min) with `requestId`.
3. **Send OTP** (enqueue SMS/Email job). Don’t block the HTTP request; return `attemptId`.
4. **Verify OTP** → if valid & lock still held, confirm booking:

   * MongoDB transaction (optional): set slot `reserved→booked`, create `booking` document.
   * Emit domain event `booking.confirmed` to queue for notifications.
5. **Timeout**: If user does not verify within TTL, worker expires the lock and resets the slot to `active`.

**Reschedule**

* Within business rules (e.g., >24h before `startTime`).
* Mark old booking `rescheduled` or `cancelled`, free slot.
* Return doctor’s available slots (paginated). New booking proceeds through normal OTP/lock flow.

---

## 6) Consistency, Idempotency & Concurrency

* **Idempotency keys** for POST/PATCH that mutate bookings/slots.
* **Outbox pattern** for reliable event publication (Mongo outbox table processed by a worker).
* **Optimistic concurrency**: Use `version`/`updatedAt` checks where concurrent updates are possible.
* **Sagas** for multi-step flows (reserve slot → take payment → confirm). On failure, compensate (release slot/refund).

---

## 7) Availability & Disaster Recovery

* **MongoDB**: Replica set across AZs; backups (daily snapshots + point-in-time). Regular restore drills.
* **Redis**: Sentinel/Cluster with persistence (AOF every second or RDB snapshots). Cross-AZ replicas.
* **Stateless API**: Blue/Green or Rolling deployments; health checks; readiness/liveness probes.
* **DR Plan**: Periodic backups to a separate region/bucket; RTO/RPO objectives documented (e.g., RTO 30 min, RPO 5 min).

---

## 8) Caching Strategy

* **Read-through** cache for doctor availability windows (invalidate on slot change).
* **Short TTL** (e.g., 15–60s) for frequently-changing lists.
* **Per-user cache** of last viewed doctor/filters to improve UX.

---

## 9) Pagination & Query Patterns

* **Cursor-based pagination** for large datasets (by `startTime` + `_id`). For simple pages, use skip/limit with guardrails (max limit 100).
* Always return `{ items, pageInfo: { page, limit, totalPages, totalItems } }`.

---

## 10) Security & Compliance

* **Secrets** in a manager (Vault/SSM/Secrets Manager). Rotate OTP signing keys.
* **TLS everywhere** (client→LB→service).
* **Input validation** (Zod/Joi) for all APIs; WAF for basic OWASP protection.
* **Audit logging** for booking status changes and admin actions.
* **PII** minimization in logs; encrypt at rest (Mongo, Redis snapshots, backups).

---

## 11) Observability

* **Logging**: JSON logs with requestId, userId, bookingId, slotId. Centralize in ELK/OpenSearch.
* **Metrics** (Prometheus):

  * `booking_attempts_total`, `booking_success_total`, `booking_lock_conflicts_total`
  * Redis/Mongo latency, error rates, lock acquisition time, OTP verification success rate
* **Tracing**: OpenTelemetry for end-to-end traces (HTTP + Redis + Mongo).
* **Alerts**: p95 latency, 5xx rate, lock contention spikes, OTP delivery failures, queue backlog.

---

## 12) Deployment & Runtime

* **Docker**: Multi-stage builds; small base images (Alpine/Distroless). Health endpoints.
* **Kubernetes**: Requests/limits set; PodDisruptionBudgets; HPA on CPU+p95; Pod anti-affinity across AZs.
* **Blue/Green**: Use canary or progressive delivery (Argo Rollouts/Flagger) for safe releases.

---

## 13) Cost Controls

* Scale down workers during off-peak; right-size instance types.
* Use Redis Cluster with appropriate shard count; avoid over-provisioning memory.
* Prefer TTL caches over large warm caches when hit ratio is not high.

---

## 14) Testing, Load & Chaos

* **Load tests** (k6/Locust): ramp to 2–3× peak RPS. Include OTP, lock contention scenarios.
* **Soak tests**: 8–24h steady traffic to catch leaks.
* **Chaos**: Kill Redis primary, Mongo primary failover, network partitions; verify auto-recovery.

---

## 15) Playbooks (Runbooks)

* **High lock contention**: Inspect `lock:slot:*` keys, measure TTLs, increase backoff, improve slot partitioning.
* **OTP delivery failures**: Switch provider; backlog drain job; fall back to email if SMS down.
* **Mongo slow queries**: Analyze with `explain()`, add missing indexes, reduce projections.
* **Redis memory pressure**: Eviction policy, move large keys, add shard/replica.

---

## 16) Example Config Snippets

**Redis Lock Acquire (Node.js)**

```ts
const requestId = crypto.randomUUID();
const ok = await redis.set(`lock:slot:${slotId}`, requestId, { NX: true, PX: 5 * 60_000 });
if (!ok) throw new Error('Slot is held by another user');
```

**Redis Lock Release (Lua)**

```ts
const script = `
if redis.call('get', KEYS[1]) == ARGV[1] then
  return redis.call('del', KEYS[1])
else
  return 0
end`;
await redis.eval(script, { keys: [`lock:slot:${slotId}`], arguments: [requestId] });
```

**MongoDB Index (bookings)**

```js
// Ensure compound index for doctor schedule lookups
 db.bookings.createIndex({ doctorId: 1, startTime: 1, status: 1 });
```

---

## 17) Multi-Region (Advanced)

* **Active/Passive**: Hot standby in secondary region; async replication (Mongo Cluster-to-Cluster sync, Redis replication). DNS failover.
* **Latency routing**: If you need active/active, partition traffic by region and avoid cross-region locks; reconcile asynchronously via events.

---

## 18) Checklist for Go-Live

* [ ] Canary + rollback tested
* [ ] Indexes created and validated with `explain()`
* [ ] Redis HA tested (failover)
* [ ] OTP rate limits in place
* [ ] Idempotency keys enforced on booking APIs
* [ ] Dashboards/alerts configured
* [ ] Backup & restore drill completed

---

**Appendix A — API Contract Tips**

* `POST /bookings`: start booking (returns `attemptId`)
* `POST /bookings/:attemptId/verify-otp`: verify & confirm
* `PATCH /bookings/:id/cancel`
* `PATCH /bookings/:id/reschedule` → returns paginated slots; user then books normally
* `GET /doctors/:id/slots?page=&limit=&date=`

**Appendix B — Environment Separation**

* Dedicated Redis DBs/namespaces per environment. Separate queues.
* Lower TTLs and reduced locks in staging to speed up tests.

---

> Designed for horizontal scale, strong consistency on booking confirmation, and operational simplicity. Iterate with measurements: **instrument first, then optimize.**
