const router = require("express").Router();
import GaugesService = require("../../../services/GaugesService");
import { Request, Response } from "express";
import { SiteDataType, ReadingDataType } from "../riverTypes";

const asyncWrapper = require("../../../util/asyncWrapper").AsyncWrapper;
const gaugesService = new GaugesService();
// +++++++++++++++++++++++++++++++++++++++++ All Data +++++++++++++++++++++++++++++++++++++++++++++

router.route("/all").get(
  asyncWrapper(async (req: Request, res: Response) => {
    const data: SiteDataType[] = await gaugesService.findAllSites();
    res.status(200).json(data);
  })
);

router.get(
  "/sites/:id",
  asyncWrapper(async (req: Request, res: Response) => {
    const siteCodeId = req.params.id;
    const data: ReadingDataType[] = await gaugesService.findBySiteCode(
      siteCodeId
    );
    res.status(200).json(data);
  })
);

// +++++++++++++++++++++++++++++++++++++++++ Reading Data +++++++++++++++++++++++++++++++++++++++++
router.get(
  "/info",
  asyncWrapper(async (req: Request, res: Response) => {
    const data: ReadingDataType[] = await gaugesService.findAllReadings();
    res.status(200).json(data);
  })
);

router.get(
  "/info/:id",
  asyncWrapper(async (req: Request, res: Response) => {
    const siteCodeId: String = req.params.id;
    const gaugeData: SiteDataType[] = await gaugesService.findReadingsBySiteCode(
      siteCodeId
    );
    res.status(200).json(gaugeData);
  })
);

// +++++++++++++++++++++++++++++++++++++++++ Site Data ++++++++++++++++++++++++++++++++++++++++++++

module.exports = router;
export {};
