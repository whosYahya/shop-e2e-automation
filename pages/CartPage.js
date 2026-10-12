export class CartPage {
  constructor(page) {
    this.page = page;
    this.content = page.locator('#content');
    this.emptyState = this.content.getByText('Your shopping cart is empty!', { exact: true });
    this.itemTable = this.content.locator('table').filter({ hasText: 'Product Name' });
    this.summaryTable = this.content.locator('table').filter({ hasText: 'Sub-Total:' });
  }

  async goto() {
    await this.page.goto('/index.php?route=checkout/cart');
  }

  productRow(productName) {
    return this.itemTable.getByRole('row').filter({ hasText: productName });
  }

  quantityInput(productName) {
    return this.productRow(productName).getByRole('textbox');
  }

  lineTotal(productName) {
    return this.productRow(productName).getByRole('cell').last();
  }

  cartTotal() {
    return this.summaryTable.getByRole('row').last().getByRole('cell').nth(1);
  }

  async updateQuantity(productName, quantity) {
    const row = this.productRow(productName);
    await row.getByRole('textbox').fill(quantity);
    await row.locator('button[title="Update"]').click();
  }

  async removeProduct(productName) {
    await this.productRow(productName).locator('button[title="Remove"]').click();
  }
}
