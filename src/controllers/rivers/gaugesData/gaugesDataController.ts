const axios = require("axios");
const asyncWrapper = require("../../../util/asyncWrapper").AsyncWrapper;
import GaugesService = require("../../../services/GaugesService");

import { Request, Response, NextFunction } from "express";
import {
  SiteDataType,
  ReadingDataType,
  SiteDataRequestType,
  ReadingType,
} from "../riverTypes";
// import Gauge = require("../../../data/helpers/gaugesModel");
// import GaugeReading = require("../../../data/helpers/readingsModel");
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
    // if (data) {
    res.send(data);
    // } else {
    // throw new ValidationError("given plan is invalid");
    // }
  })
);

// ****************************** Reading Data ******************************+
router.get(
  "/readings",
  asyncWrapper(async (req: Request, res: Response) => {
    const populateURL =
      "http://waterservices.usgs.gov/nwis/iv/?format=json&stateCd=NC&period=PT12H&siteType=ST";
    getGaugeData(populateURL).then(response => {
      const responseData: any[] = response.data.value.timeSeries;
      let allSitesData: ReadingType[] = [];

      responseData.map(async item => {
        if (item.values[0].value) {
          for (let i = 0; i < item.values.length; i += 1) {
            const siteData: ReadingType = {
              siteCode: item.sourceInfo.siteCode[0].value,
              gaugeReading: item.values[0].value[i].value,
              timeStamp: item.values[0].value[i].dateTime,
              variableName: item.variable.variableName,
              units: item.variable.unit.unitCode,
            };
            allSitesData.push(siteData);
            const compare: ReadingDataType[] = await gaugesService.findBySiteCodeTimestamp(
              siteData.siteCode,
              siteData.timeStamp,
              siteData.units
            );
            if (compare.length < 1) {
              gaugesService.addReading(siteData);
            }
          }
          res.status(201).json(allSitesData);
        }
      });
    });
  })
);

router.post(
  "/sites",
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
    const { data } = await axios.get(request);

    res.status(200).json(data);
  })
);

module.exports = router;
export {};
