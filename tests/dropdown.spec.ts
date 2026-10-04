import { test, expect } from '@playwright/test';

test('Custom Dropdown Handling', async({page}) => {

    await page.goto('https://demoqa.com/select-menu');

    const customDropdown = page.locator('#selectOne');
    await customDropdown.click();
    await page.getByText('Prof.', { exact: true }).click();
    await expect(customDropdown).toContainText('Prof.');
    await expect(page.locator('.css-1dimb5e-singleValue')).toHaveText('Prof.');
});

test('Native Dropdown Handling', async({page}) => {

    await page.goto('https://demoqa.com/select-menu');
    const nativeDropdown = page.locator('#oldSelectMenu');
    await nativeDropdown.selectOption('Yellow');
    await expect(nativeDropdown).toContainText('Yellow');
    await expect(nativeDropdown).toHaveValue('3');
});

