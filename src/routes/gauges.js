const router = require('express').Router();
const gaugesController = require('../controllers/gauges/gaguesController');

router.route('/now').get(gaugesController.getRiverData);

module.exports = router;
