const cheerio = require("cheerio");
const writeData = require("./writeData");
const getHTML = require("./getHTML");
const getBestRates = require("./getBestRates");
const getAllExchangeRates = require("./getAllExchangeRates");

async function getEthiopianExchangeRate() {
  const html = await getHTML();

  //load html to cheerio
  const $ = cheerio.load(html);

  //get all exchange rates of every banks in array
  const allExchangeRates = getAllExchangeRates($);

  //get best exchange rates of the day
  const bestRateData = getBestRates($);

  // Extract the last updated text
  const lastUpdatedText = $(".table-responsive.rounded > p").text().trim();
  console.log(lastUpdatedText);
  return {
    lastUpdatedText: Date(
      lastUpdatedText.split(" ").slice(2).join(" ").toString()
    ),
    bestRate: bestRateData,
    exchange_rates: allExchangeRates,
  };
}

module.exports = getEthiopianExchangeRate;
