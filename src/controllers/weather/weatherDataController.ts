const axios = require("axios");
const router = require("express").Router();
import { Request, Response } from "express";
// const URL = "https://api.openweathermap.org/data/2.5/weather?zip=85741,us&appid=f95f8b937ea0757b479511295634ebf6&units=imperial"
const asyncWrapper = require("../../util/asyncWrapper").AsyncWrapper;
const baseURL = "https://api.openweathermap.org/data/2.5";
const appId = "f95f8b937ea0757b479511295634ebf6";

async function getWeatherData(url) {
  try {
    return await axios.get(url);
  } catch (err) {
    // console.log(err)
    return err;
  }
}
router.get(
  "/now",
  asyncWrapper(async (req: Request, res: Response) => {
    const { zip } = req.query;
    const zipURL = `${baseURL}/weather?zip=${zip},us&units=Imperial&appid=${appId}`;
    const response = await getWeatherData(zipURL);
    res.status(200).json(response.data);
  })
);

router.get(
  "/city",
  asyncWrapper(async (req: Request, res: Response) => {
    const { city } = req.query;
    const cityURL = `${baseURL}/forecast?q=${city}&units=Imperial&appid=${appId}`;
    const response = await getWeatherData(cityURL);
    res.status(200).json(response.data);
  })
);

module.exports = router;

export {};
