const router = require('express').Router();
const gaugesController = require('../controllers/gauges/gaugesController');

// Gets all gauge site information from db
router.route('/all').get(gaugesController.gaugeInformation);

// Gets all Gauge Reading data from db
router.route('/info').get(gaugesController.getGaugeHistory);

// Gets all data by site id
router.route('/sites/:id').get(gaugesController.getSiteById);

// Updates information on a Gauge Site --i.e. runName & description
router.route('/info/:id').put(gaugesController.updateGauge);

module.exports = router;
