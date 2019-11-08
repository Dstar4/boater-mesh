const router = require('express').Router();
const WeatherService = require('../../services/WeatherService');

const weatherService = new WeatherService();
// const URL = "https://api.openweathermap.org/data/2.5/weather?zip=85741,us&appid=f95f8b937ea0757b479511295634ebf6&units=imperial"
const asyncWrapper = require('../../util/asyncWrapper').AsyncWrapper;

router.get(
  '/now',
  asyncWrapper(async (req, res) => {
    const response = await weatherService.getWeatherDataByZip(req.query.zip);
    res.status(200).json(response);
  })
);

router.get(
  '/city',
  asyncWrapper(async (req, res) => {
    const { city } = req.query;
    const response = await weatherService.getWeatherDataByCity(city);
    res.status(200).json(response);
  })
);

module.exports = router;

;
