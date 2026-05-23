import { test, expect } from '@playwright/test';
import { HomePage } from './HomePage';
import { CheckoutPage } from './CheckoutPage';

test.describe('Guest Checkout Flow', () => {
    
    test('TC-P01: User can complete guest checkout using Cash on Delivery', async ({ page }) => {
        // Initialize Page Objects
        const homePage = new HomePage(page);
        const checkoutPage = new CheckoutPage(page);

        // Test Data
        const testUser = {
            firstName: 'Fisnik',
            lastName: 'Berisha',
            email: 'qa-test-fisnik@example.com',
            street: 'Test Boulevard 123',
            zip: '10000',
            city: 'Prishtina',
            country: 'Germany' // Note: Ensure this matches a valid dropdown option in their store
        };

        // Step 1: Navigate and add product
        await homePage.navigate();
        await homePage.searchAndAddProduct('Demo'); // Replace with a real product name from their demo
        await homePage.proceedToCheckout();

        // Step 2: Checkout process
        await checkoutPage.fillGuestDetails(testUser);
        
        // Step 3: Payment and Submit
        await checkoutPage.selectCashOnDelivery();
        await checkoutPage.submitOrder();

        // Step 4: Assertions (Crucial for passing the test)
        await checkoutPage.verifyOrderSuccess();
    });
});