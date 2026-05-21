# Implementation Plan: Waste Collection Point Management

**Branch**: `001-point-management-system` | **Date**: 2026-05-21 | **Spec**: [specs/001-point-management-system/spec.md](spec.md)

**Input**: Feature specification from `/specs/001-point-management-system/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Migrate the legacy point and item management logic to a modern stack (Node.js/TS, Prisma, SQLite) following Clean Architecture. This includes implementing item listing, point registration (with transactional item mapping), and filtered point searching.

## Technical Context

**Language/Version**: Node.js 18+ with TypeScript 5.x (Strict Mode)

**Primary Dependencies**: Express.js, Prisma, Zod (for validation)

**Storage**: SQLite (via Prisma)

**Testing**: Jest (Unit & Integration)

**Target Platform**: Node.js Runtime

**Project Type**: Web Service / API

**Performance Goals**: <500ms for item listing, reliable transactions for registrations.

**Constraints**: Must use pnpm, must follow Clean Architecture, must use Prisma for all DB interactions.

**Scale/Scope**: Migration of 2 legacy controllers into a layered architecture.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] Node.js & Strict TypeScript: Migration uses strict TS.
- [x] pnpm Package Manager: pnpm is mandated for all dependencies.
- [x] Prisma & SQLite: Prisma Client with SQLite is the core storage strategy.
- [x] Clean Architecture: Plan structure follows layered separation (Entities, Use Cases, Controllers).
- [x] Comprehensive Validation: Zod schemas planned for all API inputs.

## Project Structure

### Documentation (this feature)

```text
specs/001-point-management-system/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
src/
├── entities/            # Core business models
├── use-cases/           # Application logic
├── controllers/         # Express adapters
├── infrastructure/      # Prisma client, DB setup
└── validation/          # Zod schemas
```

**Structure Decision**: Option 1 (Single project) with Clean Architecture subdirectories.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A | No violations detected. | N/A |
