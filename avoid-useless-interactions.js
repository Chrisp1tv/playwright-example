const main = require("./main");

(async () => {
    // Both following functions are leading to the same result:
    // find dentists in Nantes city from Doctolib and take a screenshot of the results page.
    await findNantesDentistsDumbWay();
    //await findNantesDentistsFaster();
})();

async function findNantesDentistsDumbWay() {
    const page = await main.setupPage();

    await page.goto('https://doctolib.fr/');

    // just for demonstration purposes
    await page.waitForTimeout(2000);

    await page.click('#didomi-notice-agree-button');
    await page.fill('xpath=//input[@class="searchbar-input searchbar-query-input"]', 'Dentiste');
    await page.fill('xpath=//input[@class="searchbar-input searchbar-place-input"]', 'Nantes');
    await page.click('xpath=//div[@class="searchbar-place-submit"]//button[2]');

    // just for demonstration purposes
    await page.waitForTimeout(2000);

    await page.click('xpath=//div[@class="searchbar-place-submit"]//button[@type="submit"]');

    // Wait for navigation to page results
    await page.waitForNavigation();

    // in results page
    await page.click('text=prochain rdv le');

    // just for demonstration purposes
    await page.waitForTimeout(2000);

    await page.click('.availabilities-slot');

    // just for demonstration purposes
    await page.waitForTimeout(3000);

    const option = await page.waitForSelector('#booking_motive > option:nth-child(2)', {state: 'attached'});
    await page.selectOption('#booking_motive', option);

    // just for demonstration purposes
    await page.waitForTimeout(2000);

    await page.click('.dl-step >> text=prendre rendez-vous');
}

async function findNantesDentistsFaster() {
    const page = await main.setupPage();

    await page.goto('https://www.doctolib.fr/dentiste/nantes');
    await page.screenshot({ path: 'doctolib-results.png' });
}
