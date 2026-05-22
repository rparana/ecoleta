# ecoleta: Modern Waste Collection Point Management

A modern, type-safe backend for connecting citizens with local waste collection points. Refactored from legacy roots to a high-performance Clean Architecture system.

## 🚀 Tech Stack

- **Runtime**: Node.js 20+
- **Language**: TypeScript (Strict Mode)
- **Package Manager**: [pnpm](https://pnpm.io/)
- **ORM**: [Prisma Client](https://www.prisma.io/)
- **Database**: SQLite (Development) / Compatible with PostgreSQL/MySQL (Production)
- **Framework**: Express.js
- **Validation**: [Zod](https://zod.dev/)
- **Testing**: Jest + Supertest (BDD Pattern)
- **Containerization**: Docker (Multi-stage)

## 🏗️ Architecture

The project follows strict **Clean Architecture** and **Dependency Inversion** principles:

- **`src/domain`**: Contains entities and repository interfaces. Completely decoupled from infrastructure.
- **`src/use-cases`**: Encapsulates application business rules. Depends only on domain interfaces.
- **`src/infrastructure`**: Concrete implementations of repositories (Prisma), HTTP controllers (Express), and adapters.
- **`src/validation`**: Encapsulated data validation schemas using Zod.

## 🛠️ Getting Started

### Prerequisites

- Node.js 20 or higher
- pnpm installed (`npm install -g pnpm`)

### Local Setup

1. **Install Dependencies**:
   ```bash
   pnpm install
   ```

2. **Database Initialization**:
   ```bash
   pnpm prisma migrate dev --name init
   pnpm prisma db seed
   ```

3. **Run Development Server**:
   ```bash
   pnpm dev
   ```
   The API will be available at `http://localhost:3333`.

### Running Tests

We follow a rigorous **Given-When-Then** (BDD) testing pattern for all unit and integration tests.

```bash
pnpm test
```

## 🐳 Docker Deployment

The project includes a multi-stage `Dockerfile` optimized for production size and security.

1. **Build Image**:
   ```bash
   docker build -t ecoleta-server .
   ```

2. **Run Container**:
   ```bash
   docker run -p 3333:3333 ecoleta-server
   ```

## 📖 API Documentation

Visual documentation is available via Swagger UI.

1. Start the server.
2. Visit: `http://localhost:3333/api-docs`

The raw contract can be found at `openapi.yaml`.

## 🔄 Spec-Kit Workflow

This project uses `spec-kit` to enforce a specification-first lifecycle for all new features.

1. **Specify**: Define requirements in `spec.md`.
   ```bash
   /speckit.specify "Feature description"
   ```
2. **Plan**: Design the architecture and data model.
   ```bash
   /speckit.plan
   ```
3. **Tasks**: Generate an actionable checklist.
   ```bash
   /speckit.tasks
   ```
4. **Implement**: Execute tasks and verify with BDD tests.
   ```bash
   /speckit.implement
   ```

## 📜 License

Distributed under the ISC License. See `LICENSE` for more information.
