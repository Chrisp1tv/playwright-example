const playwright = require('playwright');

module.exports = {
    setupPage: async () => {
        const browser = await playwright['chromium'].launch();
        const context = await browser.newContext();

        return context.newPage();
    }
}