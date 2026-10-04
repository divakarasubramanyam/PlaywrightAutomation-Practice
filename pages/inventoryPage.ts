import { expect, Page, Locator} from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
    readonly addToCartButton: Locator;
    readonly cartButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addToCartButton = page.getByRole('button', { name: 'Add to cart' });
        this.cartButton = page.locator('.shopping_cart_badge');
    }

    async verifyInventoryPage() {
        await this.page.goto('/inventory.html');
        await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html');
    }

    async addToCart(n: number) {
      for (let i = 0; i < n; i++) {
        await this.addToCartButton.nth(i).click();
      }
      await expect(this.cartButton).toHaveText(n.toString());
    }

    async goToCart() {
      await this.cartButton.click();
      await expect(this.page).toHaveURL('https://www.saucedemo.com/cart.html');
    }
}
