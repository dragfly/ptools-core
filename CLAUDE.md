# ptools-core — Claude Instructions

## What This Is

Pure TypeScript logic for [Private Tools](https://privatetools.cloud). No UI, no frameworks — just functions. This repo is **public** and fully auditable.

## After Every Task

1. **Update version** in `package.json`
2. **Commit** with a clear message
3. **Tag** following [Semantic Versioning](https://semver.org/):
   - **MINOR** (0.X.0): New functions, new tool modules
   - **PATCH** (0.0.X): Bug fixes, improvements to existing functions
   - **MAJOR** (X.0.0): Breaking changes to function signatures
4. **Push** commit and tags: `git push && git push --tags`

Tag push triggers GitHub Actions → build → deploy to GitHub Pages with SRI hashes.

## Key Commands

```bash
npm run build       # Bundle IIFE + ESM with esbuild, generate SRI hashes
npm run typecheck   # TypeScript type check
```

## Code Philosophy

**Less is more.** These are pure functions:
- No side effects, no state, no DOM
- Throw errors instead of returning error objects
- Use Web Crypto API for crypto operations
- Every function must work in any browser (no Node.js-only APIs)

## Adding a New Tool Module

1. Create `src/tool-name.ts` with exported pure functions
2. Re-export from `src/index.ts`
3. Build and verify: `npm run build`

## Build Output

- `dist/ptools-core.min.js` — IIFE bundle (sets `window.PToolsCore`)
- `dist/ptools-core.esm.min.js` — ESM bundle
- `dist/integrity.json` — SHA-384 hashes for SRI verification

Published to GitHub Pages at `https://dragfly.github.io/ptools-core/v{version}/`
