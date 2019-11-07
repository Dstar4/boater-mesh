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
  async findAllSites(siteCode) {
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

  // Readings

  findAllReadings() {
    return db("readings").join("gauges", {
      "readings.siteCode": "gauges.siteCode",
    });
  }
  async addReading(reading) {
    return db("readings")
      .insert(reading)
      .then(id => id);
  }
  async findReadingsBySiteCode(siteCodeId) {
    return db("readings").where({ "readings.siteCode": siteCodeId });
    // .join('gauges', {
    // 'readings.siteCode': 'gauges.siteCode',
    // });
  }
  async findReadingsBySiteCodeTimestamp(siteCodeId, timeStamp, units) {
    return db("readings").where({
      "readings.siteCode": siteCodeId,
      timeStamp,
      units,
    });
    // .join('gauges', {
    // 'readings.siteCode': 'gauges.siteCode',
    // });
  }

  // Populate Data
  async populateSites() {
    const siteURL: string =
      "http://waterservices.usgs.gov/nwis/iv/?format=json&stateCd=NC&siteStatus=active";

    let response = await axios.get(siteURL);
    // let response = null;

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
};
