function getBestRates($) {
  const bestRateData = [];
  $(".table.table-striped.border.rounded")
    .find("tbody.fs-13 > tr")
    .each((_, row) => {
      const tds = $(row).find("td");
      let buyRate = parseFloat($(tds[1]).text().trim());
      let sellRate = parseFloat($(tds[2]).text().trim());

      let buySellDifference = null;
      if (buyRate !== null && sellRate !== null) {
        buySellDifference = sellRate - buyRate;
      }
      if (!isNaN(buySellDifference)) {
        buySellDifference = parseFloat(buySellDifference.toFixed(2));
      }

      bestRateData.push({
        baseCurrency: "ETB",
        currencyCode: $(tds[0]).find("td .trasn .flag p").eq(1).text().trim(), //$('td .trasn .flag p').eq(1).text();
        bank: $(tds[3]).find("a").text().toUpperCase().trim(),
        buyRate,
        sellRate,
        buySellDifference,
      });
    });

  return bestRateData;
}

module.exports = getBestRates;
