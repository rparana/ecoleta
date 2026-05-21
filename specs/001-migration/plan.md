# Implementation Plan: Waste Collection Point Management Migration

**Branch**: `002-modernize-migration-spec` | **Date**: 2026-05-21 | **Spec**: [specs/001-migration/spec.md](spec.md)

**Input**: Feature specification from `/specs/001-migration/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Migrate the legacy ecoleta system to a modern Clean Architecture using Node.js/TS, Prisma (SQLite), and Zod. The focus is on strict decoupling using Repository and Adapter patterns, multi-stage Dockerization for production, and rigorous Given-When-Then testing.

## Technical Context

**Language/Version**: Node.js 20+ with TypeScript 5.x (Strict Mode)

**Primary Dependencies**: Express.js, Prisma, Zod

**Storage**: SQLite (via Prisma)

**Testing**: Jest + Supertest (Given-When-Then structure)

**Target Platform**: Docker (Multi-stage / Alpine)

**Project Type**: Web Service / API

**Performance Goals**: <500ms for all read operations.

**Constraints**: pnpm only, mandatory Dependency Inversion, no leakage of Prisma/Express into Domain.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] Node.js & Strict TypeScript: Mandatory for all new code.
- [x] pnpm Package Manager: Only package manager allowed.
- [x] Prisma & SQLite: Core data persistence strategy.
- [x] Clean Architecture & Dependency Inversion: Use Cases decoupled from infrastructure.
- [x] Comprehensive Validation: Zod schemas for all entry points.
- [x] Adapter Pattern: External dependencies encapsulated.
- [x] Given-When-Then Testing: Mandatory pattern for all tests.
- [x] Dockerization: Multi-stage production-ready Dockerfile.

## Project Structure

```text
src/
├── domain/              # Entities and Business Rules (Strictly Decoupled)
│   ├── entities/        # Item, Point
│   └── repositories/    # IItemsRepository, IPointsRepository (Interfaces)
├── use-cases/           # Application Logic
│   ├── list-items/      # ListItemsUseCase
│   ├── create-point/    # CreatePointUseCase
│   └── get-point/       # GetPointDetailsUseCase
├── infrastructure/      # Concrete Implementations
│   ├── database/        # PrismaPointsRepository, PrismaItemsRepository
│   ├── http/            # Express Adapters (Controllers, Server, Routes)
│   └── config/          # Environment configuration
└── validation/          # Zod schemas (ZodPointsValidator)
```

**Structure Decision**: Clean Architecture with explicit layer separation and interface-driven decoupling.

## Testing Strategy: Given-When-Then

All tests (Unit and Integration) must follow the Gherkin structure:

- **Given**: Setup the test context (e.g., seeding the database, mocking dependencies).
- **When**: Execute the action being tested (e.g., calling a Use Case method, sending an HTTP request).
- **Then**: Assert the expected outcome (e.g., verifying database state, checking response status and body).

Example for Integration Test:
```typescript
it("should return a list of points when filters match", async () => {
  // Given: Registered points in Curitiba for Baterias
  // When: User searches for points in Curitiba/PR with item Baterias
  // Then: System returns a list of points matching these criteria
});
```

## Multi-stage Dockerfile Setup

- **Stage 1: Base**: Install pnpm and dependencies.
- **Stage 2: Build**: Compile TypeScript to JavaScript, run Prisma generate.
- **Stage 3: Release**: Copy only necessary files (`dist`, `node_modules`, `prisma`, `package.json`) to a slim Alpine image. Run as a non-root user.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A | No violations detected. | N/A |
