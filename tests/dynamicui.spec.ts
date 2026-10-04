import { test, expect } from '@playwright/test';

test('Dynamic UI Elements', async({page}) => {

    await page.goto('https://demoqa.com/dynamic-properties');
    const enableAfterButton = page.getByRole('button', {name:'Will enable 5 seconds'});
    await expect(enableAfterButton).toBeDisabled();
    await expect(enableAfterButton).toBeEnabled({timeout: 6000});
    await enableAfterButton.click();
    await page.reload();
    const visibleAfterButton = page.getByRole('button', {name:'Visible after 5 seconds'});
    await expect(visibleAfterButton).toBeHidden();
    await expect(visibleAfterButton).toBeEnabled({timeout: 6000});
    await visibleAfterButton.click();
    await page.reload();
    const randomId = await page.getByText('This text has random Id').getAttribute('id');
    console.log('Random ID:', randomId);
    await page.reload();
    const randomIdAfterReload = await page.getByText('This text has random Id').getAttribute('id');
    console.log('Random ID after reload:', randomIdAfterReload);
});
