const { default: axios } = require("axios");
const fs = require("fs");

const url = "https://banksethiopia.com/ethiopian-birr-exchange-rate";

async function getHTML() {
  try {
    // Set up headers and cookies if necessary
    const headers = {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      // Add more headers if needed
    };

    // Send the GET request to the URL
    const { data: html } = await axios.get(url, { headers });
    return html;
  } catch (error) {
    console.error("PRINT ERROR: ", error);
    writeErrorToFile(error);
    throw new Error(JSON.stringify(serializeError(error)));
  }
}

function writeErrorToFile(error) {
  // Convert the object to a JSON string
  const serializedError = serializeError(error);

  const jsonString = JSON.stringify(serializedError, null, 2);

  // Define the file path where the JSON string will be appended
  const filePath = "errors.txt";

  // Append the JSON string to the file
  fs.appendFile(filePath, jsonString + "\n", (err) => {
    if (err) {
      console.error("An error occurred while writing error to the file:", err);
    } else {
      console.log("error string successfully written to", filePath);
    }
  });
}

function serializeError(error) {
  return {
    time: new Date().toISOString(),
    message: error?.message,
    name: error?.name,
    stack: error?.stack,
    // Add any other custom properties if necessary
  };
}

module.exports = getHTML;
