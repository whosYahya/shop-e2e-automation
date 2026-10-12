import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage.js';

test('HOME-001: homepage loads with search and category navigation', async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.goto();

  await expect(page).toHaveTitle('Your Store');
  await expect(homePage.categoryNavigation).toBeVisible();
  await expect(homePage.searchInput).toBeVisible();
});
