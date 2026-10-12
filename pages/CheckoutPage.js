export class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.content = page.locator('#content');
    this.checkoutForm = page.locator('#form-checkout');
    this.checkoutLink = page.getByRole('link', { name: 'Checkout', exact: true });

    this.loginChoice = page.locator('label[for="input-account-login"]');
    this.registerChoice = page.locator('label[for="input-account-register"]');
    this.guestChoice = page.locator('label[for="input-account-guest"]');
    this.guestRadio = page.locator('#input-account-guest');

    this.requiredFieldsNote = page.getByText('* - Fields are required', { exact: true });
    this.firstName = page.locator('#input-payment-firstname');
    this.lastName = page.locator('#input-payment-lastname');
    this.email = page.locator('#input-payment-email');
    this.telephone = page.locator('#input-payment-telephone');
    this.address = page.locator('#input-payment-address-1');
    this.city = page.locator('#input-payment-city');
    this.postcode = page.locator('#input-payment-postcode');
    this.country = page.locator('#input-payment-country');
    this.region = page.locator('#input-payment-zone');

    this.paymentMethod = page.locator('[name="payment_method"][value="cod"]');
    this.shippingMethod = page.locator('[name="shipping_method"][value="flat.flat"]');
    this.continueButton = page.locator('#button-save');

    this.reviewTable = this.content.locator('table').filter({ hasText: 'PRODUCT NAME' });
    this.totalsTable = this.content.locator('table').filter({ hasText: 'Sub-Total:' });
  }

  async goto() {
    await this.page.goto('/index.php?route=checkout/checkout');
  }

  async openFromCart() {
    await this.checkoutLink.click();
    await this.page.waitForURL((url) => url.searchParams.get('route') === 'checkout/checkout');
  }

  async chooseGuestCheckout() {
    await this.guestChoice.click();
  }

  productRow(productName) {
    return this.reviewTable.getByRole('row').filter({ hasText: productName });
  }

  productQuantity(productName) {
    return this.productRow(productName).getByRole('spinbutton');
  }

  totalAmount() {
    return this.totalsTable.getByRole('row').last().getByRole('cell').nth(1);
  }
}
