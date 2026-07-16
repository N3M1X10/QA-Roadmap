const base = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');

/**
 * @typedef {object} MyFixtures
 * @property {LoginPage} loginPage
 * @property {InventoryPage} inventoryPage
 */

/** @type {import('@playwright/test').TestType<MyFixtures, {}>} */
const test = base.test.extend({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    inventoryPage: async ({ page }, use) => {
        await use(new InventoryPage(page));
    }
});

module.exports = {
    test,
    expect: base.expect
};