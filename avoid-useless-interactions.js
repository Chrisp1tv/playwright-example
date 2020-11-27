const main = require("./main");

(async () => {
    // Both following functions are leading to the same result:
    // find dentists in Nantes city from Doctolib and take a screenshot of the results page.
    await findNantesDentistsDumbWay();
    await findNantesDentistsFaster();
})();

async function findNantesDentistsDumbWay() {
    const page = await main.setupPage();

    await page.goto('https://doctolib.fr/');
    await page.fill('xpath=//input[@class="searchbar-input searchbar-query-input"]', 'Dentiste');
    await page.fill('xpath=//input[@class="searchbar-input searchbar-place-input"]', 'Nantes');
    await page.click('xpath=//div[@class="searchbar-place-submit"]//button[2]');
    await page.click('xpath=//div[@class="searchbar-place-submit"]//button[@type="submit"]');

    // Wait for navigation to page results, to prevent playwright from taking a screen of the homepage
    await page.waitForNavigation();
    await page.screenshot({ path: 'doctolib-results.png' });
}

async function findNantesDentistsFaster() {
    const page = await main.setupPage();

    await page.goto('https://www.doctolib.fr/dentiste/nantes');
    await page.screenshot({ path: 'doctolib-results.png' });
}
