import {expect, Page, Locator} from "@playwright/test";
export class CheckoutFinalPage {
    readonly page: Page;
    readonly finishButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.finishButton = page.getByRole('button', { name: 'Finish' });
    }

    async clickFinishButton() {
        await this.finishButton.click();
        await expect(this.page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
    }
}