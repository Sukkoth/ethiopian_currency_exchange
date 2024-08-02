const fs = require("fs");

function writeData(data) {
  fs.writeFile("data.json", JSON.stringify(data), (err) => {
    if (err) throw err;
    console.log("Data saved to data.json");
  });
}

module.exports = writeData;
