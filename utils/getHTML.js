const { default: axios } = require("axios");

const url = "https://banksethiopia.com/ethiopian-birr-exchange-rate";

async function getHTML() {
  try {
    const { data: html } = await axios.get(url);
    return html;
  } catch (error) {
    throw new Error("Could not fetch HTML");
  }
}

module.exports = getHTML;
