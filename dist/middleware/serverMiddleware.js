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
    app.use(morgan("combined"));
    app.use(cors());
    app.use(function (req, res, next) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, PATCH, DELETE");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        next();
    });
    app.use(function (error, req, res, next) {
        console.log(error);
        var status = error.statusCode || 500;
        var message = error.message;
        var data = error.data;
        res.status(status).json({ message: message, data: data });
    });
};
