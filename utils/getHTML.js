const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

const url = "https://banksethiopia.com/ethiopian-birr-exchange-rate";

async function getHTML() {
  try {
    puppeteer.use(StealthPlugin());
    // Launch Puppeteer with Stealth Plugin
    console.log("Init browser");

    const browser = await puppeteer.launch({ headless: true });
    console.log("Init page");
    const page = await browser.newPage();

    // Go to the URL and wait until network is idle

    console.log("waiting for page");
    await page.goto(url, { waitUntil: "networkidle2" });

    console.log("waiting for body");
    // Wait for the main content to load
    await page.waitForSelector("body");

    console.log("getting html");
    // Get the HTML content of the page
    const html = await page.content();

    console.log("closing browser");
    // Close the browser
    await browser.close();

    console.log("Got HTML");
    return html;
  } catch (error) {
    console.error(error);
    throw new Error("Could not fetch HTML");
  }
}

module.exports = getHTML;
