const router = require('express').Router();
const gaugesDataController = require('../controllers/gaugesData/gaugesDataController');

// ************Routes for populating the database, to be used internally.*****************

// Get all site data and save to db
router
  .route('/sites')
  .get(gaugesDataController.getAllSites)
  .post(gaugesDataController.getDataBySiteId);

// Get all reading data and save to db
router.route('/readings').get(gaugesDataController.populateGaugeData);

module.exports = router;
export {}