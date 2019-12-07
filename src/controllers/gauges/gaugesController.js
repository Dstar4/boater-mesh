const router = require('express').Router();
const GaugesService = require('../../services/gaugesService');
const CommonError = require('../../errors/common-error');
const asyncWrapper = require('../../util/asyncWrapper').AsyncWrapper;

const gaugesService = new GaugesService();
// +++++++++++++++++++++++++++++++++++++++++ All Data +++++++++++++++++++++++++++++++++++++++++++++

// api/gauges/
router.route('/').get(
  asyncWrapper(async (req, res) => {
    const data = await gaugesService.findAllSites();
    res.status(200).json(data);
  }),
);

// / URL: api/gauges/:siteCode
router
  .route('/:id')
  .get(
    asyncWrapper(async (req, res) => {
      const siteCodeId = req.params.id;
      const data = await gaugesService.findBySiteCode(siteCodeId);
      if (data.length < 1) {
        res.status(500).json('Invalid Id');
      } else {
        res.status(200).json(data);
      }
    }),
  )
  .post(
    asyncWrapper(async (req, res) => {
      const siteCode = req.params.id;
      const { locationId } = req.body;
      const data = await gaugesService.updateGaugeLocation(
        siteCode,
        locationId,
      );
      if (data.length < 1) {
        res.status(500).json('Invalid Id');
      } else {
        res.status(200).json(data);
      }
    }),
  );

// +++++++++++++++++++++++++++++++++++++++++ Site Data ++++++++++++++++++++++++++++++++++++++++++++

module.exports = router;
