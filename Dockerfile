FROM node:20-bookworm-slim

RUN apt-get update && apt-get install -y python3 make g++ \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY full-stack-20260520T122017Z-3-001/full-stack/backend/package*.json ./backend/
RUN cd backend && npm ci --omit=dev

COPY full-stack-20260520T122017Z-3-001/full-stack/frontend/package*.json ./frontend/
RUN cd frontend && npm ci

COPY full-stack-20260520T122017Z-3-001/full-stack/frontend ./frontend
RUN cd frontend && npm run build

COPY full-stack-20260520T122017Z-3-001/full-stack/backend ./backend

WORKDIR /app/backend
ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080

CMD ["sh", "-c", "npm run setup && npm run start:prod"]
