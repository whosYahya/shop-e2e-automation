# Test Data Strategy

## Principles

- Use catalog data already visible in the public demo for browse/search assertions, but avoid assuming prices, stock, or products stay fixed.
- Use synthetic data only. Never enter real names, email addresses, phone numbers, addresses, payment data, or credentials.
- Do not commit account credentials, cookies, tokens, or private environment exports.
- Prefer data generated per run for any registration or account workflow. Use a reserved non-deliverable email domain such as `example.invalid` only if the application accepts it and no email is required.
- Avoid shared-account dependencies. UI tests should establish their own state when safe and practical.
- Clean up reversible data such as cart items and wishlist entries after a scenario. Do not claim account/order cleanup unless the application provides and the test verifies it.

## Current observed data

- The search term `iPhone` returned four cards during reconnaissance; product detail product ID 40 showed `$123.20` in one inspection and `$122.00` in a later inspection.
- Product inventory, pricing, promotions, result ordering, and catalog identity are mutable. Tests should assert stable behavior and visible structure where practical, not hard-code a permanent price or result count.
- Search input placeholder observed: `Search For Products`.
- Registration fields observed: first name, last name, email, telephone, password, password confirmation; customer-group/newsletter choices and an agreement checkbox were present.

## Data by workflow

| Workflow | Data approach | Safety/cleanup |
|---|---|---|
| Homepage/category/search | Known visible labels and broad query terms; assert meaningful result shape | Read-only; do not rely on catalog being unchanged |
| Product details | Select a product discovered from current results | Do not submit purchase actions during smoke checks |
| Cart | One visible catalog product (`iPhone`), quantity one, then two, zero, or -1 | Remove item after test; cleanup is asserted; stop if cleanup is unavailable |
| Registration/login | Blank registration form for validation; synthetic invalid login only for manual reconnaissance | Registration success can create persistent data and has no verified cleanup. Login attempts triggered a one-hour lockout after repeated submissions, so invalid-login and empty-login submits are not automated against the shared demo. |
| Wishlist | A synthetic account and visible catalog item | Remove entry; authenticated flow is unverified |
| Checkout | Synthetic non-payment fields only, if safely accessible | Do not enter payment information or place a real order; stop before final order action |
| API | No data defined | Wait for a documented supported API and safe environment |

## Generation and storage

For future account workflows, generate unique identifiers in test code using a timestamp/random suffix only after a disposable account flow is confirmed. Keep deterministic fixture values for non-unique search terms and product selection. Store non-secret defaults in source-controlled fixtures only when stable. Keep `.env` files and generated evidence out of Git; provide a sanitized `.env.example` only if needed.

## Unverified assumptions

- Whether registration accepts reserved synthetic domains and whether verification email is required.
- Whether created accounts, cart state, wishlist entries, or orders can be deleted.
- Which product options and quantity limits are enforced.
- Whether a dedicated API or test environment exists.
- Whether the login-attempt lockout is scoped to the account, client session, or public demo; avoid repeated login attempts until a dedicated test environment is available.
