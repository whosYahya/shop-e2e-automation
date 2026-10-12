import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage.js';
import { SearchPage } from '../../pages/SearchPage.js';
import { ProductPage } from '../../pages/ProductPage.js';

test('PROD-001: search result opens iPhone details with purchase controls', async ({ page }) => {
  const homePage = new HomePage(page);
  const searchPage = new SearchPage(page);
  const productPage = new ProductPage(page);

  await homePage.goto();
  await homePage.searchFor('iPhone');
  await searchPage.openProduct('iPhone');

  await expect(page).toHaveTitle('iPhone');
  await expect(productPage.productHeading('iPhone')).toBeVisible();
  await expect(productPage.quantity).toHaveValue('1');
  await expect(productPage.buyNowButton).toBeVisible();
});
