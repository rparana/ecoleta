# Modernize Ecoleta Backend

## 🚀 Summary
This Pull Request represents a comprehensive modernization of the `ecoleta` backend. It transitions the application from a legacy, tightly-coupled MVC pattern to a highly scalable, testable, and robust **Clean Architecture**. 

The core focus of this migration was to enforce strict type safety, decouple business logic from infrastructure, and establish a production-ready containerized environment.

## 🏗️ Architectural Overhaul
- **Database Layer**: Migrated from the legacy Knex.js query builder to **Prisma (v6)** for type-safe database access and streamlined SQLite schema migrations.
- **Clean Architecture**: 
  - **Domain**: Extracted core `Point` and `Item` entities alongside repository interfaces (`IPointsRepository`, `IItemsRepository`).
  - **Use Cases**: Business logic is now entirely agnostic of the HTTP framework (Express) and the database (Prisma).
  - **Infrastructure**: Introduced the **Adapter Pattern** to encapsulate Prisma queries and Express routing.
- **Validation**: Replaced generic validation with strict, schema-first **Zod** validators at the entry point of the application.
- **Tooling**: Standardized dependency management using **pnpm**.
- **Process**: Integrated `spec-kit` to enforce a specification-first development lifecycle.

## 📁 Key File Changes
- `Dockerfile` & `.dockerignore`: Created a multi-stage build optimized for Node.js/Alpine, ensuring a small footprint and secure execution (non-root user).
- `openapi.yaml`: Generated a dynamic, comprehensive OpenAPI 3.0 specification served visually via Swagger UI at `/api-docs`.
- `src/domain/*`: Introduced strict TypeScript interfaces for entities and repositories.
- `src/use-cases/*`: Implemented isolated business logic (`CreatePointUseCase`, etc.).
- `src/infrastructure/*`: Housed concrete Prisma repositories and Express adapters.
- `src/validation/pointSchemas.ts`: New Zod validation schemas.
- `docs/migration-history.md`: Added an architectural changelog for future AI context.

## ✅ Verification & Testing
All automated tests have been refactored to rigorously follow the **Given-When-Then (BDD)** pattern.

- **Unit Tests**: Added tests for all isolated Use Cases, verifying logic by mocking the injected repository interfaces.
- **Integration Tests**: Refactored existing endpoint tests to verify full-stack functionality (from Express route down to the Prisma SQLite database).
- **Result**: `11/11` tests passing across `6` suites. Linting and formatting checks pass with zero errors.

## 📝 Next Steps
- Review the newly generated `docs/migration-history.md` for context on future scaling (e.g., PostgreSQL migration).
- Ensure the Docker image builds cleanly in the CI/CD pipeline.
