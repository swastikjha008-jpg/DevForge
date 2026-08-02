# DevForge

Turn a short natural-language prompt into a downloadable starter project.

> "Build a weather app with authentication and Prisma." → a real, runnable
> project — folder structure, source files, config, README, `.env.example` —
> zipped and ready to download.

## Monorepo layout

```
devforge/
├── apps/
│   ├── web/     Next.js frontend (landing page + /generate flow)
│   └── api/     Express backend (AI orchestration, ZIP generation)
├── packages/
│   └── shared/  Types shared between web and api
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

## Getting started

```bash
pnpm install

# apps/api/.env
cp apps/api/.env.example apps/api/.env
# then set GEMINI_API_KEY in apps/api/.env

pnpm dev   # runs both apps/web and apps/api via Turborepo
```

- Web runs on `http://localhost:3000`
- API runs on `http://localhost:5000`

The frontend talks to the backend via `NEXT_PUBLIC_API_URL` (defaults to
`http://localhost:5000` — see `apps/web/src/lib/api.ts`). Set it in
`apps/web/.env.local` if you deploy the backend elsewhere.

## How it works

```
POST /api/generate  { prompt }
       │
       ▼
GenerateController → GenerateService → GeminiProvider (structured JSON)
       │                     │
       │                     ▼
       │              Zod-validated, retried once on malformed output
       │                     │
       │                     ▼
       │              ZipService (in-memory archiver, path-traversal safe)
       │                     │
       ▼                     ▼
{ downloadUrl, projectName } ← stored in an in-memory, TTL-expiring token store
       │
       ▼
GET /downloads/:token.zip → streams the ZIP, sets Content-Disposition
```

Every error path — a network failure, a malformed AI response, an expired
download link — returns a clean `{ success: false, error: { code, message } }`
body. No stack traces, no provider errors, no raw model output ever reach
the client; see `apps/api/src/middleware/error.middleware.ts`.

## Frontend integration note

The only frontend change made while wiring this up was to
`apps/web/src/components/generate/GenerateFlow.tsx`: the demo's fake
`setTimeout` sequence and placeholder text-file download were replaced with
a real call to `POST /api/generate` and a real download link, plus a
graceful error state (reusing the existing card/button styling — no new
visual design was introduced). No other component, page, style, or
animation was touched.

## Tech stack

**Frontend:** Next.js, React 19, Tailwind, Motion
**Backend:** Express, TypeScript (strict), Zod, Google Gemini API, Archiver,
Pino, Helmet, Compression, CORS, express-rate-limit, dotenv, uuid
**Tooling:** Turborepo, pnpm workspaces
