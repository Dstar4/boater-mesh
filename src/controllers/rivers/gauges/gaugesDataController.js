const router = require('express').Router();
const axios = require('axios');
const asyncWrapper = require('../../../util/asyncWrapper').AsyncWrapper;
const GaugesService = require('../../../services/gaugesService');

const gaugesService = new GaugesService();

// ****************************** Site Data *********************************

router.get(
  '/sites',
  asyncWrapper(async (req, res) => {
    const data = await gaugesService.populateSites();
    res.send(data);
  })
);

// ****************************** Reading Data ******************************+
router.get(
  '/readings',
  asyncWrapper(async (req, res) => {
    const allSitesData = await gaugesService.populateReadings();
    res.send(allSitesData);
  })
);

router.post(
  '/sites',
  asyncWrapper(async (req, res) => {
    const url = 'http://waterservices.usgs.gov/nwis/iv/?format=json';
    const {
      period = 'PT6H',
      siteCodes,
      variable = ['00060', '00065'],
      siteType = 'ST',
    } = req.body;

    const request = `${url}&period=P${period}&site=${siteCodes}&variable=${variable}&siteType=${siteType}`;
    console.log(request);
    const { data } = await axios.get(request);

    res.status(200).json(data);
  })
);

module.exports = router;
