const router = require("express").Router();
const ExchangeController = require("./controllers/exchangeController");

//define routes and route handlers //

/** @route GET / */
router.get("/", ExchangeController.getRateAllData);

/** @route  GET /banks */
router.get("/banks", ExchangeController.banks);

/** @route  GET /bestRates */
router.get("/bestRates", ExchangeController.bestRates);

/** @route  GET /rates/:currencyCode for a give currency */
router.get("/rates/:currencyCode", ExchangeController.ratesForCurrency);

/** @route GET /banks/:bankName/rates */
router.get("/banks/:bank/rates", ExchangeController.bankRates);

/** @route GET /banks/:bankName/rates/:currencyCode */
router.get(
  "/banks/:bank/rates/:currencyCode",
  ExchangeController.currencyAtBank
);

module.exports = router;
