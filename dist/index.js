"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
var server = require("./server");
var PORT = process.env.PORT || 5000;
server.listen(PORT, function () { return console.log("\n** Running on port " + PORT + " ** \n"); });
