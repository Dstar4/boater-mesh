const router = require('express').Router();

const GaugesService = require('../../services/gaugesService');
const CommonError = require('../../errors/common-error');
const asyncWrapper = require('../../util/asyncWrapper').AsyncWrapper;

const gaugesService = new GaugesService();

// +++++++++++++++++++++++++++++++++++++++++ Reading Data +++++++++++++++++++++++++++++++++++++++++

router.route('/').get(
  asyncWrapper(async (req, res) => {
    const data = await gaugesService.findAllReadings();
    res.status(200).json(data);
  }),
);

router.route('/:id').get(
  asyncWrapper(async (req, res) => {
    const siteCodeId = req.params.id;
    const data = await gaugesService.findReadingsBySiteCode(
      siteCodeId,
    );
    res.status(200).json(data);
  }),
);
module.exports = router;
