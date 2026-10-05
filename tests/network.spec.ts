import {test, expect} from '@playwright/test';

test('Monitor API request and response', async ({ page }) => {
    
    page.on('request', async (request) => {
        console.log('Request URL:', request.url());
        console.log('Request Method:', request.method());
    });
    page.on('response', async (response) => {
        console.log('Response URL:', response.url());
        console.log('Response Status:', response.status());
    });

    await page.goto('https://reqres.in/api/users?page=2');
});

test('Wait for API response and validate', async ({ page }) => {
    const responsePromise = page.waitForResponse(
        response => response.url().includes('api/users/2') && response.status() === 200);
    await page.goto('https://reqres.in/api/users/2');
    const response = await responsePromise;
    console.log('Response:', await response.json());
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
});

test('Mock API response', async ({ page }) => {
    await page.route('**/api/users/2', async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({ data: { id: 2, email: 'jane.doe@example.com' } })
        });
    });
    await page.goto('https://reqres.in/api/users/2');
    console.log('Mocked Response:', await page.evaluate(() => fetch('/api/users/2').then(res => res.json())));
});

test('Modify API response', async ({ page }) => {
    await page.route('**/api/users/2', async (route) => {
        const response = await route.fetch();
        const json = await response.json();
        json.data.email = 'modified@example.com';
        await route.fulfill({
            response,
            json: json
        });
    });
    await page.goto('https://reqres.in/api/users/2');
    console.log('Modified Response:', await page.evaluate(() => fetch('/api/users/2').then(res => res.json())));
});

// test('Block API request', async ({ page }) => {
//     await page.route('**/api/users/**', route => { route.abort(); });
//     await page.goto('https://reqres.in/api/users/2');
//     console.log('Request blocked, check console for errors.');
// });

test('Simulate API failure ',  async ({ page }) => {
    await page.route('**/api/users/2', async (route) => {
        await route.fulfill({
            status: 500,
            contentType: 'application/json',
            body: JSON.stringify({ error: 'Internal Server Error' })
        });
    });
    await page.goto('https://reqres.in/api/users/2');
    const response = await page.evaluate(() => fetch('/api/users/2').then(res => res.json()));
    console.log('Simulated Failure Response:', response);
    expect(response.error).toBe('Internal Server Error');
});