import { test, expect } from '@playwright/test';

test('Web Table Handling', async({page}) => {

    await page.goto('https://demoqa.com/webtables');
    const tableRows = page.locator('.web-tables-wrapper table tbody tr');
    await expect(tableRows).toHaveCount(3);
    await expect(tableRows.first()).toContainText('Cierra');
    const searchInput = page.locator('#searchBox');
    await searchInput.fill('Kierra');
    await tableRows.filter({ hasText: 'Kierra' }).locator('[title="Edit"]').click();
    await expect(page.locator('#firstName')).toHaveValue('Kierra');
    await page.getByRole('button', {name: 'Close'}).click();
    await page.reload();
    await page.locator('[title="Delete"]').first().click();
    await expect(tableRows).toHaveCount(2);
});