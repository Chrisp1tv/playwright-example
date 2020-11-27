const main = require("./main");

(async () => {
    const page = await main.setupPage();

    await page.goto('https://www.jeuxvideo.com/tous-les-jeux/');

    // Text selectors are case-insensitive (text in the web page is "Accepter & Fermer")
    await page.click('text=accepter & fermer');
    const gameElements = (await page.$$('.gameTitle__3PBZI1')).slice(0, 5);
    const gameNames = await Promise.all(gameElements.map(gameElement => gameElement.textContent()));

    console.log(gameNames);

    // Intermediate matches and selectors mixing
    // Because of the wildcard, this query will return the "li" element which contains the first game name
    const firstGameBox = await page.$(`.container__3eUfTL >> *css=li >> text=${gameNames[0]}`);
    const firstGameName = await firstGameBox.$eval('.gameTitle__3PBZI1', element => element.textContent);

    console.log(`First game name is ${firstGameName}`);
})();
