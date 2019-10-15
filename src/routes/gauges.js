const router = require('express').Router();
const gaugesController = require('../controllers/gauges/gaugesController');

router.route('/now').get(gaugesController.gaugeInformation);
router.route('/info').get(gaugesController.getGaugeHistory);
router.route('/:id').get(gaugesController.getSiteById);

module.exports = router;
