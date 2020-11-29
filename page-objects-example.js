const main = require("./main");

class YoutubeWatchPage {
    constructor(page) {
        this.page = page;
    }

    async navigate(videoId) {
        await this.page.goto(`https://www.youtube.com/watch?v=${videoId}`);
    }

    async waitPageLoad() {
        await this.page.waitForLoadState('domcontentloaded');
    }

    async like() {
        await this.waitPageLoad();
        await this.page.click('ytd-menu-renderer.ytd-video-primary-info-renderer a.ytd-toggle-button-renderer');
    }

    async dismissPopups() {
        await this.waitPageLoad();

        // wait the button to dismiss the "connect to Youtube" popup
        const noThanksButton = await this.page.waitForSelector('text=Non merci');
        if (noThanksButton) {
            await noThanksButton.click();
        }

        const frame = (await this.page.frames()).filter(frame => frame.url().includes('consent.youtube.com'))[0];
        const acceptingButton = await frame.waitForSelector('#introAgreeButton');
        if (acceptingButton) {
            await acceptingButton.click();
        }
    }

    async getRecommendedVideos() {
        // todo
    }
}

(async () => {
    const page = await main.setupPage();
    const youtubeWatchPage = new YoutubeWatchPage(page);

    await youtubeWatchPage.navigate('tRcPA7Fzebw');
    await youtubeWatchPage.dismissPopups();
    await youtubeWatchPage.like();

    const recommendedVideoNames = youtubeWatchPage.getRecommendedVideos();
    console.log(recommendedVideoNames);
})();

