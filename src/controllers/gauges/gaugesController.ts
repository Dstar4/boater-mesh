const router = require("express").Router();
import { Request, Response } from "express";

const GaugesService = require("../../services/gaugesService");
const CommonError = require("../../errors/common-error");
const asyncWrapper = require("../../util/asyncWrapper").AsyncWrapper;
const { GaugeType, ReadingType, GaugeReadingType } = require("../../Types");
const gaugesService = new GaugesService();
// +++++++++++++++++++++++++++++++++++++++++ All Data +++++++++++++++++++++++++++++++++++++++++++++

// api/gauges/
router.route("/").get(
  asyncWrapper(async (req: Request, res: Response) => {
    const data: GaugeType[] = await gaugesService.findAllSites();
    res.status(200).json(data);
  })
);

// TODO: FIX ERROR Cannot set headers after they are sent to client
router
  .route("/:id")
  .get(
    asyncWrapper(async (req: Request, res: Response) => {
      const siteCodeId: string = req.params.id;
      const data = await gaugesService.findBySiteCode(siteCodeId);
      if (data.length > 0) {
        res.status(200).json(data);
      }
      throw new CommonError();
    })
  )
  .post(
    asyncWrapper(async (req: Request, res: Response) => {
      const siteCode = req.params.id;
      const { locationId } = req.body;
      const data = await gaugesService.updateGaugeLocation(
        siteCode,
        locationId
      );
      res.status(200).json(data);
    })
  );

// +++++++++++++++++++++++++++++++++++++++++ Site Data ++++++++++++++++++++++++++++++++++++++++++++

module.exports = router;
export {};
