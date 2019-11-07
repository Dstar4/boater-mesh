const router = require("express").Router();
import Gauge = require("../../../data/helpers/gaugesModel");
import GaugeReading = require("../../../data/helpers/readingsModel");
import { Request, Response } from "express";
import { SiteDataType, ReadingDataType } from "../riverTypes";

const asyncWrapper = require("../../../util/asyncWrapper").AsyncWrapper;

// +++++++++++++++++++++++++++++++++++++++++ All Data +++++++++++++++++++++++++++++++++++++++++++++

router.route("/all").get(
  asyncWrapper(async (req: Request, res: Response) => {
    const data: SiteDataType[] = await Gauge.find();
    res.status(200).json(data);
  })
);

router.get(
  "sites/:id",
  asyncWrapper(async (req: Request, res: Response) => {
    const siteCodeId = req.params.id;
    const data: ReadingDataType[] = await GaugeReading.findBySiteCode(
      siteCodeId
    );
    res.status(200).json(data);
  })
);

// +++++++++++++++++++++++++++++++++++++++++ Reading Data +++++++++++++++++++++++++++++++++++++++++
router.get(
  "/info",
  asyncWrapper(async (req: Request, res: Response) => {
    const data: ReadingDataType[] = await GaugeReading.find();
    res.status(200).json(data);
  })
);

router.get(
  "/readings/:id",
  asyncWrapper(async (req: Request, res: Response) => {
    const siteCodeId: String = req.params.id;
    const gaugeData: SiteDataType[] = await GaugeReading.findBySiteCode(
      siteCodeId
    );
    res.status(200).json(gaugeData);
  })
);

// +++++++++++++++++++++++++++++++++++++++++ Site Data ++++++++++++++++++++++++++++++++++++++++++++

module.exports = router;
export {};
