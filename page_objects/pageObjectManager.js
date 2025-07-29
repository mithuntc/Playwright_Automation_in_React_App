import { DashboardPage } from "./dashboard_page.js";
import { LoginPage } from "./login_page.js";
export class PageObjectManager {

    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
    }

    getLoginPage() {
        return this.loginPage;
    }
    getDashboardPage() {
        return this.dashboardPage;
    }

}