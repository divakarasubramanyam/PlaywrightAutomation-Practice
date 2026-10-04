import {test as setup} from '@playwright/test';
import { testConfig } from '../testconfig';
import { LoginPage } from '../pages/loginPage';


setup('Authenticate', async ({page}) => {
    const loginPage = new LoginPage(page);
    await page.goto('/');
    await loginPage.login(testConfig.Sauce_Demo_Username, testConfig.Sauce_Demo_Password);
    await loginPage.verifyLoginPage();
    await page.context().storageState({ path: 'playwright/.auth/user.json' });
});
