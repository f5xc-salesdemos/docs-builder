# Org Migration Guide

This document tracks the migration of the docs pipeline from the
`robinmordasiewicz` GitHub org to the `f5xc-SalesDemos` org.

## Migration Phases

### Phase 1: docs-builder (this repo)

**Status:** Complete

Migrated `robinmordasiewicz/f5xc-docs-builder` to
`f5xc-SalesDemos/docs-builder`.

Changes made:

- Added `DOCS_SITE` auto-derivation from `GITHUB_REPOSITORY_OWNER` in
  `docker/entrypoint.sh` (makes site URL portable across orgs)
- Updated all Docker image references from
  `ghcr.io/robinmordasiewicz/f5xc-docs-builder` to
  `ghcr.io/f5xc-salesdemos/docs-builder`
- Updated documentation examples (`docs/*.mdx`, `CLAUDE.md`,
  `MIGRATION.md`) to reference the new org
- Added TODO comments to workflow files and `dependabot.yml` for
  future migration phases

What still references the old org (and why):

| File | Reference | Reason |
|------|-----------|--------|
| `.github/workflows/*.yml` | `robinmordasiewicz/f5xc-template` | GitHub Actions `uses:` requires static strings; updates in Phase 3 |
| `.github/workflows/build-image.yml` | `robinmordasiewicz/f5xc-template` dispatch API | Same — updates in Phase 3 |
| `.github/dependabot.yml` | `robinmordasiewicz` assignee | User is still the maintainer; team handle TBD |
| `package.json` | `@robinmordasiewicz/f5xc-docs-theme` | npm package re-publishes under new scope in Phase 2 |
| `CONTRIBUTING.md` | `@robinmordasiewicz` CODEOWNER | User is still the maintainer |
| `docs/01-architecture.mdx` | `@robinmordasiewicz/f5xc-docs-theme` | Documents current npm alias; annotated with migration note |
| `docs/05-ci-cd.mdx` | `robinmordasiewicz/f5xc-template` | Workflow code snippets document current state accurately |

### Phase 2: docs-theme (future)

Migrate `robinmordasiewicz/f5xc-docs-theme` to
`f5xc-SalesDemos/docs-theme`.

Checklist:

- [ ] Create `f5xc-SalesDemos/docs-theme` repo
- [ ] Re-publish npm package under `@f5xc-salesdemos` scope
- [ ] Update `package.json` alias in this repo
- [ ] Update `docs/01-architecture.mdx` npm alias example
- [ ] Remove Phase 2 migration note from `docs/01-architecture.mdx`

### Phase 3: docs-control (future)

Migrate `robinmordasiewicz/f5xc-template` to
`f5xc-SalesDemos/docs-control`.

Checklist:

- [ ] Create `f5xc-SalesDemos/docs-control` repo
- [ ] Update all workflow `uses:` references (4 workflow files)
- [ ] Update `build-image.yml` dispatch API call
- [ ] Update `docs/05-ci-cd.mdx` code snippets
- [ ] Update `dependabot.yml` assignee to team handle
- [ ] Remove all Phase 3 TODO comments
- [ ] Remove remaining `robinmordasiewicz` references from `CONTRIBUTING.md`

## Verification

After each phase, run:

```sh
grep -r "robinmordasiewicz" --include="*.sh" --include="*.yml" --include="*.mdx" --include="*.md" --include="*.json"
```

After Phase 3 completes, the only remaining references should be in
this file (`MIGRATIONS.md`) documenting the migration history.
