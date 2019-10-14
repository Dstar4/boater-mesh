const router = require('express').Router();
const gaugesController = require('../controllers/gauges/gaugesController');

router.route('/now').get(gaugesController.gaugeInformation);
router.route('/info').get(gaugesController.getGaugeHistory);

module.exports = router;
