function getExchangeRateForBank($, table) {
  const bankData = {
    name: "",
    icon: "",
    rates: [],
  };

  bankData["name"] = getBank($, table);
  bankData["icon"] = getBankIcon($, table);
  bankData["lastUpdated"] = getLastUpdated($, table);
  bankData["rates"] = getRates($, table);
  console.log(bankData["icon"]);
  return bankData;
}

function getBank($, table) {
  return $(table).find("a").text().trim().replace(" Exchange Rate", "");
}

function getBankIcon($, table) {
  return $(table).find("img").attr("data-src");
}

function getLastUpdated($, table) {
  const dateString = $(table).find("time").attr("datetime");

  try {
    return new Date(dateString).toISOString();
  } catch (error) {
    return dateString;
  }
}

//get each exchange rate for a bank
function getRates($, table) {
  const rates = [];
  $(table)
    .find("tbody > tr")
    .each((_, row) => {
      const tds = $(row).find("td");

      //each tables row length varies but there are 8, 6, 4, mostly
      if (tds.length === 8) {
        rates.push({
          baseCurrency: "ETB",
          currencyCode: $(tds[0]).text().trim(),
          // currencyName: $(tds[1]).text().trim(),
          buyRate: $(tds[2]).text().trim() || null,
          sellRate: $(tds[4]).text().trim() || null,
          transactionBuyingRate: $(tds[6]).text().trim() || null,
          transactionSellingRate: $(tds[7]).text().trim() || null,
          buySellDifference: (
            ($(tds[4]).text().trim() || 0) - ($(tds[2]).text().trim() || 0)
          ).toFixed(2),
          transactionBuySellDifference: (
            ($(tds[7]).text().trim() || 0) - ($(tds[6]).text().trim() || 0)
          ).toFixed(2),
        });
      }
      if (tds.length === 6) {
        rates.push({
          baseCurrency: "ETB",
          currencyCode: $(tds[0]).text().trim(),
          // currencyName: $(tds[1]).text().trim(),
          buyRate: $(tds[2]).text().trim() || null,
          sellRate: $(tds[4]).text().trim() || null,
          transactionBuyingRate: null,
          transactionSellingRate: null,
          buySellDifference: Math.round(
            (
              ($(tds[4]).text().trim() || 0) - ($(tds[2]).text().trim() || 0)
            ).toFixed(2)
          ),
          transactionBuySellDifference: 0,
        });
      }
      if (tds.length === 4) {
        rates.push({
          baseCurrency: "ETB",
          currencyCode: $(tds[0]).text().trim(),
          // currencyName: $(tds[1]).text().trim(),
          buyRate: $(tds[2]).text().trim() || null,
          sellRate: $(tds[3]).text().trim() || null,
          transactionBuyingRate: null,
          transactionSellingRate: null,
          buySellDifference: Math.round(
            (
              ($(tds[3]).text().trim() || 0) - ($(tds[2]).text().trim() || 0)
            ).toFixed(2)
          ),
          transactionBuySellDifference: 0,
        });
      }
    });

  return rates;
}

module.exports = getExchangeRateForBank;
