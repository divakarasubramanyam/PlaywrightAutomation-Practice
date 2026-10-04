import { test, expect } from '@playwright/test';

test('Validate Native Dropdown ', async({page}) => {

    await page.goto('https://www.saucedemo.com/');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    const productFilter = page.locator('.product_sort_container');
    //Low to High
    //await productFilter.selectOption('lohi');
    //await productFilter.selectOption({index:2});
    await productFilter.selectOption({label: 'Price (low to high)'});
    await expect(productFilter).toHaveValue('lohi');

});