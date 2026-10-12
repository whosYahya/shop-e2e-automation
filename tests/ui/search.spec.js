import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage.js';
import { SearchPage } from '../../pages/SearchPage.js';

test('SEARCH-001: search displays matching iPhone products', async ({ page }) => {
  const homePage = new HomePage(page);
  const searchPage = new SearchPage(page);

  await homePage.goto();
  await homePage.searchFor('iPhone');

  await expect(page).toHaveTitle('Search - iPhone');
  await expect(searchPage.resultsHeading).toHaveText('Search - iPhone');
  await expect(searchPage.productLinks('iPhone').first()).toBeVisible();
});

test('SEARCH-002: search displays the observed empty-results message', async ({ page }) => {
  const homePage = new HomePage(page);
  const searchPage = new SearchPage(page);
  const missingProduct = 'zz_nonexistent_product_9f3a';

  await homePage.goto();
  await homePage.searchFor(missingProduct);

  await expect(page).toHaveTitle(`Search - ${missingProduct}`);
  await expect(searchPage.emptyState).toBeVisible();
});
