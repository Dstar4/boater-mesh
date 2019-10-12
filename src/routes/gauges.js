const router = require('express').Router();
const gaugesController = require('../controllers/gauges/gaugesController');

router.route('/now').get(gaugesController.getRiverData);

module.exports = router;
