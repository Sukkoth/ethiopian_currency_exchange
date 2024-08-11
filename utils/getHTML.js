const { default: axios } = require("axios");

const url = "https://banksethiopia.com/ethiopian-birr-exchange-rate";

async function getHTML() {
  try {
    const headers = {
      accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      "accept-encoding": "gzip, deflate, br, zstd",
      "accept-language": "en-US,en;q=0.9",
      "cache-control": "max-age=0",
      cookie:
        "nitroCachedPage=0; cf_clearance=bCUVw4gL2cnMQkVQjvy1M5TB5Yfk_gP6sp5tl_wLIOw-1722934599-1.0.1.1-l3Y92Hu.n23Z.HjRSJvzjo9gY0vmCpnZ7JMEjKDjz7Vq2RJKPCUVJtWeWOC4N1sHWAYLDf6Lx_Hsqvbt2vhtYA",
      dnt: "1",
      priority: "u=0, i",
      "sec-ch-ua":
        '"Not)A;Brand";v="99", "Microsoft Edge";v="127", "Chromium";v="127"',
      "sec-ch-ua-mobile": "?1",
      "sec-ch-ua-platform": '"Android"',
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "none",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1",
      "user-agent":
        "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36 Edg/127.0.0.0",
    };

    const { data: html } = await axios.get(url, { headers });
    return html;
  } catch (error) {
    throw new Error("Could not get HTML");
  }
}

module.exports = getHTML;
