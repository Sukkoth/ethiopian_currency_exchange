const { default: axios } = require("axios");
const { default: axiosRetry } = require("axios-retry");
const headers = require("../header");

const url = "https://banksethiopia.com/ethiopian-birr-exchange-rate";

// Attach the retry functionality to axios [somehow, sometimes the server returns 403 in the first try]
axiosRetry(axios, {
  retries: 3,
  retryDelay: (retryCount) => {
    return retryCount * 500;
  },
  retryCondition: (error) => {
    return (
      axiosRetry.isNetworkOrIdempotentRequestError(error) ||
      error.response.status === 403
    );
  },
});

async function getHTML() {
  try {
    const { data: html } = await axios.get(url, { headers });
    return html;
  } catch (error) {
    throw new Error("Could not get HTML");
  }
}

module.exports = getHTML;
