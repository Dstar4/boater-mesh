const router = require('express').Router();

const GaugesService = require('../../../services/gaugesService');

const asyncWrapper = require('../../../util/asyncWrapper').AsyncWrapper;

const gaugesService = new GaugesService();
// +++++++++++++++++++++++++++++++++++++++++ All Data +++++++++++++++++++++++++++++++++++++++++++++

router.route('/all').get(
  asyncWrapper(async (req, res) => {
    const data = await gaugesService.findAllSites();
    res.status(200).json(data);
  })
);

router.get(
  '/sites/:id',
  asyncWrapper(async (req, res) => {
    const siteCodeId = req.params.id;
    const data = await gaugesService.findBySiteCode(siteCodeId);
    res.status(200).json(data);
  })
);

// +++++++++++++++++++++++++++++++++++++++++ Reading Data +++++++++++++++++++++++++++++++++++++++++
router.get(
  '/info',
  asyncWrapper(async (req, res) => {
    const data = await gaugesService.findAllReadings();
    res.status(200).json(data);
  })
);

router.get(
  '/info/:id',
  asyncWrapper(async (req, res) => {
    const siteCodeId = req.params.id;
    const gaugeData = await gaugesService.findReadingsBySiteCode(siteCodeId);
    res.status(200).json(gaugeData);
  })
);

// +++++++++++++++++++++++++++++++++++++++++ Site Data ++++++++++++++++++++++++++++++++++++++++++++

module.exports = router;

