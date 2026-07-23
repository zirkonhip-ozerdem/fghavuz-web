# FGPOOL Web

Frontend-only FGPOOL corporate website built with Next.js App Router, TypeScript,
Tailwind CSS and static frontend data services.

Backend work is planned as a separate Laravel phase. Do not add a frontend ORM
to this repository unless the backend architecture is changed to Node.js.

## Commands

```bash
npm install
npm run dev
npm run build
npm test
```

## Team Boundaries

The project is organized to reduce merge conflicts for a three-person team:

- `app/[locale]/...`: route files. Each developer should own their own page
  folder when possible.
- `components/layout`: shared shell components such as header, footer, logo and
  floating action button. Coordinate changes here before editing.
- `components/sections`: page sections. Prefer adding a new section component
  instead of editing a large shared page directly.
- `components/ui`: small reusable primitives only.
- `lib/api`: frontend data services and domain types. These mock/static services
  should keep the same names as the future Laravel API resources.
- `messages`: static interface translations. Keep keys stable across locales.
- `public/assets`: committed visual assets, including `logo.png`.

## Model Naming

Use TypeScript names in `lib/api` as the frontend contract until the Laravel API
is available. When the backend starts, align these names with Laravel resources
and API response fields:

- `ProductCategory`
- `Advantage`
- `Project`

For stronger future consistency, generate frontend types from an OpenAPI schema
exported by Laravel instead of maintaining a second ORM in the frontend.

## Notes

- Locale routes are `/en`, `/tr`, and `/ar`.
- Arabic uses RTL via the locale layout.
- `npm run dev` starts the standard Next.js development server.
# fghavuz-web
