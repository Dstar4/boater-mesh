const router = require('express').Router();
const weatherController = require('../controllers/weather/weatherController');

router.route('/now').get(weatherController.getWeatherDataByZip);
router.route('/city').get(weatherController.getWeatherDataByCity);

module.exports = router;
