"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router = require('express').Router();
var swaggerUi = require('swagger-ui-express');
var weatherDataRouter = require('./weatherData');
var gaugesDataRouter = require('./gaugesData');
var gaugesRouter = require('./gauges');
var swaggerDocument = require('../../swagger.json');
// Routes for weather
router.use('/weatherData', weatherDataRouter);
// Routes to populate db with gauge data
router.use('/gaugesData', gaugesDataRouter);
// Routes to get gauge data from db
router.use('/gauges', gaugesRouter);
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));
module.exports = router;
