const router = require('express').Router();
const weatherRouter = require('./weather');
const gaugesRouter = require('./gauges');

router.use('/weather', weatherRouter);
router.use('/gauges', gaugesRouter);
router.get('/', (req, res) => {
  res.status(200).json('weather index online');
});

module.exports = router;
