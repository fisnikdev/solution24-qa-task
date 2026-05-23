import { Page, expect } from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async selectGuestCheckout() {
        // Select the option to not create an account
        await this.page.getByText('Do not create a customer account').click();
    }

   async fillGuestDetails(user: { firstName: string; lastName: string; email: string; street: string; zip: string; city: string; country: string }) {
    // Target inputs by their name attributes
    await this.page.locator('input[name="billingAddress[firstName]"]').fill(user.firstName);
    await this.page.locator('input[name="billingAddress[lastName]"]').fill(user.lastName);
    await this.page.locator('input[name="email"]').fill(user.email);
    await this.page.locator('input[name="billingAddress[street]"]').fill(user.street);
    await this.page.locator('input[name="billingAddress[zipcode]"]').fill(user.zip);
    await this.page.locator('input[name="billingAddress[city]"]').fill(user.city);

    // The "Weiter" button is the last step
    await this.page.getByRole('button', { name: 'Weiter' }).click();
}
    async selectCashOnDelivery() {
        // Shopware usually has radio buttons for payment methods
        await this.page.getByLabel('Cash on delivery').check();
    }

async submitOrder() {
        // Use the exact German label found in the HTML
        await this.page.getByLabel('Ich habe die AGB gelesen und bin mit ihnen einverstanden.', { exact: true }).check();
        
        // Use the exact German button text
        await this.page.getByRole('button', { name: 'Zahlungspflichtig bestellen' }).click();
    }

async verifyOrderSuccess() {
    // Assert that the URL changed to the finish page
    await expect(this.page).toHaveURL(/.*checkout\/finish/);
    
    // Use a partial match (regex) to handle the long dynamic German heading
    await expect(this.page.getByRole('heading', { name: /Vielen Dank für Ihre Bestellung/ })).toBeVisible();
}}