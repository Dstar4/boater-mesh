const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan')
var bodyParser = require('body-parser')

module.exports = server => {
  server.use(express.json());
  server.use(bodyParser.json());
  server.use(helmet());
  server.use(morgan("dev"));
  server.use(cors());
  // server.use(errorHandler)
}


// function errorHandler (err, req, res, next) {
//   res.status(500)
//   res.render('error', { error: err })
// }