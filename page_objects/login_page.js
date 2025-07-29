import { test, expect } from '@playwright/test';
export class LoginPage {
    constructor(page) {
        this.page = page;
        //Locators for the login page
        this.loginButton = this.page.locator("button[type='submit']");
        this.username = this.page.locator('#loginEmail');
        this.password = this.page.locator('#loginPassword');
        this.errorMessage = this.page.locator('//div[@class="card-body"]');
    }
    async gotoLoginPage() {
        //Hitting the landing page
        await this.page.goto('https://react-login-register-ui-7386d.web.app/login');
        console.log(await this.page.title());//printing the title
    }
    //Function to login to the application
    async validLogin(email, password) {
        await this.username.fill(email);
        await this.password.fill(password);
        await this.loginButton.click();
        // Wait for either success or error — whichever appears first
        const [response] = await Promise.all([
            this.page.waitForLoadState('networkidle', { timeout: 5000 }).catch(() => null),
            this.errorMessage.waitFor({ state: 'visible', timeout: 3000 }).catch(() => null),
        ]);
        const isErrorVisible = await this.errorMessage.isVisible().catch(() => false);
        if (isErrorVisible) {
            const errorText = await this.errorMessage.textContent();
            console.error('Login failed:', errorText);
            // asserting the error message
            await expect(this.errorMessage).toContainText('Sorry! User not Authorised / Wrong Credentials');
            await this.page.screenshot({ path: 'screenshots/login_error_screenshot.png' });
            return false;
        } else {
            console.log('Login successful');
            await this.page.waitForLoadState('networkidle');
            await this.page.waitForLoadState('load');
            return true;
        }
    }

} 