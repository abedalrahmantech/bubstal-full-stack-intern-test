# Full-Stack Coding Test: E-Commerce Product Catalog

Build a **Product Catalog API** and a simple frontend to display the data.

## Time Limit

**1–2 days.**

## Tech Stack

- **Backend:** Node.js, Express.js, SQLite (via better-sqlite3)
- **Frontend:** React (Vite), React Router

## Getting Started

```bash
# 1. Backend setup
cd full-stack/backend
npm install
npm run seed     # Seeds the database with 50 products
npm start        # Starts API server on http://localhost:3000

# 2. Frontend setup (separate terminal)
cd full-stack/frontend
npm install
npm run dev      # Starts dev server on http://localhost:5173
```

---

## Your Tasks

### Backend: REST API (7 endpoints)

**Files to implement:** `backend/src/routes/products.js`, `categories.js`, `stats.js`

See [API_SPEC.md](API_SPEC.md) for detailed request/response specifications.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | List products with pagination, filtering, and search |
| GET | `/api/products/:id` | Get a single product with category name |
| POST | `/api/products` | Create a new product (with validation) |
| PUT | `/api/products/:id` | Update an existing product |
| DELETE | `/api/products/:id` | Delete a product |
| GET | `/api/categories` | List all categories |
| GET | `/api/stats` | Aggregate stats (total revenue, avg price, etc.) |

### Frontend: 2 React Pages

**Files to implement:** `frontend/src/pages/ProductList.jsx`, `ProductDetail.jsx`

| Page | Requirements |
|------|-------------|
| **Product List** | Fetch and display products, search input with API filtering, link to detail pages |
| **Product Detail** | Fetch and display a single product's full information, back link to list |

Required `data-testid` attributes are noted in the component files.

---

## What's Already Provided (do not modify)

- `backend/src/app.js` — Express app setup
- `backend/src/db/` — SQLite connection and migrations
- `backend/scripts/seed.js` — Database seeder (50 products, 10 categories)
- `backend/src/routes/health.js` — Health check endpoint (example)
- `frontend/src/App.jsx` — React Router setup
- `frontend/src/api/client.js` — API client utility
- `frontend/src/components/Layout.jsx` — Layout wrapper

---

## Evaluation Criteria

| Area | What We Look For |
|------|-----------------|
| **API Correctness** | Endpoints return correct data, status codes, and handle edge cases |
| **Validation** | Proper input validation (required fields, types, unique constraints) |
| **Frontend** | Working UI with search, navigation, and clean data display |
| **Code Quality** | Clean, readable code with sensible structure |

---

## Project Structure

```
full-stack/
├── README.md               ← You are here
├── API_SPEC.md             ← Detailed API specification
├── backend/
│   ├── package.json
│   ├── scripts/seed.js     ← Database seeder (provided)
│   └── src/
│       ├── app.js          ← Express setup (provided)
│       ├── index.js        ← Server entry point
│       ├── db/             ← SQLite connection + migrations (provided)
│       ├── middleware/      ← Error handler (provided)
│       ├── routes/
│       │   ├── health.js   ← Example route (provided)
│       │   ├── products.js ← TODO: implement
│       │   ├── categories.js ← TODO: implement
│       │   └── stats.js    ← TODO: implement
│       └── utils/
└── frontend/
    ├── package.json
    └── src/
        ├── App.jsx         ← Router setup (provided)
        ├── api/client.js   ← API client (provided)
        ├── components/     ← Layout (provided)
        └── pages/
            ├── ProductList.jsx   ← TODO: implement
            └── ProductDetail.jsx ← TODO: implement
```

Good luck!
