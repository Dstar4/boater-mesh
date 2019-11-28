const router = require("express").Router();
import { Request, Response } from "express";

const GaugesService = require("../../services/gaugesService");
const CommonError = require("../../errors/common-error");
const asyncWrapper = require("../../util/asyncWrapper").AsyncWrapper;
import {
  GaugeType,
  ReadingType,
  ReadingGaugeType,
  GaugesServiceType,
} from "../../Types";
const gaugesService: GaugesServiceType = new GaugesService();
// +++++++++++++++++++++++++++++++++++++++++ All Data +++++++++++++++++++++++++++++++++++++++++++++

// api/gauges/
router.route("/").get(
  asyncWrapper(async (req: Request, res: Response) => {
    const data: GaugeType[] = await gaugesService.findAllSites();
    res.status(200).json(data);
  })
);

/// URL: api/gauges/:siteCode
router
  .route("/:id")
  .get(
    asyncWrapper(async (req: Request, res: Response) => {
      const siteCodeId: string = req.params.id;
      const data = await gaugesService.findBySiteCode(siteCodeId);
      res.status(200).json(data);
    })
  )
  .post(
    asyncWrapper(async (req: Request, res: Response) => {
      const siteCode = req.params.id;
      const locationId: number = req.body.locationId;
      const data = await gaugesService.updateGaugeLocation(
        siteCode,
        locationId
      );
      res.status(200).json(data);
    })
  );

// +++++++++++++++++++++++++++++++++++++++++ Site Data ++++++++++++++++++++++++++++++++++++++++++++

// api/gauges/
router.route("/new/:id").get(
  asyncWrapper(async (req: Request, res: Response) => {
    const id = req.params.id;
    const data: GaugeType[] = await gaugesService.getSiteWithReadings(id);
    res.status(200).json(data);
  })
);
module.exports = router;
export {};
