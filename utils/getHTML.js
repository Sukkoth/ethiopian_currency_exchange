const { default: axios } = require("axios");

const url = "https://banksethiopia.com/ethiopian-birr-exchange-rate";

async function getHTML() {
  console.log("fetching html . . .");
  try {
    const { data: html } = await axios.get(url);
    return html;
  } catch (error) {
    console.error("Could not fetch HTML");
  }
}

module.exports = getHTML;
