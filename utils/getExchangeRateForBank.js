function getExchangeRateForBank($, table) {
  const bankData = {
    name: "",
    rates: [],
    lastUpdated: "",
  };

  bankData["name"] = getBank($, table);
  bankData["lastUpdated"] = getLastUpdated($, table);
  bankData["rates"] = getRates($, table);
  return bankData;
}

function getBank($, table) {
  return $(table).find("a").text().trim().replace(" Exchange Rate", "");
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

      const buyRate = parseFloat($(tds[1]).text().trim()) || null;
      const sellRate = parseFloat($(tds[2]).text().trim()) || null;
      let buySellDifference = null;
      if (buyRate !== null && sellRate !== null) {
        buySellDifference = sellRate - buyRate;
      }
      if (!isNaN(buySellDifference)) {
        buySellDifference = parseFloat(buySellDifference.toFixed(2));
      }
      rates.push({
        baseCurrency: "ETB",
        currencyCode: $(tds[0])
          .find("p")
          .filter(function () {
            const text = $(this).text().trim();
            return text.length === 3 && !text.startsWith("(");
          })
          .text()
          .trim(),
        currencyIcon: $(tds[0]).find("img").attr("data-src"),
        buyRate,
        sellRate,
        buySellDifference,
      });
    });

  return rates;
}

module.exports = getExchangeRateForBank;
