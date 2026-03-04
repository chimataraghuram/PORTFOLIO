const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    console.log("Launching browser...");
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });

    console.log("Navigating to portfolio...");
    await page.goto('https://chimataraghuram.github.io/PORTFOLIO/', { waitUntil: 'networkidle2' });

    console.log("Taking hero screenshot...");
    await page.screenshot({ path: path.join(__dirname, 'screenshots', 'hero.png') });

    console.log("Scrolling to minigame...");
    // Just take a screenshot of the minigame section
    await page.waitForSelector('#minigame');
    const minigame = await page.$('#minigame');
    await minigame.screenshot({ path: path.join(__dirname, 'screenshots', 'game_instructions.png') });

    // Click the "play game" or similar if we can, but honestly maybe just duplicate the screenshot for the placeholders, or remove the placeholders from readme.

    await browser.close();
    console.log("Done!");
})();
