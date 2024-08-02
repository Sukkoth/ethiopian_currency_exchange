const getExchangeRateForBank = require("./getExchangeRateForBank");

function getAllExchangeRates($) {
  const banksData = [];
  //get exchange rates
  $(".table.exhange_rate").each((_, banks) => {
    $(banks).each((_, bank) => {
      const bankData = getExchangeRateForBank($, bank);
      //if the fetched bank does not have any rate information, leave it
      if (bankData?.rates?.length > 0) banksData.push(bankData);
    });
  });
  return banksData;
}

module.exports = getAllExchangeRates;
