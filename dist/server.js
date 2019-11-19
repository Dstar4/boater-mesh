"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
require("dotenv").config();
var Middleware = require("./middleware/middleware");
var ErrorHandlingMiddleware = require("./middleware/error-handling");
var app = express();
var router = require("./routes/index");
Middleware(app);
app.use("/api", router);
ErrorHandlingMiddleware(app);
module.exports = app;
