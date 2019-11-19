const router = require("express").Router();
import { Request, Response } from "express";
import { GaugesServiceType, ReadingGaugeType } from "../../Types";

const GaugesService = require("../../services/gaugesService");
const CommonError = require("../../errors/common-error");
const asyncWrapper = require("../../util/asyncWrapper").AsyncWrapper;
const gaugesService: GaugesServiceType = new GaugesService();

// +++++++++++++++++++++++++++++++++++++++++ Reading Data +++++++++++++++++++++++++++++++++++++++++

router.get(
  "/info/all",
  asyncWrapper(async (req: Request, res: Response) => {
    const data: ReadingGaugeType[] = await gaugesService.findAllReadings();
    res.status(200).json(data);
  })
);

router.get(
  "/info/:id",
  asyncWrapper(async (req: Request, res: Response) => {
    const siteCodeId: string = req.params.id;
    const data: ReadingGaugeType[] = await gaugesService.findReadingsBySiteCode(
      siteCodeId
    );
    if (data.length > 0) {
      res.status(200).json(data);
    }
    throw new CommonError();
  })
);
module.exports = router;
