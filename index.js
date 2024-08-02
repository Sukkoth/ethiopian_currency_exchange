const express = require("express");
const getEthiopianExchangeRate = require("./utils/getEthiopianExchangeRate");

const app = express();

app.get("/", async (req, res) => {
  try {
    const data = await getEthiopianExchangeRate();
    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: "Could not fetch data",
    });
  }
});
app.listen(8000, () => {
  console.log("Server started on port 8000");
});
