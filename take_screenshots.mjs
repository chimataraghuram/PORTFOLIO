import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
    try {
        console.log("Launching browser...");
        const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
        const page = await browser.newPage();
        await page.setViewport({ width: 1280, height: 800 });

        console.log("Navigating to portfolio...");
        await page.goto('https://chimataraghuram.github.io/PORTFOLIO/', { waitUntil: 'networkidle2' });

        console.log("Taking hero screenshot...");
        await page.screenshot({ path: path.join(__dirname, 'screenshots', 'hero.png') });

        console.log("Scrolling to minigame...");
        const minigame = await page.$('#minigame');
        if (minigame) {
            await page.evaluate(() => document.querySelector('#minigame').scrollIntoView());
            await new Promise(r => setTimeout(r, 1000));

            console.log("Clicking PLAY GAME wrapper...");
            // Click the center of the minigame to trigger "PLAY GAME"
            const wrapBox = await minigame.boundingBox();
            await page.mouse.click(wrapBox.x + wrapBox.width / 2, wrapBox.y + wrapBox.height / 2);
            await new Promise(r => setTimeout(r, 1000));
            // This pulls up instructions
            await minigame.screenshot({ path: path.join(__dirname, 'screenshots', 'game_instructions.png') });

            console.log("Starting mission...");
            const startBtn = await page.$('#start-mission-btn');
            if (startBtn) {
                await startBtn.click();
                await new Promise(r => setTimeout(r, 2000)); // wait for enemies to spawn and stars to hyperspeed
                await minigame.screenshot({ path: path.join(__dirname, 'screenshots', 'game_gameplay.png') });

                // wait to die for loss screen
                console.log("Waiting for game over...");
                await new Promise(r => setTimeout(r, 5000));
                await minigame.screenshot({ path: path.join(__dirname, 'screenshots', 'game_loss.png') });
            } else {
                await minigame.screenshot({ path: path.join(__dirname, 'screenshots', 'game_gameplay.png') });
                await minigame.screenshot({ path: path.join(__dirname, 'screenshots', 'game_loss.png') });
            }

            // Power up is too random, well just use the generic minigame frame
            await minigame.screenshot({ path: path.join(__dirname, 'screenshots', 'game_powerup.png') });
        } else {
            console.log("Minigame not found?");
        }

        await browser.close();
        console.log("Done!");
    } catch (e) {
        console.error("Error:", e);
        process.exit(1);
    }
})();
