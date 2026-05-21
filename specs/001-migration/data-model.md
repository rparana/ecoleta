# Data Model: Waste Collection Point Management Migration

## Domain Entities (src/domain/entities/)

### Item
- `id`: number
- `title`: string
- `image`: string (filename)

### Point
- `id`: string (UUID)
- `name`: string
- `email`: string
- `whatsapp`: string
- `latitude`: number
- `longitude`: number
- `city`: string
- `uf`: string
- `image`: string (URL)

## Repository Interfaces (src/domain/repositories/)

### IItemsRepository
- `findAll(): Promise<Item[]>`

### IPointsRepository
- `create(point: Point, itemIds: number[]): Promise<Point>`
- `findByFilters(city: string, uf: string, itemIds: number[]): Promise<Point[]>`
- `findById(id: string): Promise<{ point: Point, itemTitles: string[] } | null>`

## Prisma Schema

```prisma
model Point {
  id        String      @id @default(uuid())
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
  id     Int         @id @default(autoincrement())
  image  String
  title  String
  points PointItem[]

  @@map("items")
}

model PointItem {
  point_id String
  item_id  Int
  point    Point  @relation(fields: [point_id], references: [id])
  item     Item   @relation(fields: [item_id], references: [id])

  @@id([point_id, item_id])
  @@map("point_items")
}
```
