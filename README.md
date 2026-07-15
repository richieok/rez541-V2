# rez541-V2

Booking site for Residence 541 (SvelteKit frontend + Express/MongoDB backend, deployed behind Traefik on EC2).

## Logging

Both Node services log structured JSON to stdout with [pino](https://getpino.io). Docker owns everything after that: the dev/local stacks use the `json-file` driver with rotation (10 MB × 3 files per container), and production ships each container to its own CloudWatch log group (`/rez541/backend`, `/rez541/frontend`, `/rez541/traefik`, 30-day retention — see `cfn-templates/rez541-traefik.yml`).

### Where things live

- `backend/logger.js` — shared backend logger. Pretty-printed output when `NODE_ENV` isn't `production`, JSON otherwise.
- `frontend/src/lib/server/logger.js` — frontend server-side logger (server-only module; never bundled to the browser).
- `frontend/src/hooks.server.js` — logs every SSR request (method, route, status, duration, request id) and unhandled server errors via `handleError`.
- Backend request logging is `pino-http` in `backend/app.js`; per-request loggers are available in middleware as `req.log`. `/api/health` is not logged.

### Levels

| Level | Use for |
|-------|---------|
| `error` | Something failed and needs attention (failed email send, DB errors, 5xx) |
| `warn` | Degraded but recovering (Mongo retry, 4xx responses, exceeded email attempts) |
| `info` | Business events (booking verified/confirmed, email sent) and request logs |
| `debug` | Diagnostic detail (signed-URL cache hits/misses, page-load params) |

`LOG_LEVEL` controls verbosity per service (set in the compose files; defaults: `debug` in dev/local, `info` in prod).

### Request correlation

The frontend generates an `x-request-id` per incoming request (or reuses one from upstream) and forwards it to the backend on every `fetch` made through SvelteKit's load/action `fetch`. The backend reuses that id in its request logs, so one page load can be traced across both services with a single id.

### Rules

- **Never log PII, verification tokens, or signed URLs.** Both loggers redact common field names (`token`, `email`, `phone`, `signedUrl`, …) as a safety net, but don't rely on it — don't pass booking objects or tokens to the logger in the first place.
- Log objects with fields, not interpolated strings: `logger.info({ roomId }, 'Booking saved')`.
- Pass errors as `{ err }` so pino serializes the stack: `logger.error({ err: error }, 'Failed to …')`.
- Seed scripts (`seedRooms.js`, `seedSpa.js`) intentionally keep plain `console.log` — they're interactive CLI tools.
