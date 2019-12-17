
const router = require('express').Router();

const db = require('../../data/db-config');
const GaugesService = require('../../services/gaugesService');
const CommonError = require('../../errors/common-error');
const asyncWrapper = require('../../util/asyncWrapper').AsyncWrapper;

const gaugesService = new GaugesService();

router
  .route('/')
  .get(
    asyncWrapper(async (req, res) => {
      const data = await gaugesService.findAllLocations();
      res.status(200).json(data);
    }),
  )
  .post(
    asyncWrapper(async (req, res) => {
      const location = req.body;
      const data = await gaugesService.addLocation(location);
      res.status(200).json(data);
    }),
  );
module.exports = router;

