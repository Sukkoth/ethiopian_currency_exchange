const express = require("express");
const errorHandler = require("./middlewares/errorHandler");
const routes = require("./routes");

//initialize express app
const app = express();

//attach routes
app.use(routes);

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
