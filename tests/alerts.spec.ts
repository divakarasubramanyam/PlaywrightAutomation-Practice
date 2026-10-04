import { test, expect } from '@playwright/test';

test('Simple Alert Handling', async({page}) => {

    await page.goto('https://demoqa.com/alerts');
    page.on('dialog', async dialog => {
        expect(dialog.type()).toBe('alert');
        expect(dialog.message()).toBe('You clicked a button');
        await dialog.accept();
    });

    await page.locator('#alertButton').click();

});

test('Timed Alert Handling', async({page}) => {

    await page.goto('https://demoqa.com/alerts');
    page.on('dialog', async dialog => {
        expect(dialog.type()).toBe('alert');
        expect(dialog.message()).toBe('This alert appeared after 5 seconds');
        await dialog.accept();
    });

    await page.locator('#timerAlertButton').click();
});

test('Confirm Alert Handling', async({page}) => {
 
    await page.goto('https://demoqa.com/alerts');
    page.on('dialog', async dialog => {
        expect(dialog.type()).toBe('confirm');
        expect(dialog.message()).toBe('Do you confirm action?');
        await dialog.accept();
    });

    await page.locator('#confirmButton').click();
    await expect(page.locator('#confirmResult')).toHaveText('You selected Ok');

});

test('Cancel Confirm Alert Handling', async({page}) => {
 
    await page.goto('https://demoqa.com/alerts');
    page.on('dialog', async dialog => {
        expect(dialog.type()).toBe('confirm');
        expect(dialog.message()).toBe('Do you confirm action?');
        await dialog.dismiss();
    });

    await page.locator('#confirmButton').click();
    await expect(page.locator('#confirmResult')).toHaveText('You selected Cancel');
    
});

test('Prompt Alert Handling', async({page}) => {
 
    await page.goto('https://demoqa.com/alerts');
    page.on('dialog', async dialog => {
        expect(dialog.type()).toBe('prompt');
        expect(dialog.message()).toBe('Please enter your name');
        await dialog.accept('Aarav');
    });

    await page.locator('#promtButton').click();
    await expect(page.locator('#promptResult')).toHaveText('You entered Aarav');

});