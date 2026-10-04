import {expect, Locator, Page} from "@playwright/test";

export class CartPage {
    readonly page: Page;
    readonly checkoutButton: Locator;
    constructor(page: Page) {
        this.page = page;
        this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
    }

    async verifyCartPage() {
        await expect(this.page).toHaveURL('https://www.saucedemo.com/cart.html');
    }

    async goToCheckout() {
        await this.checkoutButton.click();
        await expect(this.page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');  
    }
}