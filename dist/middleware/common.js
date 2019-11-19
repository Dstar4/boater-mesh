"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var helmet = require("helmet");
var cors = require("cors");
var morgan = require("morgan");
var bodyParser = require("body-parser");
module.exports = function (app) {
    app.use(express.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(helmet());
    app.use(morgan("dev"));
    app.use(cors());
};
