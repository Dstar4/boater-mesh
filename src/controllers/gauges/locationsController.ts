const router = require("express").Router();
import { Request, Response } from "express";
const db = require("../../data/db-config");
const GaugesService = require("../../services/gaugesService");
const CommonError = require("../../errors/common-error");
const asyncWrapper = require("../../util/asyncWrapper").AsyncWrapper;
const { GaugeType, ReadingType, GaugeReadingType } = require("../../Types");
const gaugesService = new GaugesService();
const Locations = db("Locations");

router
  .route("/")
  .get(
    asyncWrapper(async (req: Request, res: Response) => {
      const data = await gaugesService.findAllLocations();
      res.status(200).json(data);
    })
  )
  .post(
    asyncWrapper(async (req: Request, res: Response) => {
      const location = req.body;
      const data = await gaugesService.addLocation(location);
      res.status(200).json(data);
    })
  );
module.exports = router;
export {};
