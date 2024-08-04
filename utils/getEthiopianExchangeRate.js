const cheerio = require("cheerio");
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

  if (!allExchangeRates || allExchangeRates?.length === 0) {
    throw "Server down, try again later";
  }
  return {
    lastUpdated: lastUpdatedText.split(" ").slice(2).join(" ").toString(),
    bestRates: bestRateData,
    exchange_rates: allExchangeRates,
    source: "https://banksethiopia.com/ethiopian-birr-exchange-rate",
  };
}

module.exports = getEthiopianExchangeRate;
