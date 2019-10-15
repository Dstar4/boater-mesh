const router = require('express').Router();
const weatherDataRouter = require('./weatherData');
const gaugesDataRouter = require('./gaugesData');
const gaugesRouter = require('./gauges');

// Routes for weather
router.use('/weatherData', weatherDataRouter);
// Routes to populate db with gauge data
router.use('/gaugesData', gaugesDataRouter);
// Routes to get gauge data from db
router.use('/gauges', gaugesRouter);

router.get('/', (req, res) => {
  res.status(200).json('weather index online');
});

module.exports = router;
