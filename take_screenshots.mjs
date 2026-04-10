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
        await page.setViewport({ width: 1440, height: 900 });

        console.log("Navigating to local portfolio...");
        try {
            await page.goto('http://localhost:5173', { waitUntil: 'networkidle2', timeout: 10000 });
        } catch (e) {
            console.error("Local server not found at port 5173. Trying 3000...");
            await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
        }

        const sections = [
            { id: '#home', name: 'hero.png' },
            { id: '#about', name: 'skill_orbit.png' },
            { id: '#portfolio', name: 'project_vault.png' },
            { id: '#internships', name: 'academic_quest.png' },
            { id: '#minigame', name: 'space_invaders.png' }
        ];

        for (const section of sections) {
            console.log(`Capturing ${section.name}...`);
            const element = await page.$(section.id);
            if (element) {
                await page.evaluate((id) => {
                    const el = document.querySelector(id);
                    if (el) el.scrollIntoView();
                }, section.id);
                await new Promise(r => setTimeout(r, 1000));
                await element.screenshot({ path: path.join(__dirname, 'images', section.name) });
            } else {
                console.log(`Section ${section.id} not found.`);
            }
        }

        console.log("Capturing AI Assistant...");
        // Click the AI Assistant button in Navbar
        await page.click('button[title="TECHBOY AI"]');
        await new Promise(r => setTimeout(r, 1000));
        await page.screenshot({ path: path.join(__dirname, 'images', 'techboy_ai.png') });

        await browser.close();
        console.log("Done!");
    } catch (e) {
        console.error("Error:", e);
        process.exit(1);
    }
})();
