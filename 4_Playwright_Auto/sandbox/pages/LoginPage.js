class LoginPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;

        // Склад локаторов для страницы входа
        this.usernameInput = page.locator('#user-name');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('#login-button');
        this.errorMessage = page.locator('[data-test="error"]');
    }

    // Метод, чтобы открыть страницу
    async navigate() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    // Метод-действие: вводим данные и жмем войти
    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}

// Экспортируем класс, чтобы использовать его в файлах тестов
module.exports = { LoginPage };
