import { test, expect } from '@playwright/test';
// importing json file to get user details for create and update
import userDetails from '../utils/userDetails.json' assert { type: 'json' };
const userDataSet = JSON.parse(JSON.stringify(userDetails)); // Parse the JSON to ensure it's valid
export class DashboardPage {
    constructor(page) {
        this.page = page;
        /* Locators for the modals */
        this.createUsermodal = page.locator('.modal-content:has(.modal-title:has-text("Create User")):visible');
        this.updateUsermodal = page.locator('.modal-content:has(.modal-title:has-text("Update User")):visible');
        // close button locator create User modal & update User modal
        this.closeButtonCreatUser = this.createUsermodal.locator('button:has-text("Close")');
        this.closeButtonUpdateUser = this.updateUsermodal.locator('button:has-text("Close")');
    }
    // Method to add a user
    async createUserCard() {
        await this.page.waitForLoadState('domcontentloaded'); // Wait for the page to load
        const mainDiv = this.page.locator('.mainDiv').first();
        await expect(mainDiv).toBeVisible({ timeout: 30000 }); // confirm it’s visible before interacting
        const createBtn = mainDiv.locator('button:has-text("Create")');
        await createBtn.waitFor({ state: 'visible', timeout: 30000 }); // wait until it's visible
        await createBtn.click();
        await this.createUsermodal.locator('input[aria-label="userName"]').click();
        await this.page.keyboard.type(userDataSet.createUser?.user_name, { delay: 100 });
        await this.createUsermodal.locator('input[aria-label="firstName"]').click();
        await this.page.keyboard.type(userDataSet.createUser?.first_name, { delay: 100 });
        await this.createUsermodal.locator('input[aria-label="lastName"]').click();
        await this.page.keyboard.type(userDataSet.createUser?.last_name, { delay: 100 });
        await this.createUsermodal.locator('input[aria-label="emailId"]').click();
        await this.page.keyboard.type(userDataSet.createUser?.email_id, { delay: 100 });
        await this.page.evaluate(() => {
            const createModal = Array.from(document.querySelectorAll('.modal-content'))
                .find(m => m.querySelector('h5')?.textContent.includes('Create User'));
            const saveBtn = createModal?.querySelector('button.btn-primary');
            if (saveBtn) saveBtn.click();
        });
        await this.closeButtonCreatUser.click();
        await this.page.waitForTimeout(1000); // Wait a bit for UI to update
        await this.page.reload(); // Reload the page to ensure the user is created
        const userRow = this.page.locator('.mainDiv >> text=Kevin Williamson');
        // Confirm user is added or not in the console
        console.log('User added:', await userRow.textContent());
        await userRow?.scrollIntoViewIfNeeded();
        await expect(userRow).toBeVisible(); // Assert the user is added
        // Highlight the added user row for visual confirmation
        await this.page.evaluate((el) => {
            el.style.border = '2px solid green';
            el.style.backgroundColor = '#e0ffe0';
        }, await userRow.elementHandle());
        // Screenshot the added user for visual confirmation
        await this.page.screenshot({ path: 'screenshots/user_created.png', fullPage: true });
    }
    // Method to update added user
    async updateUserCard() {
        // Wait for the page to settle
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(1000);
        // Locate the correct user row
        const userRow = this.page.locator('.mainDiv:has-text("Kevin Williamson")').first();
        const updateBtn = userRow.locator('button:has-text("Update")');
        await updateBtn.waitFor({ state: 'visible', timeout: 10000 });
        await updateBtn.click();
        // Now find the visible Update User modal
        const modal = this.page.locator('.modal-content:has(h5:has-text("Update User"))').filter({ has: this.page.locator(':visible') }).first();
        await modal.waitFor({ state: 'visible', timeout: 10000 });
        // Fill in form fields inside the visible modal
        await modal.locator('input[aria-label="userName"]').click();
        await this.page.keyboard.type(userDataSet.updateUser?.user_name, { delay: 100 });
        await modal.locator('input[aria-label="firstName"]').click();
        await this.page.keyboard.type(userDataSet.updateUser?.first_name, { delay: 100 });
        await modal.locator('input[aria-label="lastName"]').click();
        await this.page.keyboard.type(userDataSet.updateUser?.last_name, { delay: 100 });
        await modal.locator('input[aria-label="emailId"]').click();
        await this.page.keyboard.type(userDataSet.updateUser?.email_id, { delay: 100 });
        // Click on the save button safely
        const saveBtn = modal.locator('button:has-text("Save changes")');
        await saveBtn.waitFor({ state: 'visible', timeout: 5000 });
        await saveBtn.click({ force: true });
        // Close the modal
        await this.closeButtonUpdateUser.click();
        // Finalize & Reload the page to ensure changes are reflected
        await this.page.waitForTimeout(1000);
        await this.page.reload();
        const updatedUserRow = this.page.locator('.mainDiv >> text=Midhun Micheal');
        // Assert the user is updated in console
        console.log('User updateded:', await updatedUserRow.textContent());
        await updatedUserRow?.scrollIntoViewIfNeeded();
        await expect(updatedUserRow).toBeVisible();// Assert the user is updated
        await this.page.evaluate((el) => {
            el.style.border = '2px solid green';
            el.style.backgroundColor = '#e0ffe0';
        }, await updatedUserRow.elementHandle());
        // Screenshot the updated user for visual confirmation
        await this.page.screenshot({ path: 'screenshots/user_updated.png', fullPage: true });
    }
    // Method to delete added user
    async deleteUserByName(userName) {
        const userDetails = this.page.locator('.mainDiv');
        const count = await userDetails.count();
        for (let i = 0; i < count; i++) {
            const user = userDetails.nth(i);
            const textContent = await user.textContent();// Get the text content of the user
            if (textContent.includes(userName)) {
                // Handle the prompt for deletion
                this.page.once('dialog', async dialog => {
                    console.log('Prompt message:', dialog.message());
                    await dialog.accept('yes'); // this types 'yes' and clicks OK
                });
                // Click Delete inside the user row
                await user.locator('button:has-text("Delete")').click();
                // wait for UI to update
                await this.page.waitForTimeout(1000);
                return; // Exit once done
            }
        }
        // Screenshot the dashboard after deletion attempt
        await this.page.screenshot({ path: 'screenshots/user_updated.png', fullPage: true });
        throw new Error(`User '${userName}' not found in any card.`);
        
    }

}