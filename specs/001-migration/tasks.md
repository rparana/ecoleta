---
description: "Task list for Waste Collection Point Management Migration feature"
---

# Tasks: Waste Collection Point Management Migration

**Input**: Design documents from `/specs/001-migration/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/api.md

## Organization

Tasks are grouped by User Story to enable independent implementation and testing.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization, Clean Architecture structure, tooling, and Dockerization.

- [x] T001 Initialize Node.js project and configure strict TypeScript in `tsconfig.json`.
- [x] T002 Install core dependencies (`express`, `prisma`, `zod`) via pnpm.
- [x] T003 Install development dependencies (`typescript`, `@types/node`, `@types/express`, `jest`, `ts-jest`, `supertest`) via pnpm.
- [x] T004 Create Clean Architecture folder structure (`src/domain/entities`, `src/domain/repositories`, `src/use-cases`, `src/infrastructure/http`, `src/infrastructure/database`, `src/infrastructure/config`, `src/validation`).
- [x] T005 [P] Configure ESLint and Prettier.
- [x] T006 [P] Create multi-stage production `Dockerfile` (Base, Build, Release) and `.dockerignore`.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Database schema, Domain Interfaces, and core server routing.
**⚠️ CRITICAL**: Must complete before user story implementation.

- [x] T007 Initialize Prisma with SQLite and define `Point`, `Item`, and `PointItem` models in `prisma/schema.prisma`.
- [x] T008 Run initial Prisma migration and create database seed script in `prisma/seed.ts`.
- [x] T009 [P] Define `IItemsRepository` and `IPointsRepository` interfaces in `src/domain/repositories/`.
- [x] T010 [P] Implement Prisma Client singleton and concrete `PrismaItemsRepository` and `PrismaPointsRepository` in `src/infrastructure/database/`.
- [x] T011 [P] Setup base Express server, routes file, and error handling middleware in `src/infrastructure/http/`.
- [x] T012 [P] Implement environment configuration service in `src/infrastructure/config/config.ts` (including `resolveImageUrl`).

**Checkpoint**: Foundation ready - Interfaces defined, Database schema exists, ORM connected, Dockerfile ready, and basic server runs.

---

## Phase 3: User Story 1 - Find Collection Points (Priority: P1) 🎯 MVP

**Goal**: Allow citizens to list available items and filter points by city, UF, and specific items.
**Independent Test**: Retrieve the list of items via `GET /items`. Filter points via `GET /points?city=X&uf=Y&items=1,2`.

### Tests for User Story 1 (Requested via Jest setup)
> **NOTE: Write these tests FIRST, ensure they FAIL before implementation. All tests MUST follow the Given-When-Then pattern.**
- [x] T013 [P] [US1] Integration test for `GET /items` (Given-When-Then) in `tests/integration/items.test.ts`.
- [x] T014 [P] [US1] Integration test for point filtering `GET /points` (Given-When-Then) in `tests/integration/points.test.ts`.
- [x] T015 [P] [US1] Unit test for `ListItemsUseCase` and `FilterPointsUseCase` (mocking repositories, Given-When-Then).

### Implementation for User Story 1
- [x] T016 [P] [US1] Create `Item` and `Point` entity definitions in `src/domain/entities/`.
- [x] T017 [P] [US1] Implement Zod validation schema for point search query in `src/validation/pointSchemas.ts`.
- [x] T018 [US1] Implement `ListItemsUseCase` in `src/use-cases/list-items/ListItemsUseCase.ts` (injecting `IItemsRepository`).
- [x] T019 [US1] Implement `FilterPointsUseCase` in `src/use-cases/list-points/FilterPointsUseCase.ts` (injecting `IPointsRepository`).
- [x] T020 [P] [US1] Implement `ItemsController` in `src/infrastructure/http/controllers/ItemsController.ts`.
- [x] T021 [P] [US1] Implement `PointsController` (`index` method) in `src/infrastructure/http/controllers/PointsController.ts`.
- [x] T022 [US1] Wire dependencies and register `GET /items` and `GET /points` routes in `src/infrastructure/http/routes.ts`.

**Checkpoint**: `GET /items` and `GET /points` endpoints are functional, fully decoupled, and tested via Given-When-Then.

---

## Phase 4: User Story 2 - Register Collection Point (Priority: P2)

**Goal**: Allow recycling organizations to register their collection points with accepted items.
**Independent Test**: Submit a `POST /points` request and verify persistence and transactional safety.

### Tests for User Story 2
> **NOTE: Write these tests FIRST, ensure they FAIL before implementation. All tests MUST follow the Given-When-Then pattern.**
- [x] T023 [P] [US2] Integration test for successful point registration and validation failures (Given-When-Then) in `tests/integration/points.test.ts`.
- [x] T024 [P] [US2] Unit test for `CreatePointUseCase` (Given-When-Then).

### Implementation for User Story 2
- [x] T025 [P] [US2] Implement Zod validation schema for point creation body in `src/validation/pointSchemas.ts`.
- [x] T026 [US2] Implement `CreatePointUseCase` in `src/use-cases/create-point/CreatePointUseCase.ts` (injecting `IPointsRepository`).
- [x] T027 [US2] Update `PrismaPointsRepository` to handle transactional point creation (if not fully covered in T010).
- [x] T028 [US2] Implement `PointsController` (`create` method) in `src/infrastructure/http/controllers/PointsController.ts`.
- [x] T029 [US2] Wire dependencies and register `POST /points` route with Zod validation adapter in `src/infrastructure/http/routes.ts`.

**Checkpoint**: Collection points can be successfully registered into the database via decoupled Use Cases.

---

## Phase 5: User Story 3 - View Point Details (Priority: P3)

**Goal**: Allow users to see detailed information of a specific collection point, including accepted items.
**Independent Test**: Access `GET /points/:id` and verify response structure and 404 handling.

### Tests for User Story 3
> **NOTE: Write these tests FIRST, ensure they FAIL before implementation. All tests MUST follow the Given-When-Then pattern.**
- [x] T030 [P] [US3] Integration test for fetching an existing and non-existent point by ID (Given-When-Then) in `tests/integration/points.test.ts`.
- [x] T031 [P] [US3] Unit test for `GetPointDetailsUseCase` (Given-When-Then).

### Implementation for User Story 3
- [x] T032 [US3] Implement `GetPointDetailsUseCase` in `src/use-cases/get-point/GetPointDetailsUseCase.ts` (injecting `IPointsRepository`).
- [x] T033 [US3] Implement `PointsController` (`show` method) in `src/infrastructure/http/controllers/PointsController.ts`.
- [x] T034 [US3] Wire dependencies and register `GET /points/:id` route in `src/infrastructure/http/routes.ts`.

**Checkpoint**: Specific point details can be retrieved securely.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Cleanup, documentation, and optimization.

- [x] T035 Verify all internal Use Case dependencies point only to interfaces (`src/domain/repositories`), not concrete Prisma implementations.
- [ ] T036 Ensure all API routes are appropriately documented or integrated with Swagger/OpenAPI (if required by team).

---

## Dependencies & Execution Order

### Phase Dependencies
- **Phase 1 (Setup)**: Must run first.
- **Phase 2 (Foundational)**: Depends on Setup. Blocks all User Stories.
- **Phase 3 (US1)**: Depends on Foundational.
- **Phase 4 (US2)**: Depends on Foundational. Independent of US1 conceptually.
- **Phase 5 (US3)**: Depends on Foundational.

### Parallel Opportunities (Examples)
- In Phase 2: Defining Domain Interfaces (`T009`), setting up Express (`T011`), and creating the config service (`T012`) can be done simultaneously.
- In Phase 3: Entity definition (`T016`) and Zod validation creation (`T017`) can run in parallel.
- Test files can be scaffolded in parallel for TDD across all User Stories.

## Implementation Strategy
1. **MVP (US1)**: First, establish the core interface-driven architecture, database, and ability to list/search existing data. Run seeds to populate test data.
2. **Incremental Delivery (US2 & US3)**: Introduce the ability to write to the database (US2), ensuring transactions are handled correctly behind the repository interface, followed by specific detailed reads (US3).
