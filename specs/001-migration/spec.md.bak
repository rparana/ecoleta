# Feature Specification: Waste Collection Point Management

**Feature Branch**: `001-point-management-system`

**Created**: 2026-05-21

**Status**: Draft

**Input**: User description: "Extract and document the complete functional requirements and system behavior from legacy Points and Items controllers."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Find Collection Points (Priority: P1)

As a citizen, I want to find waste collection points in my city that accept specific types of items (like batteries or oil), so that I can dispose of my waste responsibly.

**Why this priority**: Core functionality of the application; directly addresses the primary user need.

**Independent Test**: Filter points by city, UF, and specific items to see relevant results.

**Acceptance Scenarios**:

1. **Given** a user searching for "Baterias" in "Curitiba", **When** they apply the filters, **Then** they should see a list of points in Curitiba that collect batteries.
2. **Given** a user searching for a city with no registered points, **When** they apply filters, **Then** the system should return an empty list.

---

### User Story 2 - Register Collection Point (Priority: P2)

As a recycling organization, I want to register my collection point on the platform, providing contact details and the items I accept, so that citizens can find me.

**Why this priority**: Necessary for building the platform's database and providing value to users.

**Independent Test**: Submit the registration form and verify the point appears in searches.

**Acceptance Scenarios**:

1. **Given** valid point details (name, email, location, items), **When** the registration is submitted, **Then** the point should be persisted in the database with its item associations.
2. **Given** a registration missing mandatory items, **When** submitted, **Then** the system should prevent creation (handled by transactional integrity).

---

### User Story 3 - View Point Details (Priority: P3)

As a user, I want to see the detailed information of a specific collection point, including all items they accept and their contact information, so that I can coordinate my visit.

**Why this priority**: Essential for the final step of the user journey (actually disposing of waste).

**Independent Test**: Access a specific point ID and verify all details and associated items are displayed.

**Acceptance Scenarios**:

1. **Given** a valid point ID, **When** accessed, **Then** the system returns the point's contact info and the list of item titles it accepts.
2. **Given** an invalid point ID, **When** accessed, **Then** the system returns a "Point not found" error.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide a list of all available collection items with their IDs, titles, and image URLs.
- **FR-002**: System MUST allow creating a new collection point with name, email, WhatsApp, latitude, longitude, city, UF, and a list of item IDs.
- **FR-003**: Point creation MUST be atomic; if the point or its item associations fail to save, the entire operation MUST be rolled back.
- **FR-004**: System MUST support searching for points filtered by city, UF, and one or more item IDs.
- **FR-005**: System MUST provide detailed information for a single point by its unique identifier.
- **FR-006**: Item images MUST be served with a full URL including the host and storage path.

### Key Entities

- **Point**: Represents a physical collection location. Attributes: name, email, WhatsApp, latitude, longitude, city, UF, image.
- **Item**: Represents a type of waste (e.g., Lampadas, Baterias). Attributes: title, image.
- **PointItem**: Represents the many-to-many relationship between Points and Items.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can successfully retrieve the full list of collection items in under 500ms.
- **SC-002**: Point registration persists all data and associations correctly in 100% of successful transaction cases.
- **SC-003**: Search results for points return only distinct points matching ALL filter criteria (city, uf, items).
- **SC-004**: Users receive a clear error message when attempting to view a non-existent point.

## Assumptions

- The base URL for item images is currently assumed to be `http://localhost:3333/uploads/` based on legacy code, though this should be configurable.
- Latitude and longitude are provided as decimal numbers for precise mapping.
- The system currently uses SQLite as the database engine as per the constitution.
