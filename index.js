const express = require("express");
const ExchangeController = require("./controllers/exchangeController");
const errorHandler = require("./middlewares/errorHandler");
//initialize express app
const app = express();

//define routes and route handlers //

/** @route GET / */
app.get("/", ExchangeController.getRateAllData);

/** @route  GET /banks */
app.get("/banks", ExchangeController.banks);

/** @route  GET /bestRates */
app.get("/bestRates", ExchangeController.bestRates);

/** @route  GET /rates/:currencyCode for a give currency */
app.get("/rates/:currencyCode", ExchangeController.ratesForCurrency);

/** @route GET /banks/:bankName/rates */
app.get("/banks/:bank/rates", ExchangeController.bankRates);

/** @route GET /banks/:bankName/rates/:currencyCode */
app.get("/banks/:bank/rates/:currencyCode", ExchangeController.currencyAtBank);

//set up middleware

app.use(errorHandler);
app.use((_, res) => {
  res.status(404).json({
    message: "Not Found",
    status: 404,
  });
});

//start the server
app.listen(7000, () => {
  console.log("Server started on port 7000");
});

// export default app;
module.exports = app;
