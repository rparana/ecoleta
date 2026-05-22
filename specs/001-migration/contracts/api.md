# API Contracts: Waste Collection Point Management Migration

## Endpoints

### 1. GET /items
List all collection items.
- **Given**: Seeded database.
- **When**: Request is made.
- **Then**: Returns array of items with resolved image URLs.

### 2. POST /points
Register a new collection point.
- **Given**: Valid point and item IDs.
- **When**: Request is submitted.
- **Then**: Returns 201 Created and the point object with ID.

### 3. GET /points
Filter points by location and accepted items.
- **Given**: Registered points and items.
- **When**: city, uf, and items are provided in query.
- **Then**: Returns list of points matching ALL filters.

### 4. GET /points/:id
Show details of a specific point.
- **Given**: An existing point ID.
- **When**: Request is made.
- **Then**: Returns point data and associated item titles.
