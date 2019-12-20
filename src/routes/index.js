const router = require('express').Router()

const locationsController = require('../controllers/gauges/locationsController')
const gaugesController = require('../controllers/gauges/gaugesController')
const authController = require('../controllers/authController')

router.use('/auth', authController)

router.use('/gauges', gaugesController)

router.use('/locations', locationsController)

module.exports = router
