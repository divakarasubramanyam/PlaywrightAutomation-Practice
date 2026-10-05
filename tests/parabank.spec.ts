import {expect, test} from '@playwright/test';

const PARABANK = 'https://parabank.parasoft.com/parabank/index.htm';

test.describe('Parabank Tests', () => {
    test('verifying the title', async ({page}) => {
        await page.goto(PARABANK);
        await expect(page).toHaveTitle(/ParaBank/);
    });

    test('validate Parabank welcome Page', async ({page}) => {
        await page.goto(PARABANK);
        await expect(page.getByRole('heading', {name: 'Customer Login'})).toBeVisible();
        await expect(page.locator("//input[@name='username']")).toBeVisible();
        await expect(page.locator("text=Password")).toBeVisible();
        await expect(page.getByRole('button', {name: 'Log In'})).toBeVisible();
        await expect(page.getByRole('link', {name: 'Register'})).toBeVisible();
        await expect(page.getByRole('link', {name: 'Forgot login info?'})).toBeVisible();
    })

    test('validate Parabank Register Page',
        //{tag : '@smokeTest'}, 
        async ({page}, testInfo,) => {
        console.log(`Timeout before test.slow() : ${testInfo.timeout} ms`);
        test.slow();
        console.log(`Timeout after test.slow() : ${testInfo.timeout} ms`);
        await page.goto(PARABANK);
        await page.getByRole('link', {name: 'Register'}).click();
        await expect(page).toHaveURL(/register/);
    })

    test('validate Parabank Registration', async ({page}) => {
        await page.goto(PARABANK);
        await page.getByRole('link', {name: 'Register'}).click();
        await page.locator('[id="customer.firstName"]').fill('John');
        await page.locator('[id="customer.lastName"]').fill('Doe');
        await page.locator('[id="customer.address.street"]').fill('742 Evergreen');
        await page.locator('[id="customer.address.city"]').fill('Indianapolis');
        await page.locator('[id="customer.address.state"]').fill('Indiana');
        await page.locator('[id="customer.address.zipCode"]').fill('46001');
        await page.locator('[id="customer.phoneNumber"]').fill('+15555551234');
        await page.locator('[id="customer.ssn"]').fill('12345');
        await page.locator('[id="customer.username"]').fill('doeedudes');
        await page.locator('[id="customer.password"]').fill('Automation$test');
        await page.locator('#repeatedPassword').fill('Automation$test');
        await page.getByRole('button', { name: 'Register' }).click();
        await expect(page.locator('[id="rightPanel"]')).toContainText('Welcome doeedudes');
        await expect(page.getByText('Your account was created successfully. You are now logged in.')).toBeVisible();
    });

    test('validate Parabank soft assertions', async ({page}) => {
        await page.goto(PARABANK);
        await page.getByRole('link', {name: 'Register'}).click();
        await page.getByRole('button', { name: 'Register' }).click();
        await expect.soft(page.getByText('First name is required.')).toBeVisible();
        await expect.soft(page.getByText('Last name is required.')).toBeVisible();
        await expect.soft(page.getByRole('cell', { name: 'Address is required.'})).toBeVisible();
        await expect.soft(page.getByText('City is required.')).toBeVisible();
        await expect.soft(page.getByRole('cell', { name: 'State is required.'})).toBeVisible();
        await expect.soft(page.getByText('Zip Code is required.')).toBeVisible();
        await expect.soft(page.getByText('Social Security Number is')).toBeVisible();
        await expect.soft(page.getByText('Username is required.')).toBeVisible();
        await expect.soft(page.getByText('Password is required.')).toBeVisible();
        await expect.soft(page.getByText('Password confirmation is')).toBeVisible();
        expect(test.info().errors).toHaveLength(0);
    });

    test('validate assert the mismatch passwords', async ({page}) => {
        await page.goto(PARABANK);
        await page.getByRole('link', {name: 'Register'}).click();
        await page.locator('[id="customer.firstName"]').fill('John');
        await page.locator('[id="customer.lastName"]').fill('Doe');
        await page.locator('[id="customer.address.street"]').fill('742 Evergreen');
        await page.locator('[id="customer.address.city"]').fill('Indianapolis');
        await page.locator('[id="customer.address.state"]').fill('Indiana');
        await page.locator('[id="customer.address.zipCode"]').fill('46001');
        await page.locator('[id="customer.phoneNumber"]').fill('+15555551234');
        await page.locator('[id="customer.ssn"]').fill('12345');
        await page.locator('[id="customer.username"]').fill('doeedudes');
        await page.locator('[id="customer.password"]').fill('Automation$test');
        await page.locator('#repeatedPassword').fill('Automation$test1');
        await page.getByRole('button', { name: 'Register' }).click();
        await expect(page.getByText('Passwords did not match.')).toBeVisible();
    });
});