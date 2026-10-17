# System Architecture & Monorepo Design

## 1. High-Level Diagram

```
                        CAMPUS ASSISTANT MONOREPO
                                    |
          +-------------------------+-------------------------+
          |                         |                         |
    apps/admin (Web)         apps/mobile (Expo)         apps/api (Express)
    Tailwind / Vite / React  React Native + TS          Node.js + TS + Prisma
    Exact CampusMate UI      File-based Expo Router     JWT, Zod, RAG, pgvector
          |                         |                         |
          +-------------------------+-------------------------+
                                    |
                     +--------------+--------------+
                     |                             |
             packages/shared-types        packages/validation
             TypeScript Definitions       Zod Schemas
```

## 2. Monorepo Organization
- `apps/admin`: Next.js / React web application delivering the exact reference design of `https://campusmate-for-krce-04tdif.v2.appdeploy.ai/`.
- `apps/mobile`: Cross-platform React Native / Expo application following Expo Router tab navigation.
- `apps/api`: Express.js backend with Prisma ORM, pgvector embeddings, and Gemini RAG pipeline.
- `packages/shared-types`: Common TypeScript interfaces across client and server.
- `packages/validation`: Unified Zod validation schemas for all inputs and outputs.
- `docker-compose.yml`: API container with persistent SQLite storage.
