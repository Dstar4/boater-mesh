const router = require('express').Router();
const WeatherService = require('../../services/WeatherService');

const weatherService = new WeatherService();

const asyncWrapper = require('../../util/asyncWrapper').AsyncWrapper;

// URL: api/weatherData/zip/:zip
router.route('/zip').get(
  asyncWrapper(async (req, res) => {
    // TODO: Add weather interface
    const response = await weatherService.getWeatherDataByZip(
      req.query.zip,
    );
    res.status(200).json(response);
  }),
);

// URL: api/weatherData/city/:city
router.route('/city').get(
  asyncWrapper(async (req, res) => {
    const { city } = req.query;
    // TODO: Add weather interface
    const response = await weatherService.getWeatherDataByCity(city);
    res.status(200).json(response);
  }),
);

module.exports = router;

