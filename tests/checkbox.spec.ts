import { test, expect } from '@playwright/test';

test('Checkbox Handling', async({page}) => {

    await page.goto('https://demoqa.com/checkbox');
    const homeCheckbox = page.getByRole('checkbox', { name: 'Home' });
    await homeCheckbox.click();
    await expect(homeCheckbox).toBeChecked();
    const expectedresult = (await page.locator('#result').innerText()).replace(/\n/g, ' ').trim();
    console.log(expectedresult);
    expect(expectedresult).toEqual('You have selected : home desktop documents downloads notes commands workspace office wordFile excelFile react angular veu public private classified general');
    
    await page.reload();
    await page.locator('.rc-tree-switcher').first().click();
    const desktopCheckbox = page.getByRole('checkbox', { name: 'Select Desktop' });
    await desktopCheckbox.click();
    await expect(desktopCheckbox).toBeChecked();
    const expectedresult1 = (await page.locator('#result').innerText()).replace(/\n/g, ' ').trim();
    console.log(expectedresult1);
    expect(expectedresult1).toEqual('You have selected : desktop notes commands');
    
    await page.reload();
    await page.locator('.rc-tree-switcher').first().click();
    await page.locator('.rc-tree-switcher').nth(1).click();
    const notesCheckbox = page.getByRole('checkbox', { name: 'Select Notes' });
    await notesCheckbox.click();
    await expect(notesCheckbox).toBeChecked();
    const expectedresult2 = (await page.locator('#result').innerText()).replace(/\n/g, ' ').trim();
    console.log(expectedresult2);
    expect(expectedresult2).toEqual('You have selected : notes');
});


