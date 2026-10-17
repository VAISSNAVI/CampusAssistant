# Vibe-Coding Rules & Development Guidelines

1. **Docs as Source of Truth**: Follow the `/docs` folder specifications and reference UI patterns.
2. **Never Invent Undocumented APIs or Database Fields**: Ensure consistency across API routes, Prisma schemas, and shared types.
3. **Decouple Concerns**: Mobile and Web UI code should strictly communicate via the API service layer. Keep business logic out of components.
4. **Zero Secret Leaks**: Never hardcode secrets or API keys in frontend/mobile bundles.
5. **Grounded AI Answers**: Every campus-specific answer must be grounded in retrieved campus data and cite sources.
6. **Graceful Fallbacks**: Every network request, AI query, and database connection must gracefully handle offline/missing state.
7. **Run Checks**: Run typecheck, linting, and tests to verify build integrity.
