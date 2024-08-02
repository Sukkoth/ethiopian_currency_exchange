const NodeCache = require("node-cache");
const asyncHanlder = require("express-async-handler");
const getEthiopianExchangeRate = require("../utils/getEthiopianExchangeRate");

//initialize cache for node-cache
const cache = new NodeCache({ stdTTL: 3600, checkperiod: 1800 }); // TTL of 1 hour, check cache every 10 minutes

/**
 * @async
 * @description returns exchange rate of banks either from cache or by scraping web page
 * @returns {array}
 * @param {array} exchangeRateData - Exchange rates for banks.
 */

async function getData() {
  let data;

  const cachedRate = cache.get("cachedRate");

  if (cachedRate) {
    data = await cachedRate;
  } else {
    data = await getEthiopianExchangeRate();
  }

  if (!data) {
    throw new Error("No data found");
  }
  //write data to cache
  cache.set("cachedRate", data);
  return data;
}

/**
 * @async
 * @description get all information on every bank (available ones only)
 * @route GET /
 * @access Public
 */
const getRateAllData = asyncHanlder(async (req, res) => {
  const data = await getData();
  return res.json(data);
});

/**
 * @async
 * @description get best rates
 * @route GET /bestRates
 * @access Public
 */
const bestRates = asyncHanlder(async (req, res) => {
  const data = await getData();
  return res.json(data?.bestRate);
});

/**
 * @async
 * @description get list of available banks
 * @route GET /banks
 * @access Public
 */

const banks = asyncHanlder(async (req, res) => {
  const data = await getData();
  const banks = data?.exchange_rates?.map((bank) => {
    return bank?.name;
  });

  if (banks) {
    res.json({
      code: 200,
      banks,
    });
  } else {
    res.status(500);
    throw new Error("Error getting banks");
  }
});

/**
 * @async
 * @description get list of exchange rates for a requested bank
 * @route GET /banks/:bankName/rates
 * @access Public
 * @param {string} bankName - Name of bank
 */
const bankRates = asyncHanlder(async (req, res) => {
  const data = await getData();
  const { bank } = req.params;
  const bankRates = data?.exchange_rates?.find(
    (bankData) => bankData?.name === bank
  );

  if (!bankRates) {
    res.status(404);
    throw new Error("bank not found");
  }
  res.json({ code: 200, ...bankRates });
});

/**
 * @async
 * @description get a specific exchange rate of a currency at a given bank
 * @route GET /banks/:bankName/rates/:currencyCode
 * @access Public
 * @param {string} bankName - Name of bank
 * @param {string} currencyCode - Currency code for which the enquiry is done

 */

const currencyAtBank = asyncHanlder(async (req, res) => {
  const data = await getData();
  const { bank, currencyCode } = req.params;

  const bankData = data?.exchange_rates?.find(
    (bankData) => bankData?.name === bank
  );

  if (!bankData) {
    res.status(404);
    throw new Error("Bank not found");
  }

  const currency = bankData?.rates?.find(
    (rate) => rate?.currencyCode === currencyCode
  );

  if (!currency) {
    res.status(404);
    throw new Error(
      "Either the currency code does not exist or the bank does not provide that currency"
    );
  } else {
    res.json({
      code: 200,
      bank,
      currencyCode,
      rate: currency,
    });
  }

  res.status(500);
  throw new Error("Could not get requested data");
});

module.exports = {
  getRateAllData,
  banks,
  bankRates,
  currencyAtBank,
  bestRates,
};
