# Shopware 6 Guest Checkout Automation

This repository contains the end-to-end test suite for the Shopware 6 demo storefront, covering the "Cash on Delivery" guest checkout flow.

## Setup
1. Clone this repository.
2. Install dependencies: `npm install`
3. Run tests in headed mode: `npx playwright test --headed`

## Tech Stack
* **Framework:** Playwright (TypeScript)
* **Design Pattern:** Page Object Model (POM) for maintainable, reusable locators.

## Future Improvements
If I had more time, I would:
* Implement a **Data Factory** to dynamically generate user data (faker.js) to avoid hardcoded values.
* Add **API-based setup** to inject items into the cart, bypassing the UI for the initial steps and making the test faster and more stable.
* Increase test coverage by adding negative test scenarios, such as attempting checkout with an empty zip code or invalid email format.
