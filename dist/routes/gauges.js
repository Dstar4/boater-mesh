"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router = require('express').Router();
var gaugesController = require('../controllers/gauges/gaugesController');
// *****************Routes to get all Gauge Data *************************
// Gets all gauge site information from db
router.route('/all').get(gaugesController.gaugeInformation);
// Gets all Gauge Reading data from db
router.route('/info').get(gaugesController.getGaugeHistory);
// *****************Routes to get Gauge site and Reading data**************
// Gets all data by site id
router.route('/sites/:id').get(gaugesController.getSiteById);
// Routes to only get Reading Data by site id
router.route('/readings/:id').get(gaugesController.getReadingsById);
// ************************* Routes to get Site Data Only ************************
// Routes to only get site Data
module.exports = router;
