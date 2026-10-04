import { test, expect } from '@playwright/test';

test('Frame Handling', async({page}) => {

    await page.goto('https://demoqa.com/frames');
    const frame1 = page.frameLocator('#frame1');
    const frame2 = page.frameLocator('#frame2');
    await expect(frame1.locator('#sampleHeading')).toHaveText('This is a sample page');
    await expect(frame2.locator('#sampleHeading')).toHaveText('This is a sample page');
    await expect(page.locator('#sampleHeading')).toHaveCount(0);
});

test('Nested Frame Handling', async({page}) => {
    await page.goto('https://demoqa.com/nestedframes');
    const parentFrame = page.frameLocator('#frame1');
    const childFrame = parentFrame.frameLocator('iframe');
    await expect(parentFrame.locator('body')).toHaveText('Parent frame');
    await expect(childFrame.locator('body')).toHaveText('Child Iframe');
});