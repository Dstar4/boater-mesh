const router = require('express').Router();
const gaugesController = require('../controllers/gauges/gaugesController');

router.route('/now').get(gaugesController.getRiverData);
router.route('/sites').get(gaugesController.getAllSites);
router.route('/populate').get(gaugesController.populateGaugeData);

module.exports = router;
