
const router = require('express').Router();
const asyncWrapper = require('../../util/asyncWrapper').AsyncWrapper;
const GaugesService = require('../../services/gaugesService');

const gaugesService = new GaugesService();

// ****************************** Site Data *********************************

// URL: api/gaugesData/sites
router.route('/sites').get(
  asyncWrapper(async (req, res) => {
    const data = await gaugesService.populateSites();
    res.send(data);
  }),
);

// ****************************** Reading Data ******************************+

// TODO: FIX THIS ENDPOINT TO ACTUALLY RETURN THE CORRECT READINGS THAT WERE ADDED UPON FINISHING
// api/gaugesData/readings
router.route('/readings').get(
  asyncWrapper(async (req, res) => {
    const allSitesData = await gaugesService.populateReadings();
    res.send(allSitesData);
  }),
);

module.exports = router;
