const router = require('express').Router();
const weatherRouter = require('../routes/weather')


router.use('/weather', weatherRouter)
router.get('/', (req, res) => {
  res.status(200).json('weather index online')
})


module.exports = router;
