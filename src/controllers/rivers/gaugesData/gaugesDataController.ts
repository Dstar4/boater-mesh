const axios = require("axios");
const asyncWrapper = require("../../../util/asyncWrapper").AsyncWrapper;
const validator = require("../../../middleware/validator");
import GaugesService = require("../../../services/GaugesService");

import { Request, Response, NextFunction } from "express";

const router = require("express").Router();
const gaugesService = new GaugesService();

// ****************************** Helpers ******************************++++
async function getGaugeData(url: string) {
  try {
    const text: any[] = await axios.get(url);
    if (text) {
      return text;
    }
  } catch (error) {
    return error;
  }
}

// ****************************** Site Data *********************************

router.get(
  "/sites",
  asyncWrapper(async (req: Request, res: Response) => {
    let data = await gaugesService.populateSites();
    res.send(data);
  })
);

// ****************************** Reading Data ******************************+
router.get(
  "/readings",
  asyncWrapper(async (req: Request, res: Response) => {
    const allSitesData = await gaugesService.populateReadings();
    // console.log("readings allsitesdata", allSitesData);
    res.send(allSitesData);
  })
);

router.post(
  "/sites",
  // [validator("Gauge")],
  asyncWrapper(async (req: Request, res: Response) => {
    const url: String = "http://waterservices.usgs.gov/nwis/iv/?format=json";
    const {
      period = "PT6H",
      siteCodes,
      variable = ["00060", "00065"],
      siteType = "ST",
    }: {
      period: string;
      siteCodes: any;
      variable: string[];
      siteType: string;
    } = req.body;

    const request = `${url}&period=P${period}&site=${siteCodes}&variable=${variable}&siteType=${siteType}`;
    console.log(request);
    const { data } = await axios.get(request);

    res.status(200).json(data);
  })
);

module.exports = router;
export {};
