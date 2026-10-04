import { test, expect } from '@playwright/test';

test('Upload File', async ({page}) => {
    
    await page.goto('https://practice.expandtesting.com/upload');
    await page.setInputFiles('#fileInput', 'files/sampleupload.pdf');
    await page.getByRole('button', {name:'Upload'}).click();
    await expect(page.locator('#uploaded-files')).toContainText('sampleupload.pdf');

});