const getExchangeRateForBank = require("./getExchangeRateForBank");

function getAllExchangeRates($) {
  const bankData = [];
  //get exchange rates
  $(".table.exhange_rate").each((_, banks) => {
    $(banks).each((_, bank) => {
      //!names
      bankData.push(getExchangeRateForBank($, bank));
    });
  });

  return bankData;
}

module.exports = getAllExchangeRates;
