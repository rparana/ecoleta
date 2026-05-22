# Implementation Plan: Waste Collection Point Management Migration (Finalization & Docs)

**Branch**: `002-modernize-migration-spec` | **Date**: 2026-05-21 | **Spec**: [specs/001-migration/spec.md](spec.md)

**Input**: Feature specification from `/specs/001-migration/spec.md`

**Note**: This plan outlines the finalization of the ecoleta migration, focusing on production readiness and public API documentation.

## Summary

Complete the migration of the legacy ecoleta system by establishing a production-ready containerized environment, implementing a public API documentation endpoint using OpenAPI/Swagger, and formalizing the project's new architecture.

## Technical Context

**Language/Version**: Node.js 20+ with TypeScript 5.x (Strict Mode)

**Primary Dependencies**: Express.js, Prisma, Zod, `swagger-ui-express`, `yamljs`

**Storage**: SQLite (via Prisma)

**Testing**: Jest + Supertest (Given-When-Then structure)

**Target Platform**: Docker (Multi-stage / Alpine)

**Documentation**: OpenAPI 3.0 (YAML) served at `/api-docs`

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] Node.js & Strict TypeScript: Mandatory for all new code.
- [x] pnpm Package Manager: Only package manager allowed.
- [x] Prisma & SQLite: Core data persistence strategy.
- [x] Clean Architecture & Dependency Inversion: Use Cases decoupled from infrastructure via interfaces.
- [x] Comprehensive Validation: Zod schemas for all entry points.
- [x] Adapter Pattern: External dependencies (Express, Prisma, Swagger) encapsulated.
- [x] Given-When-Then Testing: Mandatory pattern for all tests.
- [x] Dockerization: Multi-stage production-ready Dockerfile.

## Project Structure

```text
src/
├── domain/              # Entities and Repository Interfaces
├── use-cases/           # Application Logic (Decoupled)
├── infrastructure/      # Concrete Implementations
│   ├── database/        # Prisma Repositories
│   ├── http/            # Express Adapters (Controllers, Server, Routes)
│   └── docs/            # Swagger/OpenAPI setup
├── validation/          # Zod schemas
└── server.ts            # Entry point
docs/
├── openapi.yaml         # API Contract (OpenAPI 3.0)
└── migration-history.md # Architectural transition log
```

## Finalization Steps

### 1. Production Docker Environment
- **Multi-stage**: `base` (corepack pnpm), `deps` (full install), `build` (prisma gen + tsc), `prod-deps` (pruned), `release` (alpine + non-root user).
- **Security**: Run as `nodejs` user, `NODE_ENV=production`.

### 2. Public API Documentation (/api-docs)
- **Tooling**: `swagger-ui-express` for serving the UI, `yamljs` for parsing the YAML contract.
- **Dynamic Loading**: Load `openapi.yaml` at runtime to ensure the UI stays in sync with the file.
- **Architecture**: Implement as a dedicated documentation adapter in `infrastructure/docs`.

### 3. Migration History & Changelog
- **File**: `docs/migration-history.md`.
- **Content**: Log of architectural shifts (Knex -> Prisma), removed legacy files, and future scaling roadmap.

### 4. Comprehensive README.md
- **Content**: Setup instructions (pnpm), Architecture overview, Docker execution, and BDD testing guide.

### 5. Detailed Pull Request Description
- **Content**: Summary of migration, before/after architectural mapping, and verification results.

## Testing Strategy: Given-When-Then

All tests (Unit and Integration) must follow the Gherkin structure:
- **Given**: Setup state.
- **When**: Trigger action.
- **Then**: Verify outcome.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A | No violations. | N/A |
