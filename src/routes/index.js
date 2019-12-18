const router = require('express').Router()

const locationsController = require('../controllers/gauges/locationsController')
const gaugesController = require('../controllers/gauges/gaugesController')

// Routes to get gauge data from db
router.use('/gauges', gaugesController)

router.use('/locations', locationsController)

module.exports = router
