class InventoryPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;

        // Склад статичных локаторов на странице каталога
        this.title = page.locator('.title');
        this.cartBadge = page.locator('.shopping_cart_badge');
    }

    /**
     * Динамический метод для добавления товара в корзину по его имени
     * @param {string} itemName - точное название товара
     */
    async addItemToCart(itemName) {
        await this.page.locator('.inventory_item')
            .filter({ hasText: itemName })
            .getByRole('button', { name: 'Add to cart' })
            .click();
    }
    async removeItemFromCart(itemName) {
        await this.page.locator('.inventory_item')
            .filter({ hasText: itemName })
            .getByRole('button', { name: 'Remove' })
            .click();
    }
}

module.exports = { InventoryPage };