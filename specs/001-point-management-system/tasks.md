---
description: "Task list for Waste Collection Point Management feature"
---

# Tasks: Waste Collection Point Management

**Input**: Design documents from `/specs/001-point-management-system/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/api.md

## Organization

Tasks are grouped by User Story to enable independent implementation and testing.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization, Clean Architecture structure, and tooling.

- [x] T001 Initialize Node.js project and configure strict TypeScript in `tsconfig.json`.
- [x] T002 Install core dependencies (`express`, `prisma`, `zod`) via pnpm.
- [x] T003 Install development dependencies (`typescript`, `@types/node`, `@types/express`, `jest`, `ts-jest`) via pnpm.
- [x] T004 Create Clean Architecture folder structure (`src/entities`, `src/use-cases`, `src/controllers`, `src/infrastructure`, `src/validation`).

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Database schema, ORM setup, and core server routing.
**⚠️ CRITICAL**: Must complete before user story implementation.

- [x] T005 Initialize Prisma with SQLite (`pnpm dlx prisma init --datasource-provider sqlite`).
- [x] T006 Define `Point`, `Item`, and `PointItem` models in `prisma/schema.prisma` per `data-model.md`.
- [x] T007 Run initial Prisma migration to create the database schema.
- [x] T008 [P] Implement Prisma Client singleton in `src/infrastructure/database.ts`.
- [x] T009 [P] Setup base Express server and error handling middleware in `src/server.ts`.
- [x] T010 [P] Implement configuration service for environment variables (e.g., base URL for images) in `src/infrastructure/config.ts`.
- [x] T011 Create database seed script for `Item` entities in `prisma/seed.ts` to populate the `uploads` data.

**Checkpoint**: Foundation ready - Database schema exists, ORM connected, and basic server runs.

---

## Phase 3: User Story 1 - Find Collection Points (Priority: P1) 🎯 MVP

**Goal**: Allow citizens to list available items and filter points by city, UF, and specific items.
**Independent Test**: Retrieve the list of items via `GET /items`. Filter points via `GET /points?city=X&uf=Y&items=1,2`.

### Tests for User Story 1 (Requested via Jest setup)
- [x] T012 [P] [US1] Integration test for `GET /items` in `tests/integration/items.test.ts`.
- [x] T013 [P] [US1] Integration test for point filtering `GET /points` in `tests/integration/points.test.ts`.

### Implementation for User Story 1
- [x] T014 [P] [US1] Create `Item` entity definition in `src/entities/Item.ts`.
- [x] T015 [P] [US1] Create `Point` entity definition in `src/entities/Point.ts`.
- [x] T016 [P] [US1] Implement Zod validation schema for point search query in `src/validation/pointSchemas.ts`.
- [x] T017 [US1] Implement `ListItemsUseCase` in `src/use-cases/ListItemsUseCase.ts` (satisfies FR-001, FR-006).
- [x] T018 [US1] Implement `FilterPointsUseCase` in `src/use-cases/FilterPointsUseCase.ts` (satisfies FR-004).
- [x] T019 [P] [US1] Implement `ItemsController` (`index` method) in `src/controllers/ItemsController.ts`.
- [x] T020 [P] [US1] Implement `PointsController` (`index` method) in `src/controllers/PointsController.ts`.
- [x] T021 [US1] Register `GET /items` and `GET /points` routes in `src/routes.ts`.

**Checkpoint**: `GET /items` and `GET /points` endpoints are functional.

---

## Phase 4: User Story 2 - Register Collection Point (Priority: P2)

**Goal**: Allow recycling organizations to register their collection points with accepted items.
**Independent Test**: Submit a `POST /points` request and verify persistence and transactional safety.

### Tests for User Story 2
- [x] T022 [P] [US2] Integration test for successful point registration in `tests/integration/points.test.ts`.
- [x] T023 [P] [US2] Integration test for transaction rollback on invalid point registration in `tests/integration/points.test.ts`.

### Implementation for User Story 2
- [x] T024 [P] [US2] Implement Zod validation schema for point creation body in `src/validation/pointSchemas.ts`.
- [x] T025 [US2] Implement `CreatePointUseCase` handling `prisma.$transaction` in `src/use-cases/CreatePointUseCase.ts` (satisfies FR-002, FR-003).
- [x] T026 [US2] Implement `PointsController` (`create` method) in `src/controllers/PointsController.ts`.
- [x] T027 [US2] Register `POST /points` route with Zod middleware validation in `src/routes.ts`.

**Checkpoint**: Collection points can be successfully registered into the database.

---

## Phase 5: User Story 3 - View Point Details (Priority: P3)

**Goal**: Allow users to see detailed information of a specific collection point, including accepted items.
**Independent Test**: Access `GET /points/:id` and verify response structure and 404 handling.

### Tests for User Story 3
- [x] T028 [P] [US3] Integration test for fetching an existing point by ID in `tests/integration/points.test.ts`.
- [x] T029 [P] [US3] Integration test for fetching a non-existent point returning 404 in `tests/integration/points.test.ts`.

### Implementation for User Story 3
- [x] T030 [US3] Implement `GetPointDetailsUseCase` in `src/use-cases/GetPointDetailsUseCase.ts` (satisfies FR-005).
- [x] T031 [US3] Implement `PointsController` (`show` method) in `src/controllers/PointsController.ts`.
- [x] T032 [US3] Register `GET /points/:id` route in `src/routes.ts`.

**Checkpoint**: Specific point details can be retrieved.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Cleanup, documentation, and optimization.

- [x] T033 Configure ESLint and Prettier.
- [x] T034 [P] Centralize image URL resolution logic (from FR-006) to ensure consistent formatting across controllers.
- [ ] T035 Ensure all API routes are appropriately documented or integrated with Swagger/OpenAPI (if required by team).

---

## Dependencies & Execution Order

### Phase Dependencies
- **Phase 1 (Setup)**: Must run first.
- **Phase 2 (Foundational)**: Depends on Setup. Blocks all User Stories.
- **Phase 3 (US1)**: Depends on Foundational.
- **Phase 4 (US2)**: Depends on Foundational. Independent of US1 conceptually, but routing structure may overlap.
- **Phase 5 (US3)**: Depends on Foundational.

### Parallel Opportunities (Examples)
- In Phase 2: Implementing the Prisma Client singleton (`T008`), setting up the base Express server (`T009`), and creating the config service (`T010`) can be done simultaneously by different developers.
- In Phase 3: Entity definition (`T014`, `T015`) and Zod validation creation (`T016`) can run in parallel before creating the Use Cases.
- Test files (`T012`, `T013`, `T022`, `T023`, `T028`, `T029`) can be scaffolded in parallel for TDD.

## Implementation Strategy
1. **MVP (US1)**: First, establish the core structure, database, and ability to list/search existing data. Run seeds to populate test data.
2. **Incremental Delivery (US2 & US3)**: Introduce the ability to write to the database (US2), ensuring transactions are solid, followed by specific detailed reads (US3).
