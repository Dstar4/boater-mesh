const router = require('express').Router();
const gaugesDataController = require('../controllers/gauges/gaugesDataController');

// Routes for populating the database, to be used internally.
router.route('/now').get(gaugesDataController.getRiverData);
router.route('/sites').get(gaugesDataController.getAllSites);
router.route('/populate').get(gaugesDataController.populateGaugeData);

module.exports = router;
