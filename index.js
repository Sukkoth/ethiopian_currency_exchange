const express = require("express");
const getEthiopianExchangeRate = require("./utils/getEthiopianExchangeRate");
const NodeCache = require("node-cache");

const app = express();
const cache = new NodeCache({ stdTTL: 3600, checkperiod: 600 }); // TTL of 1 hour, check cache every 10 minutes

async function getData() {
  let data;
  const cachedRate = cache.get("cachedRate");
  if (cachedRate) {
    data = { cached: true, ...cachedRate };
  } else {
    data = await getEthiopianExchangeRate();
    cache.set("cachedRate", { cached: false, ...data });
  }

  if (!data) {
    throw "No data found";
  }
  return data;
}

app.get("/", async (req, res) => {
  try {
    const data = await getData();
    return res.json(data);
  } catch (error) {
    res.status(500).json({
      message: "Could not fetch data",
    });
  }
});

app.get("/banks", async (req, res) => {
  try {
    const data = await getData();
    const banks = data?.exchange_rates?.map((bank) => {
      return bank?.name;
    });

    if (banks) {
      res.json({
        code: 200,
        banks,
      });
    } else {
      res.status(500).json({
        message: "Error getting banks",
      });
    }
  } catch (error) {
    console.error(error);
  }
});

app.get("/banks/:bank/rates", async (req, res) => {
  try {
    const data = await getData();
    const { bank } = req.params;
    const bankRates = data?.exchange_rates?.find(
      (bankData) => bankData?.name === bank
    );

    if (!bankRates) {
      res.status(404).json({
        message: "bank not found",
      });
    }
    res.json({ bankRates });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: "Could not get requested data",
    });
  }
});

app.get("/banks/:bank/rates/:currencyCode", async (req, res) => {
  try {
    const data = await getData();
    const { bank, currencyCode } = req.params;

    const bankData = data?.exchange_rates?.find(
      (bankData) => bankData?.name === bank
    );

    if (!bankData) {
      return res.status(404).json({
        message: "bank not found",
      });
    }

    const currency = bankData?.rates?.find(
      (rate) => rate?.currencyCode === currencyCode
    );

    if (!currency) {
      res.status(404).json({
        message:
          "Either the currency code does not exist or the bank does not provide that currency",
        code: 404,
      });
    } else {
      res.json({
        code: 200,
        bank,
        currencyCode,
        rate: currency,
      });
    }
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: "Could not get requested data",
    });
  }
});

app.listen(8000, () => {
  console.log("Server started on port 8000");
});
