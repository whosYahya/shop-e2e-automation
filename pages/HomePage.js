export class HomePage {
  constructor(page) {
    this.page = page;
    this.searchInput = page.getByRole('textbox', { name: 'Search For Products' });
    this.categoryNavigation = page.getByRole('button', {
      name: 'Shop by Category',
      exact: true,
    });
  }

  async goto() {
    await this.page.goto('/index.php?route=common/home');
  }

  async searchFor(term) {
    await this.searchInput.fill(term);
    await Promise.all([
      this.page.waitForURL((url) =>
        url.searchParams.get('route') === 'product/search' &&
        url.searchParams.get('search') === term,
      ),
      this.searchInput.press('Enter'),
    ]);
  }
}
