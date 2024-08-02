function getExchangeRateForBank($, table) {
  const bankData = {
    name: "",
    rates: [],
  };

  bankData["name"] = getBank($, table);
  bankData["rates"] = getRates($, table);
  return bankData;
}

function getBank($, table) {
  return $(table).find("th.text-capitalize.text-left > h3").text().trim();
}

//get each exchange rate for a bank
function getRates($, table) {
  const rates = [];
  $(table)
    .find("tbody > tr")
    .each((_, row) => {
      const tds = $(row).find("td");
      rates.push({
        currencyCode: $(tds[0]).text().trim(),
        currencyName: $(tds[1]).text().trim(),
        buyRate: $(tds[2]).text().trim(),
        sellRate: $(tds[4]).text().trim(),
        transactionBuyingRate: $(tds[6]).text().trim(),
        transactionSellingRate: $(tds[7]).text().trim(),
      });
    });

  return rates;
}

module.exports = getExchangeRateForBank;
