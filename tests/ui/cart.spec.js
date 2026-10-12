import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage.js';
import { SearchPage } from '../../pages/SearchPage.js';
import { ProductPage } from '../../pages/ProductPage.js';
import { CartPage } from '../../pages/CartPage.js';

async function openIPhone(page) {
  const homePage = new HomePage(page);
  const searchPage = new SearchPage(page);
  const productPage = new ProductPage(page);

  await homePage.goto();
  await homePage.searchFor('iPhone');
  await searchPage.openProduct('iPhone');

  return productPage;
}

async function addIPhoneToCart(page, productPage, cartPage) {
  await productPage.addToCartButton.click();
  await expect(page.getByRole('alert')).toContainText('Success: You have added');
  await cartPage.goto();
}

async function removeIPhoneIfPresent(cartPage) {
  await cartPage.goto();
  if (await cartPage.productRow('iPhone').count()) {
    await cartPage.removeProduct('iPhone');
  }
}

test('CART-001: empty cart shows the observed empty state', async ({ page }) => {
  const cartPage = new CartPage(page);

  await cartPage.goto();

  await expect(page).toHaveTitle('Shopping Cart');
  await expect(cartPage.emptyState).toBeVisible();
});

test('CART-002: add iPhone, update quantity and totals, then clean up', async ({ page }) => {
  const cartPage = new CartPage(page);
  const productPage = await openIPhone(page);
  let cleanupRequired = true;

  try {
    await addIPhoneToCart(page, productPage, cartPage);

    await expect(cartPage.productRow('iPhone')).toBeVisible();
    await expect(cartPage.quantityInput('iPhone')).toHaveValue('1');
    const originalLineTotal = await cartPage.lineTotal('iPhone').innerText();

    await cartPage.updateQuantity('iPhone', '2');

    await expect(cartPage.quantityInput('iPhone')).toHaveValue('2');
    await expect(cartPage.lineTotal('iPhone')).not.toHaveText(originalLineTotal);
    await expect(cartPage.cartTotal()).toHaveText(await cartPage.lineTotal('iPhone').innerText());

    await cartPage.removeProduct('iPhone');
    await expect(cartPage.emptyState).toBeVisible();
    cleanupRequired = false;
  } finally {
    if (cleanupRequired) {
      await removeIPhoneIfPresent(cartPage);
    }
  }
});

test('CART-003: zero and negative quantities remove the item', async ({ page }) => {
  const cartPage = new CartPage(page);

  for (const quantity of ['0', '-1']) {
    const productPage = await openIPhone(page);

    try {
      await addIPhoneToCart(page, productPage, cartPage);
      await expect(cartPage.quantityInput('iPhone')).toHaveValue('1');

      await cartPage.updateQuantity('iPhone', quantity);

      await expect(cartPage.emptyState).toBeVisible();
    } finally {
      await removeIPhoneIfPresent(cartPage);
    }
  }
});
