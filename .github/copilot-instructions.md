# Copilot / AI agent guidance for the TryWear monorepo

## Overview

This monorepo uses Turborepo and pnpm for package management. It contains:

- **apps/server**: Express API server (TypeScript)
- **web**: Next.js frontend (TypeScript)
- **packages/database**: Prisma client and schema
- **packages/schema**: Zod Shared Schema
- **packages/ui**: Shared UI components (used by web)

## Key Conventions

- **Monorepo scripts** (run from root):
  - Install: `pnpm install`
  - Dev (all apps): `pnpm dev` (runs `turbo run dev`)
  - Build: `pnpm build` (runs `turbo run build`)
- **Server dev**: `pnpm --filter server dev` (runs `tsx watch ./app.ts`)
- **Database client**: Use `db` from `packages/database/client.ts` (do not instantiate PrismaClient elsewhere)

## Architecture

- **web/**: Next.js app. UI code in `web/app`, shared UI in `ui/src`.
- **apps/server/**: Express API, stateless, routes under `/api` (configurable in `apps/server/configs/appConfig.ts`).
- **packages/database/**: Prisma schema/client. Only interact via exported `db`.

## Patterns & Conventions

- **Responses**: Use `AppResponse` (`apps/server/utils/appResponse.ts`). Shape: `{ message, success, data, error, errors, errorCode }`
- **Errors**: Throw/rethrow `AppError` (`apps/server/utils/appError.ts`). Global handler: `apps/server/middleware/errorHandler.ts`
- **Validation**: Use Zod schemas (see `packages/schema/*.ts`). Controllers use `.parse(req.body)` and are wrapped with `asyncHandler`.
- **Routing**: API routes grouped by version in `apps/server/routes/index.ts`, feature routers in `apps/server/modules/*/*.route.ts`.
- **Logging**: Middleware in `apps/server/middleware/logger.ts`. Logs in `apps/server/logs`.

## Developer Workflow

- Install: `pnpm install`
- Dev (all): `pnpm dev`
- Dev server only: `pnpm --filter server dev`
- Build: `pnpm build`

## Runtime & Environment

- Configs via `getEnv` utility. Keys: `PORT`, `BASE_API_PATH`, `CLIENT_ORIGIN`, `SERVER_ORIGIN` (see `apps/server/configs/appConfig.ts`).
- Prisma logs queries in dev (`packages/database/client.ts`).

## Integration Points & Gotchas

- **Database migrations**: In `packages/database/prisma/migrations`. If you change `schema.prisma`, run Prisma migrate/generate locally.
- **CORS**: Origins validated in `apps/server/configs/cors.ts` (set `CLIENT_ORIGIN` for local dev).
- **Request body parsing**: Uses `express.json()` and `express.urlencoded()`.

## How to Change & Verify

- **Add endpoint**: Add route in `apps/server/modules/[feature]/*.route.ts`, implement controller, validate with Zod, throw `AppError`, respond with `AppResponse`.
- **Test endpoint**: Run `pnpm --filter server dev`, hit endpoint (curl/Postman), check logs in `apps/server/logs`.
- **DB changes**: Edit `packages/database/prisma/schema.prisma`, run migration, ensure generated client is up-to-date.

## Examples

- **Mount new route**:
  - Add `apps/server/modules/todo/todo.route.ts` exporting a Router
  - Register in `apps/server/routes/index.ts`: `v1Router.use('/todo', todoRouter)`
- **Controller pattern**:
  - Validate: `const payload = schema.parse(req.body)`
  - DB: `const item = await db.model.create({ data: payload })`
  - Respond: `new AppResponse({ res, message: 'Created', data: item, statusCode: 201 })`

## Agent Notes

- Prefer small PRs, one feature/file at a time. Include tests or curl example in PR description.
- Preserve error codes/response shapes.
- Never commit secrets or edit `.env` files; always use environment variables via `getEnv`.

If you need more examples (e.g., DB migration commands, Next.js run steps), ask for specifics.
