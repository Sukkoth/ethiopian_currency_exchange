const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const fs = require("fs");

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
    console.error("PRINT ERROR: ", error);
    writeErrorToFile(error);
    throw new Error("Could not fetch HTML");
  }
}

function writeErrorToFile(error) {
  // Convert the object to a JSON string
  const serializedError = serializeError(error);

  const jsonString = JSON.stringify(serializedError, null, 2);

  // Define the file path where the JSON string will be appended
  const filePath = "errors.txt";

  // Append the JSON string to the file
  fs.appendFile(filePath, jsonString + "\n", (err) => {
    if (err) {
      console.error("An error occurred while writing error to the file:", err);
    } else {
      console.log("error string successfully written to", filePath);
    }
  });
}

function serializeError(error) {
  return {
    time: new Date().toISOString(),
    message: error?.message,
    name: error?.name,
    stack: error?.stack,
    // Add any other custom properties if necessary
  };
}

module.exports = getHTML;
