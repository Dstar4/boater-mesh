"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router = require('express').Router();
var weatherController = require('../controllers/weather/weatherDataController');
router.route('/now').get(weatherController.getWeatherDataByZip);
router.route('/city').get(weatherController.getWeatherDataByCity);
module.exports = router;
