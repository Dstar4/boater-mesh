const router = require('express').Router();
const weatherDataRouter = require('./weatherData');
const gaugesDataRouter = require('./gaugesData');
const gaugesRouter = require('./gauges');

router.use('/weatherData', weatherDataRouter);
router.use('/gaugesData', gaugesDataRouter);
router.use('/gauges', gaugesRouter);

router.get('/', (req, res) => {
  res.status(200).json('weather index online');
});

module.exports = router;
