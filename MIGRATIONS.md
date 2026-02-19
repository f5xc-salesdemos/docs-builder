# Org Migration Guide

This document tracks the migration of the docs pipeline from the
`robinmordasiewicz` GitHub org to the `f5xc-salesdemos` org.

## Migration Phases

### Phase 1: docs-builder (this repo)

**Status:** Complete

Migrated `robinmordasiewicz/f5xc-docs-builder` to
`f5xc-salesdemos/docs-builder`.

Changes made:

- Added `DOCS_SITE` auto-derivation from `GITHUB_REPOSITORY_OWNER` in
  `docker/entrypoint.sh` (makes site URL portable across orgs)
- Updated all Docker image references from
  `ghcr.io/robinmordasiewicz/f5xc-docs-builder` to
  `ghcr.io/f5xc-salesdemos/docs-builder`
- Updated documentation examples (`docs/*.mdx`, `CLAUDE.md`,
  `MIGRATION.md`) to reference the new org

### Phase 2: docs-theme

**Status:** Complete

Migrated `robinmordasiewicz/@f5xc-salesdemos/docs-theme` to
`f5xc-salesdemos/docs-theme`.

Changes made:

- Created `f5xc-salesdemos/docs-theme` repo and pushed all source files
- Updated `package.json` URLs (homepage, repository, bugs) to new org
- Updated `DOCS_SITE` default to `https://f5xc-salesdemos.github.io`
- Updated `DOCS_HOME` default in `Banner.astro` and `SiteTitle.astro`
- Updated `playwright.config.ts` base URL
- Updated `dispatch-downstream.yml` target to `f5xc-salesdemos/docs-builder`
- Deleted `auto-merge.yml` (consistent with docs-builder)
- Updated `docs/01-architecture.mdx` npm alias in this repo
- npm package name stays as `@f5xc-salesdemos/docs-theme` (unscoped)

### Phase 3: docs-control

**Status:** Complete

Migrated `robinmordasiewicz/f5xc-template` to
`f5xc-salesdemos/docs-control`.

Changes made:

- Created `f5xc-salesdemos/docs-control` repo and pushed all source files
- Deleted auto-merge workflows (reusable + caller)
- Updated `downstream-repos.json` to `docs-builder` and `docs-theme` only
- Updated `docs-sites.json` to migrated sites only
- Disabled `allow_auto_merge` in default repo settings
- Updated all org references from `robinmordasiewicz` to `f5xc-salesdemos`
- Updated all repo references from `f5xc-template` to `docs-control`
- Updated builder image refs to `ghcr.io/f5xc-salesdemos/docs-builder`
- Updated GitHub Pages URLs to `f5xc-salesdemos.github.io`
- Updated all workflow `uses:` references in docs-builder and docs-theme
- Updated `build-image.yml` dispatch API call to docs-control
- Updated `docs/05-ci-cd.mdx` and `docs/06-content-authors.mdx` code snippets

## Remaining `robinmordasiewicz` References

These references are intentional and correct:

| File | Reference | Reason |
|------|-----------|--------|
| `.github/dependabot.yml` | `robinmordasiewicz` assignee | User is still the maintainer |
| `CONTRIBUTING.md` | `@robinmordasiewicz` CODEOWNER | User is still the maintainer |

## Verification

After all phases, run:

```sh
grep -r "robinmordasiewicz" --include="*.sh" --include="*.yml" --include="*.mdx" --include="*.md" --include="*.json"
```

The only remaining references should be the maintainer/CODEOWNER
entries listed above.
