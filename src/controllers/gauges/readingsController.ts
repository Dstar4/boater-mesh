const router = require("express").Router();
import { Request, Response } from "express";

const GaugesService = require("../../services/gaugesService");
const CommonError = require("../../errors/common-error");
const asyncWrapper = require("../../util/asyncWrapper").AsyncWrapper;
const { GaugeType, ReadingType, GaugeReadingType } = require("../../Types");
const gaugesService = new GaugesService();

// +++++++++++++++++++++++++++++++++++++++++ Reading Data +++++++++++++++++++++++++++++++++++++++++

router.get(
  "/info/all",
  asyncWrapper(async (req: Request, res: Response) => {
    const data = await gaugesService.findAllReadings();
    res.status(200).json(data);
  })
);

router.get(
  "/info/:id",
  asyncWrapper(async (req, res) => {
    const siteCodeId: string = req.params.id;
    const data = await gaugesService.findReadingsBySiteCode(siteCodeId);
    // console.log(data);
    if (data.length > 0) {
      res.status(200).json(data);
    }
    throw new CommonError();
  })
);
module.exports = router;
