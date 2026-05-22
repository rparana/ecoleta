# Feature Specification: Waste Collection Point Management Migration

**Feature Branch**: `002-modernize-migration-spec`

**Created**: 2026-05-21

**Status**: Draft

**Input**: User description: "Update 'specs/001-migration/spec.md' to include technical and non-functional requirements based on new architecture, re-write acceptance criteria using Given-When-Then, and add Dockerization requirement."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Find Collection Points (Priority: P1)

As a citizen, I want to find waste collection points in my city that accept specific types of items (like batteries or oil), so that I can dispose of my waste responsibly.

**Why this priority**: Core functionality of the application; directly addresses the primary user need.

**Independent Test**: Filter points by city, UF, and specific items to see relevant results.

**Acceptance Scenarios**:

1. **Given** that there are registered collection points in "Curitiba" for "Baterias", **When** a user searches for points in city "Curitiba", UF "PR", with item "Baterias", **Then** the system MUST return a list of points matching these exact criteria.
2. **Given** that no points are registered in "Sertãozinho", **When** a user searches for points in city "Sertãozinho", UF "SP", with any items, **Then** the system MUST return an empty list with a 200 OK status.

---

### User Story 2 - Register Collection Point (Priority: P2)

As a recycling organization, I want to register my collection point on the platform, providing contact details and the items I accept, so that citizens can find me.

**Why this priority**: Necessary for building the platform's database and providing value to users.

**Independent Test**: Submit the registration form and verify the point appears in searches.

**Acceptance Scenarios**:

1. **Given** a set of valid registration data (name, email, whatsapp, location, items), **When** the registration request is submitted, **Then** the system MUST persist the point and its item associations in a single atomic transaction and return the created point with its unique identifier.
2. **Given** a registration request missing a required field (e.g., email), **When** the request is submitted, **Then** the system MUST return a 400 Bad Request error specifying the validation failure.

---

### User Story 3 - View Point Details (Priority: P3)

As a user, I want to see the detailed information of a specific collection point, including all items they accept and their contact information, so that I can coordinate my visit.

**Why this priority**: Essential for the final step of the user journey (actually disposing of waste).

**Independent Test**: Access a specific point ID and verify all details and associated items are displayed.

**Acceptance Scenarios**:

1. **Given** an existing collection point with ID "uuid-123", **When** the user requests details for this ID, **Then** the system MUST return the point's full profile (name, email, whatsapp, etc.) and the list of associated item titles.
2. **Given** a request for a non-existent point ID "invalid-id", **When** the request is processed, **Then** the system MUST return a 400 Bad Request error with the message "Point not found.".

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide a list of all available collection items with their IDs, titles, and image URLs.
- **FR-002**: System MUST allow creating a new collection point with name, email, WhatsApp, latitude, longitude, city, UF, and a list of item IDs.
- **FR-003**: Point creation MUST be atomic; if any part of the record or its associations fail, the entire operation MUST be rolled back.
- **FR-004**: System MUST support searching for points filtered by city, UF, and one or more item IDs.
- **FR-005**: System MUST provide detailed information for a single point by its unique identifier.

### Technical & Non-Functional Requirements

- **NFR-001: Clean Architecture**: The system MUST be organized into distinct layers (Entities, Use Cases, Controllers, Infrastructure). Inner layers MUST NOT depend on outer layers.
- **NFR-002: Dependency Inversion**: Use Cases MUST be decoupled from infrastructure (e.g., database, file system) using interfaces defined in the domain/use-case layer.
- **NFR-003: Adapter Pattern**: All external libraries (Prisma, Express, etc.) MUST be encapsulated using adapters to prevent leakage into core logic.
- **NFR-004: Comprehensive Validation**: All incoming data MUST be validated at the system entry point using Zod schemas.
- **NFR-005: Performance**: Item listing and point searches MUST complete in under 500ms under normal load.
- **NFR-006: Test Rigor**: All automated tests MUST follow the Given-When-Then pattern. Unit tests are required for Use Cases, and Integration tests are required for all endpoints.

### Infrastructure & Deployment

- **INF-001: Dockerization**: The system MUST run containerized using a multi-stage Dockerfile.
- **INF-002: Production Optimization**: The production Docker image MUST be optimized for size (e.g., using Alpine) and security (running as a non-root user).
- **INF-003: Persistence**: The system MUST use SQLite via Prisma for data persistence, with migrations managed through the Prisma CLI.

### Key Entities

- **Point**: Represents a physical collection location. Attributes: name, email, WhatsApp, latitude, longitude, city, UF, image.
- **Item**: Represents a type of waste (e.g., Lampadas, Baterias). Attributes: title, image.
- **PointItem**: Represents the many-to-many relationship between Points and Items.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of API endpoints are verified by integration tests following the Given-When-Then pattern.
- **SC-002**: The production Docker image size is under 200MB.
- **SC-003**: No infrastructure-specific types or classes are present in the Use Case or Entity layers.
- **SC-004**: All API inputs are validated before reaching the Use Case layer, with zero "any" types in the codebase.

## Assumptions

- The system will be deployed in a Docker-compatible environment.
- The base URL for item images is configurable via environment variables.
- SQLite is sufficient for the current scale and volume requirements.
