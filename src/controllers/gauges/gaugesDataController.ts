const router = require("express").Router();
import { Request, Response } from "express";
const asyncWrapper = require("../../util/asyncWrapper").AsyncWrapper;
const GaugesService = require("../../services/gaugesService");
import { ReadingType, GaugeType } from "../../Types";
const gaugesService = new GaugesService();

// ****************************** Site Data *********************************

// URL: api/gaugesData/sites
router.route("/sites").get(
  asyncWrapper(async (req: Request, res: Response) => {
    const data: Promise<GaugeType[]> = await gaugesService.populateSites();
    res.send(data);
  })
);

// ****************************** Reading Data ******************************+

//TODO: FIX THIS ENDPOINT TO ACTUALLY RETURN THE CORRECT READINGS THAT WERE ADDED UPON FINISHING
// api/gaugesData/readings
router.route("/readings").get(
  asyncWrapper(async (req: Request, res: Response) => {
    const allSitesData: Promise<any> = await gaugesService.populateReadings();
    res.send(allSitesData);
  })
);

module.exports = router;
export {};
