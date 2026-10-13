# Automation Strategy

## Current state

The repository has `@playwright/test`, one starter spec targeting `playwright.dev`, and Chromium UI coverage for homepage, product search/details, cart, safe account-form validation, and the safe checkout boundary. Page objects live in `pages/`; UI specs live in `tests/ui/`. No storefront API collection or cross-layer test is configured.

## Proposed implementation order

1. Framework setup: JavaScript config, environment-driven base URL, Chromium project, failure evidence, scripts, ignores, and directory layout.
2. UI smoke: homepage/navigation, product search (matching and empty result), product details. Implemented and passed in the Chromium UI suite.
3. Listing and cart behavior after verifying safe cleanup. Cart add/update/remove and zero/negative-quantity behavior are implemented with cleanup.
4. Registration and login: blank registration validation is automated; account creation is deferred due unknown persistence/cleanup, and repeated login attempts are blocked by the public demo's one-hour throttle. Wishlist authenticated behavior remains pending.
5. Checkout only as far as safely observable, with no payment submission or final order placement.
6. API investigation and Postman only after first-party documentation or reliable observed network evidence confirms a supported JSON contract. Phase 6 inspection did not establish a storefront API; see `docs/api-test-plan.md`.
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

No REST API for the LambdaTest storefront is verified. The homepage network observation captured its HTML document and no first-party JSON `fetch`/XHR request on that page load. OpenCart HTML routes are not evidence of a REST API, and generic OpenCart documentation does not establish an API contract or enabled service for this specific demo. Do not add storefront requests until a supported endpoint, response contract, and safe test data are confirmed.

The user-reported Postman Echo request with four passing assertions is a learning exercise only; it is not ShopFlow API coverage and was not rerun for Phase 6. The intended `ShopFlow - API Regression` collection remains deferred, with no export or environment file yet. When a real target is verified, use Postman Collection v2.1 JSON, run it manually with Postman's Collection Runner, and consider Newman for local-file execution in a later CI phase. Keep the UI and API suites independent unless a documented API supports a valid cross-layer check.

## Locator and change management

Capture actual DOM/accessibility evidence during implementation. Re-check selectors against the live page before encoding them. Keep changes within the requested phase, explain any necessary edits to existing starter files, and record unverified demo behavior in test documentation instead of guessing.
