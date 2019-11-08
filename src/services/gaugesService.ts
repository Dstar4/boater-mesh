const db = require("../data/db-config");
const axios = require("axios");
const CommonError = require("../errors/common-error");
import {
  SiteDataType,
  ReadingDataType,
  SiteDataRequestType,
  ReadingType,
} from "../controllers/rivers/riverTypes";
module.exports = class GaugesService {
  // Sites
  async findAllSites() {
    return await db("gauges");
  }
  async findSiteById(id: number) {
    return db("gauges").where("id", id);
  }
  async findBySiteCode(siteCode: string) {
    return db("gauges").where("siteCode", siteCode);
  }
  async addSite(gauge: {
    id?: number;
    name: string;
    siteCode: number;
    latitude: number;
    longitude: number;
    runName?: null | string;
    description?: null | string;
  }) {
    return await db("gauges")
      .insert(gauge)
      .catch(err => {
        return err;
      });
  }

  async updateGauge(ids, params) {
    return db("gauges")
      .where({ siteCode: ids })
      .update(params);
  }

  // Readings
  findAllReadings() {
    return db("readings");
    // .join("gauges", {
    //   "readings.siteCode": "gauges.siteCode",
    // });
  }
  async addReading(reading) {
    return db("readings")
      .insert(reading)
      .then(id => id);
  }
  async findReadingsBySiteCode(siteCodeId) {
    return db("readings")
      .where({ "readings.siteCode": siteCodeId })
      .then(id => id);
  }
  async findReadingsBySiteCodeTimestamp(siteCodeId, timeStamp, units) {
    return db("readings").where({
      "readings.siteCode": siteCodeId,
      timeStamp,
      units,
    });
  }

  // ***************************************** Populate Data *****************************************

  // GetData Sites
  async populateSites() {
    const siteURL: string =
      "http://waterservices.usgs.gov/nwis/iv/?format=json&stateCd=NC&siteStatus=active";
    let response = await axios.get(siteURL);
    if (!response) {
      throw new CommonError(
        "There was no data returned from that source. Check your URL and try again."
      );
    }
    let allSitesData = [];
    const geoData = response.data.value.timeSeries;
    geoData.map(item => {
      const siteData = {
        name: item.sourceInfo.siteName,
        siteCode: item.sourceInfo.siteCode[0].value,
        latitude: item.sourceInfo.geoLocation.geogLocation.latitude,
        longitude: item.sourceInfo.geoLocation.geogLocation.longitude,
      };
      allSitesData.push(siteData);
      this.addSite(siteData);
    });
    return allSitesData;
  }

  //GetData Readings
  async populateReadings() {
    const url: String =
      "http://waterservices.usgs.gov/nwis/iv/?format=json&stateCd=NC";
    const params = {
      period: "PT6H",
      variable: ["00060", "00065"],
      siteType: "ST",
    };
    const request = `${url}&period=${params.period}&variable=${params.variable}&siteType=${params.siteType}`;
    const { data } = await axios.get(request);
    if (!data) {
      throw new CommonError("Could not retrieve those readings.");
    }
    const responseData: any[] = data.value.timeSeries;
    let allSitesData: ReadingType[] = [];
    responseData.forEach(item => {
      if (item.values[0].value.length > 0) {
        allSitesData.push(item);
      }
    });
    let returnData = await this.buildArr(allSitesData);

    return returnData;
  }

  //  Helper Function to check for duplicates before inserting
  async dataExists(siteData) {
    const compare = await this.findReadingsBySiteCodeTimestamp(
      siteData.siteCode,
      siteData.timeStamp,
      siteData.units
    );
    if (compare.length < 1) {
      return false;
    } else {
      return true;
    }
  }

  // Helper function to build an object to insert into readings db from an array
  async buildArr(arr) {
    let selectedData: ReadingType[] = [];

    arr.forEach(async item => {
      for (let i = 0; i < item.values[0].value.length; i++) {
        let reading = {
          siteCode: item.sourceInfo.siteCode[0].value,
          gaugeReading: item.values[0].value[i].value,
          timeStamp: item.values[0].value[i].dateTime,
          variableName: item.variable.variableName,
          units: item.variable.unit.unitCode,
        };
        selectedData.push(reading);
        if ((await this.dataExists(reading)) === false) {
          await this.addReading(reading);
        }
      }
    });
    return selectedData;
  }
};
