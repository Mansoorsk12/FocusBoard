# FocusBoard maintenance guide

## Architecture

React + Vite JavaScript application. `src/main.jsx` mounts `TaskProvider` and `App`. Hashes `#dashboard` and `#tasks` select two views of the same workspace. There is no React router or authentication UI.

- `src/components`: small reusable visual/interaction components.
- `src/context/taskReducer.js`: pure immutable state transitions.
- `src/context/TaskContext.jsx`: shared task/UI state, memoized derived values, stable action callbacks, serialized online synchronization.
- `src/hooks`: browser cache and native dialog lifecycle.
- `src/data`: six initial tasks and three explicitly marked Figma content placeholders.
- `src/utils/taskHelpers.js`: shared validation, filtering, statistics, dates. Imported by frontend and server; keep it free of browser-only effects.
- `src/styles`: base, dashboard, components, responsive CSS in that order.
- `netlify/server/index.mjs`: the sole server entry point, limited to `/api/*`.
- `db/schema.ts`: Drizzle source of truth. JavaScript-compatible syntax; frontend files stay `.js`/`.jsx`.
- `netlify/database/migrations`: generated migrations applied by the deployment platform.
- `tests`: Node built-in tests; no UI test suite has been run.

## Conventions

Use the exact statuses `To do`, `In progress`, `Completed` and priorities `High`, `Medium`, `Low`. Keep task fields and persistence validation aligned. Use stable IDs and immutable operations; never maintain separate writable task arrays for filters or statistics. Keep drafts local to the form. Use Lucide icons and semantic native buttons. Keep visible errors, meaningful empty states, reduced motion, keyboard focus, and responsive mobile layouts.

Use native `<dialog>` and `useDialog` for modal interactions. Do not remove focus restoration or cancellation behavior. Dates are ISO date-only strings; avoid midnight UTC conversion when formatting local due dates. Validate calendar dates, not just their string shape.

## Persistence decisions

Browser cache is a raw task array at `focusboard.tasks.v1`. `[]` is valid and must never trigger fixtures. `focusboard.sync.v1` stores the last synchronized snapshot/revision. Netlify Database holds atomic board snapshots; the HttpOnly workspace cookie isolates browsers without an account UI. Never log cookies or credentials. The hosted architecture differs from the user's frontend-only assignment; preserve that disclosure in README.md. Do not claim the database integration meets that requirement.

Do not silently overwrite divergent browser/server copies. Do not mutate applied migrations. Generate a new named migration after schema changes; never apply it manually. Do not add a catch-all SPA rewrite that captures `/api/*`.

## Current acceptance gaps

Read `docs/VERIFICATION.md` and `docs/ASSESSMENT.md` before claiming completion. Figma links were inaccessible and no exported images were supplied. The carousel data contains reference placeholders, not actual assignment content. Do not replace them with quotations or claim visual matching without seeing the original frames.

Runtime tests, visual checks, public deployment verification, and completed-app screenshots remain pending. Source was formatted and reviewed; test files exist but were not executed. Record actual outcomes when checks can run. Never fabricate screenshot or test artifacts. README.md contains local commands and deployment instructions.
