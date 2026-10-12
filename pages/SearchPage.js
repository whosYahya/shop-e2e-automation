export class SearchPage {
  constructor(page) {
    this.page = page;
    this.resultsHeading = page.getByRole('heading', { level: 1 });
    this.emptyState = page.getByText(
      'There is no product that matches the search criteria.',
      { exact: true },
    );
  }

  productLinks(productName) {
    return this.page.getByRole('link', { name: productName, exact: true });
  }

  async openProduct(productName) {
    await this.productLinks(productName).first().click();
    await this.page.waitForURL((url) => url.searchParams.get('route') === 'product/product');
  }
}
