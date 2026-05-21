<!--
Sync Impact Report:
- Version change: 1.1.0 → 1.2.0
- List of modified principles:
  - Updated: IV. Clean Architecture & Dependency Inversion (emphasized decoupling and interface-driven dev)
  - Updated: VI. Given-When-Then Testing (mandated for all test cases)
  - Added: VII. Adapter Pattern & Dependency Encapsulation
  - Added: VIII. Production-Ready Dockerization
- Added sections: IX. Tech Stack & Infrastructure (updated)
- Removed sections: None
- Templates requiring updates:
  - .specify/templates/plan-template.md (✅ updated)
  - .specify/templates/tasks-template.md (✅ updated)
  - .specify/templates/spec-template.md (✅ updated)
- Follow-up TODOs: None
-->

# ecoleta Constitution

## Core Principles

### I. Node.js & Strict TypeScript
The backend MUST be developed using Node.js with strict TypeScript configuration. All code MUST be type-safe, explicitly avoiding the `any` type and leveraging advanced TypeScript features (interfaces, types, generics) to catch potential errors at compile-time and provide clear documentation through types.

### II. pnpm Package Manager
`pnpm` MUST be the only package manager used for this project. It ensures fast, disk-efficient, and deterministic dependency management. Developers MUST NOT use `npm` or `yarn` to avoid lockfile conflicts and inconsistent environments.

### III. Prisma & SQLite Database
Prisma Client MUST be used for all database interactions. The project uses SQLite as the primary database engine. All database schema changes MUST be managed via Prisma migrations. Raw SQL queries should be avoided unless absolutely necessary for performance reasons and must be documented.

### IV. Clean Architecture & Dependency Inversion
The project MUST follow Clean Architecture patterns. Logic MUST be organized into clear layers:
- **Entities**: Business rules and core data structures.
- **Use Cases**: Application-specific business rules.
- **Controllers/Adapters**: Interfaces between the use cases and external frameworks.
- **Infrastructure**: Implementation of external tools (e.g., Prisma, File System).

**Dependency Inversion**: Domain and Use Case layers MUST be completely decoupled from infrastructure implementation. Use interface-driven development to define contracts in inner layers that are implemented by outer layers.

### V. Comprehensive Validation
All external data input, including API request bodies, query parameters, and environment variables, MUST be rigorously validated. Validation MUST occur as close to the system entry point as possible using specialized libraries. Failure to validate input is considered a critical security and stability risk.

### VI. Given-When-Then Testing
All automated tests MUST rigorously adhere to the Given-When-Then (Gherkin/BDD) behavioral pattern. This ensures that the test setup (Given), the action under test (When), and the expected outcome (Then) are clearly delineated. This pattern improves test readability, maintainability, and ensures that tests are directly mapped to business requirements.

### VII. Adapter Pattern & Dependency Encapsulation
External dependencies (third-party libraries, external APIs, etc.) MUST NEVER leak into core business layers. All external services MUST be encapsulated using interfaces and the Adapter Pattern. This ensures that the application remains maintainable and that changing an external tool does not require changes to business logic.

### VIII. Production-Ready Dockerization
The project MUST include a multi-stage `Dockerfile` optimized for a production Node.js + TypeScript environment. The Dockerization strategy MUST focus on:
- Small image size (using Alpine or slim bases).
- Security (running as a non-root user).
- Performance (leveraging build cache and omitting dev dependencies in the final image).
- Multi-stage builds to separate the compilation environment from the execution environment.

## IX. Tech Stack & Infrastructure

- **Language**: TypeScript (Strict Mode)
- **Runtime**: Node.js
- **Framework**: Express.js
- **ORM**: Prisma Client
- **Database**: SQLite
- **Package Manager**: pnpm
- **Containerization**: Docker (Multi-stage)

## Development Standards

- **Formatting**: Standard Prettier and ESLint rules MUST be followed.
- **Branching**: All new features and bug fixes MUST be developed on dedicated feature branches.
- **Testing**: Unit tests are required for use cases and entities. Integration tests MUST verify the interaction between layers and the database. All tests MUST follow the Given-When-Then pattern.
- **Architecture Validation**: Compliance with Dependency Inversion and the Adapter Pattern MUST be verified during code reviews.

## Governance
This constitution is the supreme technical document for the ecoleta project. All technical decisions, code reviews, and architectural changes MUST align with these principles.

- **Amendments**: Proposed changes to these principles require a version bump and consensus.
- **Compliance**: Adherence to these principles is a prerequisite for merging any pull request.
- **Guidance**: Use the documentation in the `docs/` folder for specific implementation details and examples.

**Version**: 1.2.0 | **Ratified**: 2026-05-21 | **Last Amended**: 2026-05-21
