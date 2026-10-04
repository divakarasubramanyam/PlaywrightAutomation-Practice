import { test, expect } from '@playwright/test';

test('Download File', async({page}) => {

    await page.goto('https://demoqa.com/upload-download');
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', {name:'Download'}).click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe('sampleFile.jpeg');
    await download.saveAs('downloads/' + download.suggestedFilename());
});