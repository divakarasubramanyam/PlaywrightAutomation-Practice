import {Page, Locator, expect} from "@playwright/test";
export class CheckoutCompletePage {
    readonly page: Page;
    readonly backHomeButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.backHomeButton = page.getByRole('button', { name: 'Back Home' });
    }

    async backToInventory() {
        await this.backHomeButton.click();
        await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html');
    }

}