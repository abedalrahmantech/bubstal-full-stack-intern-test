# Bubstal Limited — Summer 2026 Intern Coding Test

**Completed test:** Option 1 — Full-Stack Engineering (Product Catalog API + React frontend)

## Project location

```
full-stack-20260520T122017Z-3-001/full-stack/
```

## Quick start

```bash
# Backend
cd full-stack-20260520T122017Z-3-001/full-stack/backend
npm install
npm run setup
npm start

# Frontend (separate terminal)
cd full-stack-20260520T122017Z-3-001/full-stack/frontend
npm install
npm run dev
```

- API: http://localhost:3000
- UI: http://localhost:5173

## Implementation summary

- **Backend:** 7 REST endpoints (`products`, `categories`, `stats`) with SQLite
- **Frontend:** Product list with search + product detail page

See `full-stack-20260520T122017Z-3-001/full-stack/README.md` and `API_SPEC.md` for full requirements.

## Repository

GitHub: [abedalrahmantech/bubstal-full-stack-intern-test](https://github.com/abedalrahmantech/bubstal-full-stack-intern-test)

## Live deployment

### Currently live (demo tunnel)

While your PC is running the production server, the app is publicly available at:

- **App + API:** https://granted-applied-institutes-committees.trycloudflare.com
- **API health:** https://granted-applied-institutes-committees.trycloudflare.com/api/health
- **Products:** https://granted-applied-institutes-committees.trycloudflare.com/api/products

This uses a Cloudflare quick tunnel (temporary URL; changes if restarted).

### Permanent hosting (Render — recommended)

1. Open: https://dashboard.render.com/blueprint/new?repo=https://github.com/abedalrahmantech/bubstal-full-stack-intern-test
2. Sign in with **GitHub** as `abedalrahmantech`
3. Click **Apply** to deploy the `render.yaml` blueprint

After deploy (~5 min):

- **App + API:** `https://bubstal-product-catalog.onrender.com`
- **API health:** `https://bubstal-product-catalog.onrender.com/api/health`

The production server serves the React UI and REST API from one host.
