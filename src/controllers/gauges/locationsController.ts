const router = require("express").Router();
import { Request, Response } from "express";
import { GaugesServiceType, LocationType } from "../../Types";
const db = require("../../data/db-config");
const GaugesService = require("../../services/gaugesService");
const CommonError = require("../../errors/common-error");
const asyncWrapper = require("../../util/asyncWrapper").AsyncWrapper;
const gaugesService: GaugesServiceType = new GaugesService();

router
  .route("/")
  .get(
    asyncWrapper(async (req: Request, res: Response) => {
      const data: LocationType[] = await gaugesService.findAllLocations();
      res.status(200).json(data);
    })
  )
  .post(
    asyncWrapper(async (req: Request, res: Response) => {
      const location: LocationType = req.body;
      const data: Promise<number> = await gaugesService.addLocation(location);
      res.status(200).json(data);
    })
  );
module.exports = router;
export {};
