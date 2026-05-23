import { Page, expect } from '@playwright/test';

export class HomePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

   async navigate() {
        await this.page.goto('https://www.shopware6-demo.development-s25.com/');
        
        // Removing the 'if' statement forces Playwright to wait until the button 
        // actually appears on the screen before clicking it.
        await this.page.getByRole('button', { name: 'Nur technisch notwendige' }).click();
    }

async searchAndAddProduct(productName: string) {
        const searchBox = this.page.getByRole('combobox', { name: 'Suchbegriff eingeben' });
        
        // 1. Search for the product
        await searchBox.fill(productName);
        await searchBox.press('Enter');
        await this.page.waitForLoadState('networkidle'); 

        // 2. Click on the specific product link in the search results
        await this.page.getByRole('link', { name: 'Demo Produkt' }).click();

        // 3. Add to shopping cart (This will likely be our next failure point!)
        await this.page.getByRole('button', { name: 'In den Warenkorb' }).click();
    }
 async proceedToCheckout() {
        // 1. Open the cart menu
        await this.page.locator('.header-cart-btn').click();
        
        // 2. Lock onto the checkout button and wait for it to exist
        const checkoutBtn = this.page.locator('.begin-checkout-btn');
        await checkoutBtn.waitFor({ state: 'visible' });
        
        // 3. Pause for 500ms to let the Shopware slide-out animation finish
        await this.page.waitForTimeout(500); 
        
        // 4. Click it and explicitly wait for the new page to finish loading
        await checkoutBtn.click();
        await this.page.waitForLoadState('networkidle');
    }
}
