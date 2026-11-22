# FocusBoard

A responsive task workspace built with React, Vite, and JavaScript. The dashboard brings task management, a calculated overview, search, combined filters, and Focus Notes into one white and lavender interface.

**Submission status:** Application source has been implemented and reviewed. Runtime acceptance testing, completed-app screenshots, and comparison with the original Figma frames remain outstanding. No assessment score is claimed.

- Project URL: https://focusboard-frontend.netlify.app — configured destination, deployment not verified here.
- Live submission URL: `<replace with the verified public HTTPS URL>`
- GitHub repository: `https://github.com/<owner>/focusboard`

## Assignment objectives

Demonstrate reusable React components, predictable state changes, complete task interactions, derived statistics, responsive layouts, accessibility, and honest AI disclosure. The attached four-page assignment was read. Original Figma fidelity is still an acceptance requirement.

## Technologies

React 19, JavaScript ES modules, Vite, CSS Grid/Flexbox/media queries, Lucide React, Context, `useReducer`, `useState`, `useEffect`, `useMemo`, and `useCallback`. Node's built-in test runner is used for the supplied unit tests. DM Sans is requested from Google Fonts with a local sans-serif fallback.

The hosted edition also includes a Netlify Server, Netlify Database, and Drizzle ORM. This is a material departure from the requested frontend-only/no-cloud architecture: durable hosted storage was required by the hosting environment. There is no login, account system, or third-party task API. The React interface can run separately in Vite and use its browser cache when the hosted API is unavailable. This architectural difference must be reviewed before assessment submission; the project is not represented as meeting the frontend-only requirement exactly.

## Implemented source features

- Dashboard and My tasks navigation, including browser back/forward hash navigation and mobile tabs.
- Six initial records, used only when no valid saved tasks are available. A saved empty array is preserved.
- Total, in-progress, completed, and rounded completion-percentage cards derived from the task array. Zero tasks produce zero percent.
- Create/edit form with all six fields, custom categories, trimmed title validation, inline errors, optional dates, and cancellation.
- Delete confirmation, cancellation, status selects, and quick complete/reopen controls.
- Case-insensitive title search, status buttons, and priority filtering evaluated together.
- Distinct empty-board and empty-results states with appropriate actions.
- Three-slide looping carousel, previous/next buttons, direct indicators, and left/right keyboard support.
- Safe browser storage reads/writes, storage failure notices, online saving status/retry, and optimistic server revision checks.
- Responsive desktop table, tablet reflow, mobile task cards, and scrollable mobile dialogs.

These features have been source-reviewed; they have not been declared browser-tested. Carousel navigation is implemented, but the original slide content is **not** available in this delivery.

## Installation and local development

Use Node.js 24+ and npm.

```bash
npm ci
npm run dev
```

Open the URL printed by Vite. In this mode, task operations run in the browser and localStorage holds the browser copy. The hosted storage endpoints are not emulated by plain Vite, so an online-saving notice is expected. There are no frontend API keys to configure.

To use the Netlify features locally, link the project in the Netlify CLI and use:

```bash
netlify dev --port 8889
```

Open http://localhost:8889. Database availability depends on the linked site's platform configuration. Never commit credentials or environment files.

## Application structure

```text
src/
  components/       Navigation, header, overview, carousel, tasks, forms, dialogs
  context/          TaskProvider and pure immutable taskReducer
  hooks/            Safe browser cache and native-dialog lifecycle
  data/             Six initial tasks and explicitly marked carousel references
  utils/            Validation, dates, filtering, derived statistics
  styles/           Base, dashboard, component, and responsive CSS
  App.jsx           Dashboard/tasks view composition
  main.jsx          React root and shared provider
public/             Favicon
netlify/server/     Hosted board open/save endpoints
netlify/database/   Generated migration and schema snapshots
db/                 Drizzle board schema and database client
tests/              Helper, reducer, and storage unit tests
docs/               Verification checklist and rubric report
```

The two `.ts` schema/configuration files contain JavaScript-compatible syntax and serve the database tooling. All application components, hooks, helpers, and server handlers are JavaScript; there is no TypeScript frontend or TypeScript compiler setup.

## State management and data flow

`TaskProvider` owns the single task array, search text, selected status/priority, active carousel index, and dialog/editing ID. The pure reducer returns new arrays for add, edit, delete, and status operations. Forms hold only their temporary draft; editing data is looked up by ID in the current task state.

`useMemo` derives statistics and the filtered list. Filters use an AND condition and never modify the task array. `useCallback` stabilizes task action callbacks; memoized task rows retain unchanged task references. This makes every card and task control reflect the same source of truth without a separate state library.

## LocalStorage and hosted persistence

`focusboard.tasks.v1` stores a JSON task array. Lazy initialization distinguishes a missing key from `[]`; valid user data takes precedence over fixtures. Reads validate structure, unique IDs, statuses, priorities, and dates. Invalid JSON and unavailable storage produce notices rather than crashes. Invalid content is not overwritten just by reading it; the next user task change replaces the invalid browser copy.

`useEffect` writes changes to the browser cache. `focusboard.sync.v1` records the last synchronized revision and snapshot, allowing recovery of locally changed tasks after a failed online save. This metadata contains no authentication credential.

The hosted board is isolated by a runtime-generated HttpOnly, SameSite cookie. A board snapshot is stored atomically in Netlify Database with an incrementing revision. Writes are serialized and guarded against stale revisions. An existing online board is never re-seeded on open. A cookie is a browser workspace identifier, not a user account; clearing both cookies and cache creates a new workspace. There is no account-based recovery or cross-device synchronization.

### Conflicting browser and online copies

Automatic merging is intentionally avoided. If both copies changed, the app retains the browser copy and refuses to silently overwrite the online board. To recover, first copy/export the value of `focusboard.tasks.v1` using the browser's Storage inspector. To load the online copy, remove **only** `focusboard.tasks.v1` and `focusboard.sync.v1`, keep the workspace cookie, and refresh. Reapply desired task changes through the interface. Never clear these keys before retaining unsaved work. A richer conflict-resolution interface is not part of the task assignment.

## Responsive design

Desktop uses a fixed sidebar, four overview cards, and a task grid. Tablet narrows navigation, uses two overview columns, and moves due dates into each task's primary cell. At 650px and below, navigation moves above the page, search and create actions share a row, and tasks become individual cards. At 370px and below, the form's paired fields stack. Dialogs use viewport-constrained height and internal scrolling. Touch and reduced-motion media queries are included.

The requested 390px, 768px, 1440px, and intermediate-width checks are documented in [the verification checklist](docs/VERIFICATION.md), but actual viewport inspection remains pending.

## Accessibility

Semantic navigation, main, sections, articles, headings, and forms; associated input labels; grouped priority choices; named icon buttons; pressed/current states; visible focus outlines; live feedback; a skip link; text labels in addition to color; and reduced-motion styles are present. Native `<dialog>` supplies modal focus containment and Escape handling. The dialog lifecycle returns focus to its invoker or the Add task button if deletion removed the invoker. Cancel receives initial focus for delete confirmation.

These are implementation details, not a claim of an accessibility audit. Keyboard, screen-reader, rendered contrast, and touch-target testing remain required.

## Figma references and limitations

The direct links returned HTTP 403 or empty HTTP 202 responses. Public embed pages were also attempted, including a browser visit, but the actual design remained blocked. Repeated links supplied in clarification did not include exported images. Consequently, **none of the six design frames was visually inspected** and pixel-perfect matching cannot be claimed.

- [Main file](https://www.figma.com/design/09TveHXjOvI73KDNndCFM4/FocusBoard-Dashboard-References)
- [Desktop 1440 × 1000](https://www.figma.com/design/09TveHXjOvI73KDNndCFM4/FocusBoard-Dashboard-References?node-id=1-2)
- [Mobile 390 × 1128](https://www.figma.com/design/09TveHXjOvI73KDNndCFM4/FocusBoard-Dashboard-References?node-id=1-167)
- [Create task 760 × 822](https://www.figma.com/design/09TveHXjOvI73KDNndCFM4/FocusBoard-Dashboard-References?node-id=1-279)
- [Focus Notes 1](https://www.figma.com/design/09TveHXjOvI73KDNndCFM4/FocusBoard-Dashboard-References?node-id=15-2)
- [Focus Notes 2](https://www.figma.com/design/09TveHXjOvI73KDNndCFM4/FocusBoard-Dashboard-References?node-id=15-30)
- [Focus Notes 3](https://www.figma.com/design/09TveHXjOvI73KDNndCFM4/FocusBoard-Dashboard-References?node-id=15-58)

The visible carousel explicitly identifies missing source content. Its data module contains three clearly identified reference placeholders, **not** the original notes or claimed reconstructions. Replace them with the original content and styling after obtaining accessible exports. Desktop/mobile navigation, spacing, and form styling also need comparison against those exports.

## Testing and verification

```bash
npm test
```

Tests are supplied for immutable task operations, dynamic statistics, combined filters, missing/empty/corrupt browser storage, validation, date edge cases, cancellation, and final-task deletion. **These tests were not executed in this delivery.** No local build, development server, or application browser test was run. The deployment pipeline performs the build separately; its result is not assumed here.

See [docs/VERIFICATION.md](docs/VERIFICATION.md) for the full acceptance checklist and [docs/ASSESSMENT.md](docs/ASSESSMENT.md) for rubric-by-rubric status. Completed-application desktop and mobile screenshots have **not** been captured. Capture them only after the application is actually running; no screenshots have been fabricated.

## Deployment

The repository includes `netlify.toml` with Node 24, build command `npm run build`, and publish directory `dist`. Connect the repository to Netlify and deploy. The board API runs at `/api/*`; static assets are served normally. Do not add a blanket SPA rewrite, because it would intercept the board API. Hash navigation means no route rewrite is needed.

Netlify applies the checked-in database migration during deployment. Do not manually push or apply it. After the pipeline passes, open the public HTTPS URL, run the acceptance checklist, capture 1440px desktop and 390px mobile screenshots, and replace the submission URL placeholders. GitHub publication and the hosted build result are not verified by this source delivery.

## Remaining acceptance work

Obtain the six Figma exports and original Focus Notes text; align the design; run automated and browser acceptance checks; capture desktop/mobile screenshots; verify the public URL; and publish the source repository. The database/server architecture also needs explicit review against the frontend-only assignment requirement. See [AI_USAGE.md](AI_USAGE.md) for assistance disclosure and [AGENTS.md](AGENTS.md) for maintenance guidance.
