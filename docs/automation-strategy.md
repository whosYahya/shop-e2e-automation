# Automation Strategy

## Current state

The repository has `@playwright/test`, one starter spec targeting `playwright.dev`, and Chromium UI coverage for homepage, product search/details, cart, and safe account-form validation. Page objects live in `pages/`; UI specs live in `tests/ui/`. No API collection or cross-layer test is configured.

## Proposed implementation order

1. Framework setup: JavaScript config, environment-driven base URL, Chromium project, failure evidence, scripts, ignores, and directory layout.
2. UI smoke: homepage/navigation, product search (matching and empty result), product details. Implemented and passed in the Chromium UI suite.
3. Listing and cart behavior after verifying safe cleanup. Cart add/update/remove and zero/negative-quantity behavior are implemented with cleanup.
4. Registration and login: blank registration validation is automated; account creation is deferred due unknown persistence/cleanup, and repeated login attempts are blocked by the public demo's one-hour throttle. Wishlist authenticated behavior remains pending.
5. Checkout only as far as safely observable, with no payment submission or final order placement.
6. API investigation and Postman only if first-party documentation or network evidence confirms a supported JSON contract.
7. Integration only if a documented API and appropriate test data enable a genuine cross-layer check.

## Design

- Use Playwright Test fixtures and built-in isolated browser contexts as the default session boundary.
- Use Page Objects for repeated page interactions with meaningful domain behavior (home/search/product); avoid wrapping every locator or assertion without a reuse/readability benefit.
- Prefer role, label, and placeholder locators backed by observed accessible DOM. Use CSS only when no stable accessible locator exists; avoid XPath.
- Keep assertions on visible outcomes and business-facing content. Do not test undocumented implementation details.
- Make tests independent and data-driven only where several examples exercise the same verified rule.
- Avoid fixed sleeps. Use Playwright's auto-waiting assertions and navigation/event conditions.
- Do not add API mocks as a substitute for validating the public demo unless explicitly scoped as a separate UI contract test.

## Execution and evidence (planned for Phase 2)

- Use `BASE_URL` with the demo URL as a documented local default.
- Run Chromium initially to reduce resource usage and shared-site load.
- Use conservative worker count and retries only in CI; avoid retry masking.
- Capture HTML report and screenshots/traces on failure; exclude generated artifacts and local secret files from version control.
- Separate UI, API, and integration commands when those suites exist. CI must skip or clearly omit API execution until a valid collection/environment is configured.

## API and integration gates

No REST API is verified. OpenCart HTML routes observed for home, search, product, account, and checkout are page routes and are not evidence of a JSON API. Before adding Postman requests, identify first-party documentation or inspect a genuine JSON request/response, then validate method, safety, schema, and test data. Do not issue destructive requests. If no supported endpoint exists, document that UI and API suites remain independent and suggest a controlled practice API/local service separately.

## Locator and change management

Capture actual DOM/accessibility evidence during implementation. Re-check selectors against the live page before encoding them. Keep changes within the requested phase, explain any necessary edits to existing starter files, and record unverified demo behavior in test documentation instead of guessing.
