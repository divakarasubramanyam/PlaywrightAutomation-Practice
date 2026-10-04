import {test} from '../fixtures/testFixture';

test.use({ 
    storageState: 'playwright/.auth/user.json' 
});

test('Add items to cart and complete checkout', async ({inventoryPage, cartPage, checkoutOverviewPage, checkoutFinalPage, checkoutCompletePage}) => {
    await inventoryPage.verifyInventoryPage();
    await inventoryPage.addToCart(2);
    await inventoryPage.goToCart();
    await cartPage.goToCheckout();
    await checkoutOverviewPage.fillCheckoutInformation('Peter', 'Parker', '12345');
    await checkoutOverviewPage.gotoCheckoutCompletePage();
    await checkoutFinalPage.clickFinishButton();
    await checkoutCompletePage.backToInventory();
});
