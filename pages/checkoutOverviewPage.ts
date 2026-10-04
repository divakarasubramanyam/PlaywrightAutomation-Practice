import {expect, Locator, Page} from "@playwright/test";

export class CheckoutOverviewPage {
    readonly page: Page;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly postalCodeInput: Locator;
    readonly continueButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstNameInput = page.getByRole('textbox', { name: 'First Name' });
        this.lastNameInput = page.getByRole('textbox', { name: 'Last Name' });
        this.postalCodeInput = page.getByRole('textbox', { name: 'Zip/Postal Code' });
        this.continueButton = page.getByRole('button', { name: 'Continue' });
    }

    async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }

    async gotoCheckoutCompletePage() {
        await this.continueButton.click();
        await expect(this.page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
    }
}
