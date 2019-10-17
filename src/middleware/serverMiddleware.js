const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const sequelize = require('../util/database');
// const path = require('../util/path');
const Gauge = require('../models/gauge');
const GaugeReadings = require('../models/gaugeReading');

module.exports = app => {
  app.use(express.json());
  // app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(helmet());
  app.use(morgan('dev'));
  app.use(cors());

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization'
    );
    next();
  });
  app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const { message } = error;
    const { data } = error;
    res.status(status).json({ message, data });
  });

  // TODO ESTABLISH A REAL FK RELATIONSHIP ON SITECODE
  Gauge.hasMany(GaugeReadings, { constraints: false });

  sequelize
    .sync({ force: true })
    // .sync()
    .catch(err => {
      console.log(err);
    });

  // sequelize
  //   .authenticate()
  //   .then(() => {
  //     console.log('Connection has been established successfully.');
  //   })
  //   .catch(err => {
  //     console.error('Unable to connect to the database:', err);
  //   });
};
