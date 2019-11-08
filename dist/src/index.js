var express = require("express");
require("dotenv").config();
var Middleware = require("./middleware/middleware");
var ErrorHandlingMiddleware = require("./middleware/error-handling");
var PORT = process.env.PORT || 5500;
var app = express();
var router = require("./routes/index");
Middleware(app);
app.use("/api", router);
ErrorHandlingMiddleware(app);
app.listen(PORT, function () { return console.log("\n** Running on port " + PORT + " ** \n"); });
