export class ProductPage {
  constructor(page) {
    this.page = page;
    this.quantity = page.getByRole('spinbutton', { name: 'Qty' });
    this.addToCartButton = page.getByRole('button', { name: 'Add to Cart', exact: true });
    this.buyNowButton = page.getByRole('button', { name: 'Buy now', exact: true });
  }

  productHeading(productName) {
    return this.page.getByRole('heading', { name: productName, level: 1, exact: true });
  }
}
