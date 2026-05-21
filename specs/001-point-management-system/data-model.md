# Data Model: Waste Collection Point Management

## Prisma Schema (Proposed)

```prisma
model Point {
  id        String   @id @default(uuid())
  image     String
  name      String
  email     String
  whatsapp  String
  latitude  Float
  longitude Float
  city      String
  uf        String
  items     PointItem[]

  @@map("points")
}

model Item {
  id    Int      @id @default(autoincrement())
  image String
  title String
  points PointItem[]

  @@map("items")
}

model PointItem {
  point_id String
  item_id  Int
  point    Point @relation(fields: [point_id], references: [id])
  item     Item  @relation(fields: [item_id], references: [id])

  @@id([point_id, item_id])
  @@map("point_items")
}
```

## Validation Rules (Zod)

### Point Registration (`POST /points`)
- `name`: String, required
- `email`: String (email format), required
- `whatsapp`: String, required
- `latitude`: Number, required
- `longitude`: Number, required
- `city`: String, required
- `uf`: String (length 2), required
- `items`: Array of Ints, required

### Point Search (`GET /points`)
- `city`: String, required
- `uf`: String (length 2), required
- `items`: Comma-separated Ints (converted to Array of Ints), required
