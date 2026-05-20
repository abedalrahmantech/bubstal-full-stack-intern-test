# API Specification

All endpoints are prefixed with `/api`. All request and response bodies are JSON.

---

## GET /api/health

Health check endpoint (provided — no implementation needed).

**Response 200:**
```json
{ "status": "ok", "timestamp": "2025-01-01T00:00:00.000Z" }
```

---

## GET /api/products

List products with optional pagination, filtering, and search.

**Query Parameters:**

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `page` | integer | `1` | Page number (1-based) |
| `limit` | integer | `10` | Products per page |
| `category_id` | integer | — | Filter by category ID |
| `search` | string | — | Search by product name (case-insensitive, partial match) |

**Response 200:**
```json
{
  "products": [
    {
      "id": 1,
      "name": "Wireless Bluetooth Headphones",
      "description": "Over-ear headphones with noise cancellation",
      "price": 79.99,
      "sku": "ELEC-001",
      "image_url": "https://picsum.photos/seed/headphones/400/400",
      "category_id": 1,
      "created_at": "2025-01-01 00:00:00"
    }
  ],
  "total": 50,
  "page": 1,
  "totalPages": 5
}
```

**Notes:**
- `total` is the total number of products matching the filter (not just the current page)
- `totalPages` = ceil(total / limit)
- When `search` is provided, match any product whose name contains the search string (case-insensitive)

---

## GET /api/products/:id

Get a single product by ID, including its category name and inventory quantity.

**Response 200:**
```json
{
  "id": 1,
  "name": "Wireless Bluetooth Headphones",
  "description": "Over-ear headphones with noise cancellation",
  "price": 79.99,
  "sku": "ELEC-001",
  "image_url": "https://picsum.photos/seed/headphones/400/400",
  "category_id": 1,
  "created_at": "2025-01-01 00:00:00",
  "category_name": "Electronics",
  "quantity": 45
}
```

**Response 404:**
```json
{ "error": "Product not found" }
```

---

## POST /api/products

Create a new product.

**Request Body:**
```json
{
  "name": "New Product",
  "description": "A description",
  "price": 29.99,
  "sku": "NEW-001",
  "image_url": "https://example.com/image.jpg",
  "category_id": 1
}
```

**Validation Rules:**
- `name` is required and must be a non-empty string
- `price` is required and must be a number greater than 0
- `sku` is required and must be unique

**Response 201:**
Returns the created product object (with its new `id`).
```json
{
  "id": 51,
  "name": "New Product",
  "description": "A description",
  "price": 29.99,
  "sku": "NEW-001",
  "image_url": "https://example.com/image.jpg",
  "category_id": 1,
  "created_at": "2025-01-01 00:00:00"
}
```

**Response 400:**
```json
{ "error": "Name is required" }
```

---

## PUT /api/products/:id

Update an existing product. Supports partial updates (only send fields to change).

**Request Body (partial):**
```json
{
  "name": "Updated Product Name",
  "price": 39.99
}
```

**Response 200:**
Returns the full updated product object.

**Response 404:**
```json
{ "error": "Product not found" }
```

---

## DELETE /api/products/:id

Delete a product by ID.

**Response 204:** (no body)

**Response 404:**
```json
{ "error": "Product not found" }
```

---

## GET /api/categories

List all categories.

**Response 200:**
```json
{
  "categories": [
    { "id": 1, "name": "Electronics" },
    { "id": 2, "name": "Clothing" },
    { "id": 3, "name": "Books" }
  ]
}
```

---

## GET /api/stats

Return aggregate statistics about the product catalog.

**Response 200:**
```json
{
  "totalProducts": 50,
  "totalCategories": 10,
  "avgPrice": 32.45,
  "outOfStockCount": 3
}
```

**Field Details:**
- `totalProducts` — total number of products in the database
- `totalCategories` — total number of categories
- `avgPrice` — average price of all products, **rounded to 2 decimal places**
- `outOfStockCount` — number of products whose inventory quantity is 0
