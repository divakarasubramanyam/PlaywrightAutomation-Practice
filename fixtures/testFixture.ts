import {test as base} from '@playwright/test';
import {LoginPage} from '../pages/loginPage';
import { InventoryPage } from '../pages/inventoryPage';
import { CartPage } from '../pages/cartPage';
import { CheckoutFinalPage } from '../pages/checkoutFinalPage';
import { CheckoutOverviewPage } from '../pages/checkoutOverviewPage';
import { CheckoutCompletePage } from '../pages/checkoutCompletePage';

type MyFixtures = {
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
    cartPage: CartPage;
    checkoutOverviewPage: CheckoutOverviewPage;
    checkoutFinalPage: CheckoutFinalPage;
    checkoutCompletePage: CheckoutCompletePage;
};

export const test = base.extend<MyFixtures>({
    loginPage: async ({page}, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
    inventoryPage: async ({page}, use) => {
        const inventoryPage = new InventoryPage(page);
        await use(inventoryPage);
    },
    cartPage: async ({page}, use) => {
        const cartPage = new CartPage(page);
        await use(cartPage);
    },
    checkoutOverviewPage: async ({page}, use) => {
        const checkoutOverviewPage = new CheckoutOverviewPage(page);
        await use(checkoutOverviewPage);
    },
    checkoutFinalPage: async ({page}, use) => {
        const checkoutFinalPage = new CheckoutFinalPage(page);
        await use(checkoutFinalPage);
    },
    checkoutCompletePage: async ({page}, use) => {
        const checkoutCompletePage = new CheckoutCompletePage(page);
        await use(checkoutCompletePage);
    }

});
