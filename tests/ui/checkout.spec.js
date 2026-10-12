import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage.js';
import { SearchPage } from '../../pages/SearchPage.js';
import { ProductPage } from '../../pages/ProductPage.js';
import { CartPage } from '../../pages/CartPage.js';
import { CheckoutPage } from '../../pages/CheckoutPage.js';

async function addIPhoneToCart(page) {
  const homePage = new HomePage(page);
  const searchPage = new SearchPage(page);
  const productPage = new ProductPage(page);

  await homePage.goto();
  await homePage.searchFor('iPhone');
  await searchPage.openProduct('iPhone');
  await productPage.addToCartButton.click();
  await expect(page.getByRole('alert')).toContainText('Success: You have added iPhone to your shopping cart!');
}

async function removeIPhoneIfPresent(cartPage) {
  await cartPage.goto();
  if (await cartPage.productRow('iPhone').count()) {
    await cartPage.removeProduct('iPhone');
  }
}

test('CHECK-001: empty cart blocks checkout and returns to the cart', async ({ page }) => {
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await checkoutPage.goto();

  await expect(page).toHaveURL(/route=checkout\/cart/);
  await expect(page).toHaveTitle('Shopping Cart');
  await expect(cartPage.emptyState).toBeVisible();
});

test('CHECK-002: unauthenticated cart checkout exposes guest option and order review', async ({ page }) => {
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  try {
    await addIPhoneToCart(page);
    await cartPage.goto();
    await checkoutPage.openFromCart();

    await expect(checkoutPage.loginChoice).toBeVisible();
    await expect(checkoutPage.registerChoice).toBeVisible();
    await expect(checkoutPage.guestChoice).toBeVisible();
    await expect(checkoutPage.productRow('iPhone')).toBeVisible();
    await expect(checkoutPage.productQuantity('iPhone')).toHaveValue('1');
    await expect(checkoutPage.totalAmount()).toHaveText(/\$\d+\.\d{2}/);
    await expect(checkoutPage.paymentMethod).toBeChecked();
    await expect(checkoutPage.shippingMethod).toBeChecked();
  } finally {
    await removeIPhoneIfPresent(cartPage);
  }
});

test('CHECK-003: blank guest checkout remains on the form with required fields', async ({ page }) => {
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  try {
    await addIPhoneToCart(page);
    await cartPage.goto();
    await checkoutPage.openFromCart();
    await checkoutPage.chooseGuestCheckout();

    await expect(checkoutPage.guestRadio).toBeChecked();
    await expect(checkoutPage.firstName).toBeVisible();
    await expect(checkoutPage.lastName).toBeVisible();
    await expect(checkoutPage.email).toBeVisible();
    await expect(checkoutPage.telephone).toBeVisible();
    await expect(checkoutPage.address).toBeVisible();
    await expect(checkoutPage.city).toBeVisible();
    await expect(checkoutPage.postcode).toBeVisible();
    await expect(checkoutPage.country).toBeVisible();
    await expect(checkoutPage.region).toBeVisible();
    await expect(checkoutPage.requiredFieldsNote).toBeVisible();

    await checkoutPage.continueButton.click();

    await expect(page).toHaveURL(/route=checkout\/checkout/);
    await expect(checkoutPage.checkoutForm).toBeVisible();
    await expect(checkoutPage.productRow('iPhone')).toBeVisible();
  } finally {
    await removeIPhoneIfPresent(cartPage);
  }
});
