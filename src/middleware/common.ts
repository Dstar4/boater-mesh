const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");

module.exports = app => {
  app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(helmet());
  app.use(morgan("dev"));
  app.use(cors());
};
export {};
