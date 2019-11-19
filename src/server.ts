const express = require("express");
require("dotenv").config();
const Middleware = require("./middleware/middleware");
const ErrorHandlingMiddleware = require("./middleware/error-handling");

const app = express();

const router = require("./routes/index");

Middleware(app);

app.use("/api", router);

ErrorHandlingMiddleware(app);

module.exports = app;
export {};
