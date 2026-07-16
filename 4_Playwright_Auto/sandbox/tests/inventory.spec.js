// @ts-check
const { test, expect } = require('./baseTest.js');

test.describe('Каталог товаров (Inventory)', () => {

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.navigate();
        await loginPage.login('standard_user', 'secret_sauce');
    });

    test('Добавление конкретного товара в корзину', async ({ inventoryPage }) => {
        await inventoryPage.addItemToCart('Sauce Labs Backpack');
        await expect(inventoryPage.cartBadge).toHaveText('1');
    });

    test('Успешное удаление товара из корзины', async ({ inventoryPage }) => {
        await inventoryPage.addItemToCart('Sauce Labs Backpack');
        await inventoryPage.removeItemFromCart('Sauce Labs Backpack');
        await expect(inventoryPage.cartBadge).toHaveCount(0);
    });
});