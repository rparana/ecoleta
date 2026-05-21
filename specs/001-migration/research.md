# Research: Waste Collection Point Management Migration

## Decisions

### 1. Decoupling Use Cases from Infrastructure
- **Decision**: Define repository interfaces in `src/domain/repositories/` and concrete implementations in `src/infrastructure/database/`.
- **Rationale**: Satisfies the "Dependency Inversion" principle. Use Cases depend only on interfaces, making them agnostic of Prisma or any other ORM.
- **Alternatives considered**: Direct Prisma calls in Use Cases (violates Clean Architecture).

### 2. Multi-stage Dockerization
- **Decision**: Use a 3-stage Dockerfile (`base`, `build`, `release`) based on `node:20-alpine`.
- **Rationale**: Optimizes for small production images while ensuring a consistent build environment. Running as a non-root user (`node`) enhances security (INF-002).
- **Alternatives considered**: Single-stage build (results in bloated images with dev dependencies).

### 3. Testing Pattern: Given-When-Then
- **Decision**: Enforce `// Given`, `// When`, `// Then` comments in all `jest` test files.
- **Rationale**: Improves readability and ensures alignment with business scenarios defined in the spec (NFR-006).
- **Alternatives considered**: standard Jest `expect` calls without comments (harder to map to requirements).

### 4. Data Validation with Zod
- **Decision**: Encapsulate Zod schemas in `src/validation/` and use them as Adapters.
- **Rationale**: Prevents Zod-specific types from leaking into the domain. Controllers will use these adapters to validate and transform input data.

## Technology Best Practices

- **Prisma**: Use `pnpm dlx prisma generate` in the Docker build stage.
- **Docker**: Leverage `.dockerignore` to skip `node_modules` and `dist` from the host.
- **Security**: Use the `USER node` directive in the final Docker stage.
