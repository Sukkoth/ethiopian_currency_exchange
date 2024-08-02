function getBestRates($) {
  const bestRateData = [];
  $(".table.table-striped.border.rounded")
    .find("tbody.fs-13 > tr")
    .each((_, row) => {
      const tds = $(row).find("td");
      bestRateData.push({
        baseCurrency: "ETB",
        currencyCode: $(tds[0]).text().trim(),
        buyRate: $(tds[1]).text().trim(),
        sellRate: $(tds[2]).text().trim(),
        bank: $(tds[3]).text().trim(),
        buySellDifference: (
          ($(tds[2]).text().trim() || 0) - ($(tds[1]).text().trim() || 0)
        ).toFixed(2),
      });
    });

  return bestRateData;
}

module.exports = getBestRates;
