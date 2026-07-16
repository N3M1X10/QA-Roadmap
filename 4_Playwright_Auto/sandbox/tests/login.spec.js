// @ts-check
const { test, expect } = require('@playwright/test');

// Импортируем наш Page Object
const { LoginPage } = require('../pages/LoginPage.js');

test.describe('Форма авторизации (через POM)', () => {

    test('Успешная авторизация с валидными учетными данными', async ({ page }) => {
        // Инициализируем страницу
        const loginPage = new LoginPage(page);

        // Вызываем методы страницы
        await loginPage.navigate();
        await loginPage.login('standard_user', 'secret_sauce');

        const inventoryTitle = page.locator('.title');
        await expect(inventoryTitle).toHaveText('Products');
    });

    test('Ошибка авторизации при неверном пароле', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();

        await loginPage.login('standard_user', 'secret_sauce1');
        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toContainText('Epic sadface: Username and password do not match');
    });

    test('Отображение ошибки при попытке входа с пустыми полями', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();


        // Кликаем по кнопке войти без ввода данных
        await loginPage.loginButton.click();

        // Проверяем ошибку
        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toContainText('Epic sadface: Username is required');
    });
});
