# Crash'n Jimmy deployment direction

This repository is the source of truth for Crash'n Jimmy.

## Branch roles

- `main` — approved public production build.
- `staging` — newest playable candidate for Kurt to test.
- Short-lived feature/build branches — optional working branches only; do not make them the normal testing surface.

Do not overwrite either `main` or `staging` from an older numbered build. Promotion must be a fast-forward or reviewed merge from newer validated work.

## Hosting

Use Cloudflare Workers with Static Assets and Workers Builds connected to this GitHub repository.

- Production branch: `main`
- Enable Worker Previews for non-production branches.
- Normal testing URL: the stable Preview for `staging`.
- Exact-build debugging: use the immutable deployment URL Cloudflare records for that deployment.
- Keep GitHub Pages available as a fallback until Cloudflare production is proven stable.

The current source is still a single `index.html`. `npm run build` copies only the deployable site into `dist/`, so repository scripts/configuration are not published as web assets.

## Release flow

1. Develop and validate on a working branch or directly through the controlled build process.
2. Update `staging` only from newer validated work.
3. GitHub validation must pass.
4. Cloudflare creates/updates the `staging` Preview.
5. Kurt tests the Preview on phone and desktop.
6. After approval, promote the exact tested commit to `main`.
7. Tag meaningful approved checkpoints (for example `v0.3.0-playtest`).
8. Cloudflare deploys `main` to production.

## Near-term architecture

1. Get Cloudflare production/preview deployment working before a large refactor.
2. Add PWA installability after deployment is stable.
3. Then split the approximately 1 MB single-file development source into maintainable modules while preserving a simple deployable build.
4. Add anonymous gameplay telemetry only when useful for broader playtesting.
5. Do not add a database/backend until a real feature needs persistence (cloud saves, leaderboards, accounts, challenges, etc.).

## Native future

Do not rebuild the game solely to reach an app store. Keep the web game portable and, when warranted, package the mature web build with a native shell such as Capacitor, then add genuinely native features where useful. Cloudflare remains a replaceable web/deployment layer, not the owner of the game source.

## Non-negotiables

- GitHub remains the canonical source.
- Keep production and staging distinct.
- Do not deploy an unvalidated build.
- Preserve iPhone portrait/landscape behavior and desktop controls.
- Keep the game portable; avoid unnecessary Cloudflare-only application logic unless a future feature benefits from it.
