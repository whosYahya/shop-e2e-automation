# API Test Plan

## Current decision

**Status: storefront API testing is blocked pending a verified API target.** No `ShopFlow - API Regression` collection export is included yet because the project has no verified storefront JSON API endpoint, request contract, or safe API test environment. The existing `postman/collections/` and `postman/environments/` folders remain placeholders.

On 2026-10-13, the storefront homepage was reloaded with browser network observation enabled. The first-party document request was `GET https://ecommerce-playground.lambdatest.io/index.php?route=common/home` and returned the rendered storefront page. No first-party `fetch` or XHR JSON request was observed during that homepage load. This does not prove that no API exists elsewhere in the application; it means no API contract was established by this inspection. No API requests were sent to the store.

The public OpenCart documentation describes the OpenCart product, but is not documentation for this particular LambdaTest demo instance or a guarantee that API functionality is enabled on it. Do not treat storefront page routes such as `route=product/search` or `route=checkout/cart` as REST resources.

## Postman Echo learning exercise

The user reports that a Postman Echo learning request passed four assertions. This is a separate HTTP-testing exercise, not e-commerce backend coverage. It was not independently rerun for Phase 6, and no Echo collection export is present in this repository. Keep Echo requests outside `ShopFlow - API Regression` so the collection name cannot imply storefront coverage.

## Recommended next target

Use a small local practice API controlled by the project, with an OpenAPI contract and deterministic/resettable test data. This gives the collection stable positive, invalid-input, and missing-resource cases without relying on a public demo's private backend or mutating shared data. Postman Echo can remain a separate learning target for HTTP request/response mechanics.

## Intended collection once a target is verified

- **Name:** `ShopFlow - API Regression`
- **Export format:** Postman Collection v2.1 JSON. This is a documented collection format and is suitable for Postman and later local-file execution with Newman.
- **Environment:** a sanitized environment export under `postman/environments/` with only non-secret values such as a documented `baseUrl` and a calibrated `maxResponseTimeMs`. Credentials, tokens, cookies, and private environment exports must remain out of Git.
- **Requests:** add only documented or reliably observed JSON endpoints after confirming method, response format, authentication requirements, and test safety.
- **Assertions:** for each verified request, cover documented status codes, JSON content type, structure and required fields, stable data types/values, supported invalid-input and missing-resource responses, and a response-time threshold based on an observed baseline.
- **Safety:** prefer read-only requests. Do not exercise order creation, payment, customer creation, inventory changes, or other mutations against the shared demo without an explicitly approved disposable environment and cleanup contract.

No request examples, endpoint variables, schemas, or expected status codes are added until those facts are established.

## Execution plan

No collection exists to import or run today. After a verified API and collection export are available:

1. In Postman Desktop, import the collection JSON from `postman/collections/` and, if provided, import the sanitized environment from `postman/environments/`.
2. Select the intended environment and verify its base URL before sending requests.
3. Select the collection and choose **Run** to open the Collection Runner; run locally and review each request's response and assertion results.
4. For a later CI phase, use Newman with the exported v2.1 collection and a CI-provided environment/secrets source. Do not add a runner dependency, npm script, or workflow until there is a valid collection and target.

The existing `npm run test:api` script is a Playwright placeholder for `tests/api/`; it does not execute Postman and no `tests/api/` suite exists. It is not evidence of API coverage or a passing API run.

## Validation record

- Repository inspection found no collection or environment export; only the existing `.gitkeep` placeholders are present.
- Live homepage network observation found no first-party JSON `fetch`/XHR request during that page load. No API call was attempted.
- No Postman collection run occurred in Phase 6. The Echo result is user-reported and remains separate from this project's backend test results.
- A collection export is intentionally deferred rather than creating an empty or fabricated ShopFlow suite.

## References

- [OpenCart documentation](https://docs.opencart.com/) — general product documentation, not an API contract for this demo instance.
- [Postman Collection v2.1 schema](https://schema.postman.com/json/collection/v2.1.0/collection.json).
- [Postman Collection Runner documentation](https://learning.postman.com/docs/tests-and-scripts/running-collections/intro-to-collection-runs/).
- [Newman documentation](https://github.com/postmanlabs/newman) — local collection runner compatible with exported collection JSON.
