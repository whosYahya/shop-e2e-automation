# Test Plan

## Purpose and scope

This plan scopes a portfolio quality effort for the LambdaTest OpenCart demo. Phase 1 is reconnaissance and planning only. No test code or runtime configuration was changed in this phase.

The initial coverage target is storefront navigation, product search, category browsing, product details, cart, account registration and login, wishlist, and checkout where it can be inspected safely. REST API and cross-layer coverage remain conditional on finding a documented, supported JSON API.

## Evidence labels

- **Observed**: seen in the public demo during read-only browser inspection on 2026-10-12.
- **Proposed**: useful test coverage that still needs behavior/locator confirmation during implementation.
- **Unverified**: not inspected or blocked without changing data or submitting forms.

## Reconnaissance findings

| Area | Evidence | Notes |
|---|---|---|
| Homepage and navigation | Observed | Page title `Your Store`; category links include Components, Cameras, Phone, Tablets & Ipod, Software, MP3 Players, Laptops & Notebooks, and Desktops and Monitors. Promotional content and product groups are present. |
| Product search | Observed | Search field accessible as `Search For Products`; submitting `iPhone` navigated to `route=product/search&search=iPhone`, title `Search - iPhone`, with four product cards and sort/page-size selects. |
| Category browse | Partially observed | A category link for Desktops resolves to `route=product/category&path=20`, title `Desktops`. Product contents and pagination were not fully inspected. |
| Product details | Observed | Product 40 (`iPhone`) detail title, quantity field, BUY NOW, compare and review controls were present. The displayed price changed between inspections (`$123.20`, then `$122.00`), so it is not asserted as stable test data. Cart addition was tested separately and cleaned up. |
| Shopping cart | Observed | Empty cart message shown on homepage drawer and cart page. Adding the iPhone yielded a success alert and cart row at quantity 1. Updating to 2 changed line/cart totals; setting quantity to 0 or -1 removed the row. Cart was left empty after inspection. |
| Registration | Observed | Title `Register Account`; fields for first/last name, email, telephone, password/confirmation, customer group, newsletter, agreement, and Continue control. Submitting a blank form showed field errors and a privacy-policy warning; no account was created. |
| Login | Observed with throttle limitation | Title `Account Login`, labeled email/password fields and Login control. One synthetic invalid attempt was rejected; a second submission caused a one-hour login-attempt lockout warning. Repeated login submissions are not safe for routine automation on this shared demo. |
| Wishlist | Observed, unauthenticated only | Direct wishlist navigation redirected to the login page. Signed-in wishlist behavior is unverified. |
| Checkout | Partially observed and automated safely | An empty cart redirects to `checkout/cart`. With an iPhone in the cart, checkout offers Login, Register Account, and Guest Checkout. The review shows product, quantity, and totals; Cash On Delivery and Flat Rate are available and selected by default. A blank guest submission remained on the checkout form without a field-specific message. The displayed Flat Rate and order-summary shipping amounts differed during inspection, so fixed totals are not asserted. Testing stops before entering customer/payment data or placing an order. |
| API | Unverified; no suitable endpoint found | A 2026-10-13 homepage network observation captured the first-party HTML document and no first-party JSON `fetch`/XHR request on that page load. No site-specific API contract or endpoint was established. Other application flows remain unobserved at the network layer. |

## Approach

1. Start with read-only homepage, navigation, search, category, and product detail checks.
2. Add negative and boundary search cases after the actual empty/no-result behavior is confirmed.
3. Run read-only account form checks and blank registration validation using no personal data. Avoid account creation until persistence and cleanup are understood; avoid repeated login attempts because the shared demo returned a one-hour lockout warning.
4. Cover cart and checkout only with reversible demo data; stop before payment or final order placement unless a safe, explicitly supported sandbox flow is verified.
5. Investigate APIs through first-party documentation and observed network requests. Do not promote analytics, HTML page routes, or undocumented internals to API coverage.
6. Keep API and UI suites independent unless a documented API and suitable test data enable a genuine cross-layer assertion.

## Priorities

- **P0**: core smoke coverage required to establish storefront availability and high-value browse/search/product outcomes.
- **P1**: important customer flows and validation, including cart and account behavior.
- **P2**: secondary content, boundary cases, optional modules, and deeper regression coverage.

## Risks and constraints

- The site is a shared public demo; records, stock, content, and availability may change.
- No authentication credentials or API contract were provided.
- Successful registration may create persistent data and checkout may create an order; account creation and order placement are excluded until safe cleanup/test-environment behavior is verified.
- Some displayed category labels may be promotional or map to shared destinations. Verify destination and product content before treating each as a distinct supported module.
- The original starter test still targets Playwright's website. Application UI tests cover homepage, search, product details, cart, safe authentication form checks, and the checkout boundary described above.

## Exit criteria for Phase 1

- Reconnaissance evidence and limitations documented.
- Planned scenarios have unique IDs and all required case fields.
- Test data handling and automation strategy documented.
- No unsupported API behavior or test execution result is claimed.
