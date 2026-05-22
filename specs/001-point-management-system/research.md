# Research: Waste Collection Point Management

## Decisions

### 1. Validation Library
- **Decision**: Use **Zod**.
- **Rationale**: Zod is highly compatible with TypeScript, allowing for schema-first validation that automatically infers types. It fits the "Strict TypeScript" principle perfectly.
- **Alternatives considered**: Joi (less type-safe), Express-validator (more verbose, less reusable across layers).

### 2. Transaction Handling in Prisma
- **Decision**: Use `prisma.$transaction`.
- **Rationale**: Ensures FR-003 (atomic point creation) is satisfied. If the point insert or any item association fails, the transaction rolls back.
- **Alternatives considered**: Interactive transactions (overkill for this simple use case, but available if logic becomes more complex).

### 3. File Upload Management
- **Decision**: Keep legacy `uploads/` folder for now but abstract the URL generation.
- **Rationale**: Legacy controllers hardcode `http://localhost:3333/uploads/`. We will move this to a configuration service or environment variable to satisfy FR-006 while allowing for future flexibility (e.g., S3).

### 4. Clean Architecture Implementation
- **Decision**: Controller -> Use Case -> Entity/Repository(Infrastructure).
- **Rationale**: Satisfies the "Clean Architecture" principle. Use Cases will contain the business logic (like parsing comma-separated items), keeping the Express controllers thin.

## Technology Best Practices

- **Prisma**: Use `pnpm dlx prisma generate` after schema changes to keep the client in sync.
- **TypeScript**: Use `z.infer` from Zod to generate types for request bodies.
- **SQLite**: Keep the `.db` file in `prisma/` directory as per standard patterns.
