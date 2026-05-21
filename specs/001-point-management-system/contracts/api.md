# API Contracts: Waste Collection Point Management

## Endpoints Summary

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/items` | List all collection items |
| POST   | `/points` | Register a new collection point |
| GET    | `/points` | Filter points by city, UF, and items |
| GET    | `/points/:id`| Get detailed info for a point |

---

## 1. List Items
**GET `/items`**

### Response (200 OK)
```json
[
  {
    "id": 1,
    "title": "Lâmpadas",
    "image_url": "http://localhost:3333/uploads/lampadas.svg"
  }
]
```

---

## 2. Register Point
**POST `/points`**

### Request Body
```json
{
  "name": "Mercadão do Povo",
  "email": "contato@mercadao.com",
  "whatsapp": "41999999999",
  "latitude": -46.545621,
  "longitude": -23.564987,
  "city": "Curitiba",
  "uf": "PR",
  "items": [1, 2, 6]
}
```

### Response (201 Created)
```json
{
  "id": "uuid-v4-string",
  "image": "https://images.unsplash.com/...",
  "name": "Mercadão do Povo",
  "email": "contato@mercadao.com",
  "whatsapp": "41999999999",
  "latitude": -46.545621,
  "longitude": -23.564987,
  "city": "Curitiba",
  "uf": "PR"
}
```

---

## 3. Filter Points
**GET `/points?city=Curitiba&uf=PR&items=1,2`**

### Query Parameters
- `city`: String (required)
- `uf`: String (required, 2 chars)
- `items`: Comma-separated integers (required)

### Response (200 OK)
```json
[
  {
    "id": "uuid",
    "image": "...",
    "name": "...",
    "latitude": -46.54,
    "longitude": -23.56,
    "city": "Curitiba",
    "uf": "PR"
  }
]
```

---

## 4. Get Point Details
**GET `/points/:id`**

### Response (200 OK)
```json
{
  "point": {
    "image": "...",
    "name": "...",
    "email": "...",
    "whatsapp": "...",
    "latitude": -46.54,
    "longitude": -23.56,
    "city": "...",
    "uf": "..."
  },
  "items": [
    { "title": "Lâmpadas" },
    { "title": "Óleo de Cozinha" }
  ]
}
```

### Response (400 Bad Request)
```json
{ "message": "Point not found." }
```
