<!--
Sync Impact Report:
- Version change: N/A → 1.0.0
- List of modified principles:
  - Added: I. Node.js & Strict TypeScript
  - Added: II. pnpm Package Manager
  - Added: III. Prisma & SQLite Database
  - Added: IV. Clean Architecture
  - Added: V. Comprehensive Validation
- Added sections: VI. Tech Stack & Infrastructure, Development Standards
- Removed sections: None (replaces template placeholders)
- Templates requiring updates:
  - .specify/templates/plan-template.md (✅ updated)
  - .specify/templates/tasks-template.md (✅ updated)
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

### IV. Clean Architecture
The project MUST follow Clean Architecture patterns. Logic MUST be organized into clear layers:
- **Entities**: Business rules and core data structures.
- **Use Cases**: Application-specific business rules.
- **Controllers/Adapters**: Interfaces between the use cases and external frameworks (e.g., Express).
- **Infrastructure**: Implementation of external tools (e.g., Prisma, File System).
This ensures the core logic remains independent of frameworks and easy to test.

### V. Comprehensive Validation
All external data input, including API request bodies, query parameters, and environment variables, MUST be rigorously validated. Validation MUST occur as close to the system entry point as possible using specialized libraries. Failure to validate input is considered a critical security and stability risk.

## VI. Tech Stack & Infrastructure

- **Language**: TypeScript (Strict Mode)
- **Runtime**: Node.js
- **Framework**: Express.js
- **ORM**: Prisma Client
- **Database**: SQLite
- **Package Manager**: pnpm

## Development Standards

- **Formatting**: Standard Prettier and ESLint rules MUST be followed.
- **Branching**: All new features and bug fixes MUST be developed on dedicated feature branches.
- **Testing**: Unit tests are required for use cases and entities. Integration tests MUST verify the interaction between layers and the database.
- **Documentation**: Code should be self-documenting through clear naming and types. Complex logic requires inline comments.

## Governance
This constitution is the supreme technical document for the ecoleta project. All technical decisions, code reviews, and architectural changes MUST align with these principles.

- **Amendments**: Proposed changes to these principles require a version bump and consensus.
- **Compliance**: Adherence to these principles is a prerequisite for merging any pull request.
- **Guidance**: Use the documentation in the `docs/` folder for specific implementation details and examples.

**Version**: 1.0.0 | **Ratified**: 2026-05-21 | **Last Amended**: 2026-05-21
