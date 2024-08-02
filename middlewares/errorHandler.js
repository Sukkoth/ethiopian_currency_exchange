const APP_ENV = "production";

const errorHandler = (err, req, res, next) => {
  // Determine the status code
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  // Set the response status
  res.status(statusCode);

  // Construct the error response
  const errorResponse = {
    code: statusCode,
    message: err.message,
    ...(APP_ENV !== "production" && { stack: err.stack }),
    ...(err.errors && { errors: err.errors }), // Include validation errors if any
  };

  // Send the error response
  return res.json(errorResponse);
};

module.exports = errorHandler;
