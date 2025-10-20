<!-- Copilot / AI agent guidance for the elecromart monorepo -->

# Quick guide for AI coding agents

This file captures project-specific conventions, architecture and developer workflows so an automated coding agent can be productive immediately.

Keep responses short and actionable. When you modify code, prefer small, isolated changes and run the project's dev task before claiming completion.

Key facts

- Monorepo managed by Turborepo. Root scripts: `pnpm exec turbo dev` and `pnpm exec turbo build` (see `package.json`).
- Server app is at `apps/server` (Express, TypeScript, tsx for dev). Dev start: `pnpm --filter server dev` which runs `tsx watch ./app.ts` (see `apps/server/package.json`).
- Database package is `packages/database` and exposes `db` from `packages/database/client.ts` (Prisma client generated under `packages/database/generated/prisma`).

Architecture & boundaries

- web/: Next.js frontend. Keep UI code in `web/app` and shared UI in `ui/src`.
- apps/server: stateless API server. Uses Express and mounts API routes under the configured BASE_API_PATH (default `/api`) in `apps/server/configs/appConfig.ts`.
- packages/database: Prisma client and schema. Server code should interact via `db` exported from `packages/database` (do not instantiate PrismaClient elsewhere).

Patterns & conventions to follow

- Responses: Use `AppResponse` (see `apps/server/utils/appResponse.ts`) to send JSON. Prefer the same shape { message, success, data, error, errors, errorCode }.
- Errors: Throw or rethrow `AppError` (see `apps/server/utils/appError.ts`). The global `errorHandler` maps Prisma errors, Zod errors and AppError to consistent responses (`apps/server/middleware/errorHandler.ts`).
- Validation: Use Zod schemas under `apps/server/validation` (e.g., `loginSchema`, `registerSchema`) and call `.parse(req.body)` in controllers. Controllers are wrapped with `asyncHandler` to forward errors to `errorHandler`.
- Routing: API routes are grouped by version in `apps/server/routes/index.ts` (v1) and then feature routers like `auth.routes.ts`.
- Logging: Use existing logging middleware in `apps/server/middleware/logger.ts`. Requests gain `req.reqId` via `addRequestId` and logs are written to `apps/server/logs`.

Developer workflows (commands you can run)

- Install & run the monorepo (pnpm is required):
  - Install: `pnpm install` at repo root.
  - Dev (all apps): `pnpm dev` (root script runs `turbo run dev`).
  - Dev server only: `pnpm --filter server dev` (runs `tsx watch ./app.ts`).
  - Build all: `pnpm build` (runs `turbo run build`).

Runtime and env

- Configs read from environment using `getEnv` utility. Important keys: `PORT`, `BASE_API_PATH`, `CLIENT_ORIGIN`, `SERVER_ORIGIN` (see `apps/server/configs/appConfig.ts`). Default BASE_API_PATH is `/api`.
- Prisma client logs queries in development via `packages/database/client.ts`.

Integration points & gotchas

- Database: migrations live under `packages/database/prisma/migrations`. The generated Prisma client is committed under `packages/database/generated/prisma` so local workflows don't require re-generation in many cases. Still, if changing `schema.prisma` you must run Prisma migrate/generate locally.
- CORS: Origins validated against `appConfig.CLIENT_ORIGIN`, `appConfig.SERVER_ORIGIN`, and `NEXTAUTH_URL`/`FRONTEND_URL` environment variables in `apps/server/configs/cors.ts` — tests and local dev often require setting `CLIENT_ORIGIN` to your frontend origin.
- Request body parsing: Server uses `express.json()` and `express.urlencoded()`; controllers expect validated, parsed data via Zod.

What to change and how to verify

- When adding endpoints: add route under `apps/server/routes` (v1), implement controller in `apps/server/controllers`, validate with Zod, throw `AppError` for expected failures and use `AppResponse` for successful replies.
- Run `pnpm --filter server dev` and hit the endpoint (curl/postman). Check logs under `apps/server/logs` and console output.
- For DB changes: update `packages/database/prisma/schema.prisma`, create a migration, run `prisma migrate dev` locally, and ensure generated client is up-to-date.

Examples (copy/paste friendly)

- Mounting a new route:
  - Add `apps/server/routes/todo.routes.ts` exporting a Router, then register it in `apps/server/routes/index.ts` as `v1Router.use('/todo', todoRouter)`.
- Typical controller pattern:
  - Validate: `const payload = schema.parse(req.body)`
  - DB: `const item = await db.model.create({ data: payload })`
  - Respond: `new AppResponse({ res, message: 'Created', data: item, statusCode: 201 })`

Notes for agents

- Prefer small PRs that update one feature/file at a time. Include tests or a curl example in the PR description.
- Preserve existing error codes and response shapes — many clients expect them.
- Do not commit secrets or edit `.env` files; reference environment variables through `getEnv`.

If anything here is unclear or you need more examples (e.g., DB migration commands or Next.js run steps), ask and I'll expand specific sections.
