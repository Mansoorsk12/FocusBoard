# AI usage disclosure

## Tools used

OpenAI Codex generated the implementation and documentation with shell/file tools. Python `pypdf` was used to read the assignment PDF. HTTP requests and a Playwright Chromium visit were used to investigate access to Figma. Prettier formatted the source. No AI image-generation tool was used.

## Representative task instructions

These are excerpts from the supplied user request, not an invented history of separate candidate prompts:

1. “Use JavaScript, NOT TypeScript. Use reusable React components.”
2. “Search, status tabs, and priority filtering must work TOGETHER.”
3. “Never mutate React state directly. Use immutable array operations.”
4. “Do not claim a feature is complete unless it has actually been implemented and tested.”

## AI-assisted areas

Component architecture, reducer/context state, task interactions, form validation, filtering/statistics, browser caching, hosted storage integration, responsive CSS, dialog behavior, unit-test source, and documentation were AI-assisted. Human candidate testing, manual design recreation, and code understanding have not been asserted or fabricated.

## A suggestion reviewed and corrected

An initial persistence implementation would have loaded the online snapshot over the browser cache on every successful startup. This could discard unsynchronized work after an offline edit. It was corrected to compare the cached snapshot with the last synchronized snapshot/revision, retain pending browser changes, and refuse to silently overwrite independently changed online data. This correction was source-reviewed; its runtime recovery paths still need browser testing.

The idea of substituting generic productivity quotations was also rejected. Because Figma could not be accessed, the carousel labels its three entries as unavailable reference content rather than presenting invented copy as the original slides.

## Implementation explanation for the candidate

The reducer owns a single array and changes it with spread, `map`, and `filter`. Statistics and visible tasks are computed from that array rather than stored separately. The form keeps a temporary draft and only commits after validation. LocalStorage serializes browser data safely, while the hosted edition writes versioned board snapshots to Netlify Database. A carousel index selects the displayed entry and active indicator. Native dialogs supply keyboard focus containment; CSS media queries switch desktop rows to mobile cards.

The candidate should run the documented checks and be ready to explain these flows and change the code personally. This document does not certify that the candidate has already done so.

## Honest limitations

All six Figma frames remained inaccessible, so neither pixel fidelity nor original carousel text is claimed. Application runtime tests and screenshots remain pending. Hosted server/database persistence departs from the requested frontend-only architecture and is disclosed in README.md. No perfect score or completed human verification is claimed.
