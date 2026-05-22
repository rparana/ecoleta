# Research: Waste Collection Point Management Migration (Finalization & Docs)

## Decisions

### 1. Dynamic API Documentation
- **Decision**: Use `yamljs` to load `openapi.yaml` and `swagger-ui-express` to serve it.
- **Rationale**: Keeps the documentation UI automatically synchronized with the source contract file. This avoids the need for manual UI updates when the specification changes.
- **Alternatives considered**: Redoc (static generation), manual HTML setup (harder to maintain).

### 2. Multi-stage Docker Pruning
- **Decision**: Include a specific `prod-deps` stage using `pnpm install --prod`.
- **Rationale**: Dramatically reduces image size by excluding development dependencies (like `typescript`, `ts-node`, `jest`) from the final production container.
- **Security**: Separation of build-time tools from the runtime environment minimizes the attack surface.

### 3. Repository-Layer Transaction Encapsulation
- **Decision**: Atomic point creation logic (handling items) is encapsulated within `PrismaPointsRepository.create`.
- **Rationale**: The Use Case remains agnostic of the transaction mechanism (Prisma's `$transaction`), adhering to the "Dependency Inversion" principle.

### 4. BDD Testing Comments
- **Decision**: Mandatory `// Given`, `// When`, `// Then` markers in all test blocks.
- **Rationale**: Ensures that every automated test case is a direct reflection of a business requirement from the feature specification.

## Technology Best Practices

- **Swagger**: Map the `/api-docs` route early in the middleware chain to ensure accessibility.
- **Dockerfile**: Use `chown` during `COPY` to ensure the non-root user has proper access to the `dist` and `node_modules`.
- **Prisma**: Always run `prisma generate` in both build and runtime dependency stages to ensure client availability.
