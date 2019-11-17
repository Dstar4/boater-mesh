const router = require('express').Router();

const GaugesService = require('../../services/gaugesService');
const CommonError = require('../../errors/common-error');
const asyncWrapper = require('../../util/asyncWrapper').AsyncWrapper;

const gaugesService = new GaugesService();
// +++++++++++++++++++++++++++++++++++++++++ All Data +++++++++++++++++++++++++++++++++++++++++++++

router.route('/all').get(
  asyncWrapper(async (req, res) => {
    const data = await gaugesService.findAllSites();
    // if (data.length > 0) {
    res.status(200).json(data);
    // } throw new CommonError();
  }),
);

router.get(
  '/sites/:id',
  asyncWrapper(async (req, res) => {
    const siteCodeId = req.params.id;
    const data = await gaugesService.findBySiteCode(siteCodeId);
    if (data.length > 0) {
      res.status(200).json(data);
    } throw new CommonError();
  }),
);

// +++++++++++++++++++++++++++++++++++++++++ Reading Data +++++++++++++++++++++++++++++++++++++++++
router.get(
  '/info/all',
  asyncWrapper(async (req, res) => {
    const data = await gaugesService.findAllReadings();
    res.status(200).json(data);
  }),
);

router.get(
  '/info/:id',
  asyncWrapper(async (req, res) => {
    const siteCodeId = req.params.id;
    const data = await gaugesService.findReadingsBySiteCode(siteCodeId);
    // console.log(data);
    if (data.length > 0) {
      res.status(200).json(data);
    } throw new CommonError();
  }),
);

// +++++++++++++++++++++++++++++++++++++++++ Site Data ++++++++++++++++++++++++++++++++++++++++++++

module.exports = router;
