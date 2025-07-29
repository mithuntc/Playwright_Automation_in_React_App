import { test, expect } from '@playwright/test';
import { LoginPage } from '../page_objects/login_page.js';
import { PageObjectManager } from '../page_objects/pageObjectManager.js';
// importing json file to get login details
import loginDetails from '../utils/loginDetails.json' assert { type: 'json' };
const dataSet = JSON.parse(JSON.stringify(loginDetails)); // Parse the JSON to ensure it's valid
for (const data of dataSet) {
       test(`Users page End to End test for ${data.email_id}`, async ({ page }) => {
              /**
               * An instance of the LoginPage page object, providing methods to interact with the login page.
               * @type {LoginPage}
               */
              const pageObjectManager = new PageObjectManager(page);
              /**
               * Navigates to the login page and performs a valid login using the provided email and password.
               * @type {LoginPage}
               */
              const loginPage = pageObjectManager.getLoginPage();
              await loginPage.gotoLoginPage();
              const loginSuccess = await loginPage.validLogin(data.email_id, data.password);
              console.log(loginSuccess);
              if (loginSuccess==false) {
                     console.warn(`Login failed for ${data.email_id}. Skipping CRUD operations.`);
                     return; // Exit the test if login fails
              }
              console.log(`Login successful for ${data.email_id}. Proceeding with CRUD operations.`);
              const dashboardPage = pageObjectManager.getDashboardPage();
              await dashboardPage.createUserCard();
              await dashboardPage.updateUserCard();
              await dashboardPage.deleteUserByName('Midhun Micheal');
              await expect(page).toHaveScreenshot('screenshots/dashboard-ui.png'); // For Visual regression check
              await page.close(); // Close the page after the test

       });
}