// @ts-check
const { test, expect } = require('@playwright/test');

const sauceSite = 'https://www.saucedemo.com/';

// ====================================
// ГРУППА 1: Тестируем саму форму входа
// ====================================
test.describe('Форма авторизации', () => {

    // Перед каждым тестом этой группы мы: открываем сайт

    // 3. Assert: Проверяем, что после логина появился заголовок страницы товаров
    const inventoryTitle = page.locator('.title');
    await expect(inventoryTitle).toHaveText('Products');
});

test('Ошибка авторизации при неверном пароле', async ({ page }) => {
    // 1. Arrange
    await page.goto(sauceSite);

    // 2. Act: Вводим правильный логин, но неверный пароль
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('123456789');
    await page.locator('#login-button').click();

    // 3. Assert: Проверяем, что появилось сообщение об ошибке
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Epic sadface: Username and password do not match');
});

test('Отображение ошибки при попытке входа с пустыми полями', async ({ page }) => {
    // 1. Arrange: Открываем сайт
    await page.goto(sauceSite);

    // 2. Act: Твоё действие. Нам нужно просто кликнуть по кнопке войти, ничего не вводя.
    await page.locator('#login-button').click();


    // 3. Assert: Проверяем, что появилась плашка с ошибкой.
    // Локатор для текста ошибки на этом сайте можно найти по специальному атрибуту: page.locator('[data-test="error"]')

    const errorMessage = page.locator('[data-test="error"]');

    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Epic sadface: Username is required');

});