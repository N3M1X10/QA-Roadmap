// @ts-check
const { test, expect } = require('@playwright/test');

const sauceSite = 'https://www.saucedemo.com/';

// ====================================
// ГРУППА 1: Тестируем саму форму входа
// ====================================
test.describe('Форма авторизации', () => {

    // Перед каждым тестом этой группы мы: открываем сайт
    test.beforeEach(async ({ page }) => {
        await page.goto(sauceSite);
    });

    test('Успешная авторизация с валидными учетными данными', async ({ page }) => {
        await page.locator('#user-name').fill('standard_user');
        await page.locator('#password').fill('secret_sauce');
        await page.locator('#login-button').click();

        const inventoryTitle = page.locator('.title');
        await expect(inventoryTitle).toHaveText('Products');
    });

    test('Ошибка авторизации при неверном пароле', async ({ page }) => {
        await page.locator('#user-name').fill('standard_user');
        await page.locator('#password').fill('123456789');
        await page.locator('#login-button').click();

        const errorMessage = page.locator('[data-test="error"]');
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toContainText('Epic sadface: Username and password do not match');
    });

    test('Отображение ошибки при попытке входа с пустыми полями', async ({ page }) => {
        await page.locator('#login-button').click();

        const errorMessage = page.locator('[data-test="error"]');
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toContainText('Epic sadface: Username is required');
    });
});

// ====================================================
// ГРУППА 2: Тестируем работу магазина (требует логина)
// ====================================================
test.describe('Функционал магазина (после авторизации)', () => {

    // Перед каждым тестом этой группы мы заходим на сайт И логинимся под стандартным юзером
    test.beforeEach(async ({ page }) => {
        await page.goto(sauceSite);
        await page.locator('#user-name').fill('standard_user');
        await page.locator('#password').fill('secret_sauce');
        await page.locator('#login-button').click();
    });

    test('Добавление товара в корзину', async ({ page }) => {
        // Кликаем по первой кнопке Add to Cart и по второй (твоя логика с индексами)
        await page.getByRole('button', { name: 'Add to cart' }).first().click();
        await page.getByRole('button', { name: 'Add to cart' }).nth(1).click();

        // Проверяем, что в корзине 2 товара
        const cartBadge = page.locator('[data-test="shopping-cart-badge"]');
        await expect(cartBadge).toHaveText('2');
    });
});