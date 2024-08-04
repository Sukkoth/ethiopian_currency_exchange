function getBestRates($) {
  const bestRateData = [];
  $(".table.table-striped.border.rounded")
    .find("tbody.fs-13 > tr")
    .each((_, row) => {
      const tds = $(row).find("td");
      bestRateData.push({
        baseCurrency: "ETB",
        currencyCode: $(tds[0]).find("td .trasn .flag p").eq(1).text().trim(), //$('td .trasn .flag p').eq(1).text();
        buyRate: $(tds[1]).text().trim(),
        sellRate: $(tds[2]).text().trim(),
        bank: $(tds[3]).find("a").text().toUpperCase(),
        buySellDifference: (
          ($(tds[2]).text().trim() || 0) - ($(tds[1]).text().trim() || 0)
        ).toFixed(2),
      });
    });

  return bestRateData;
}

module.exports = getBestRates;
