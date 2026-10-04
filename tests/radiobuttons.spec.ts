import { test, expect } from '@playwright/test';

test('Radio Buttons Handling', async({page}) => {

    await page.goto('https://demoqa.com/radio-button');

    const yesRadioButton = page.getByLabel('Yes');
    const impressiveRadioButton = page.getByLabel('Impressive');
    const noRadioButton = page.getByLabel('No');

    await yesRadioButton.click();
    await expect(page.locator('.text-success')).toHaveText('Yes');
    await impressiveRadioButton.click();
    await expect(impressiveRadioButton).toBeChecked();
    await expect(page.locator('.text-success')).toHaveText('Impressive');
    await expect(yesRadioButton).not.toBeChecked();
    await expect(noRadioButton).toBeDisabled();
});

