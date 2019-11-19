/* eslint-disable class-methods-use-this */
import axios, { AxiosResponse } from "axios";
const db = require("../data/db-config");
const CommonError = require("../errors/common-error");
const { ReadingType, GaugeType, ReadingGaugeType } = require("../Types");

module.exports = class GaugesService {
  // Locations
  public async findAllLocations(): Promise<any> {
    return await db("locations");
  }

  public async addLocation(location) {
    return await db("locations")
      .insert(location)
      .catch((err: Error) => {
        throw new CommonError(err);
      });
  }
  // Sites
  public async findAllSites(): Promise<GaugeType[]> {
    return await db("gauges").where({ hasReading: true });
  }

  public async findSiteById(id: number): Promise<GaugeType> {
    return await db("gauges").where("id", id);
  }

  public async findBySiteCode(siteCode: string): Promise<GaugeType> {
    return await db("gauges").where("siteCode", siteCode);
  }

  public async addSite(gauge: GaugeType) {
    return await db("gauges")
      .insert(gauge)
      .catch((err: Error) => {
        throw new CommonError(err);
      });
  }

  public async updateGauge(siteCode: string) {
    return await db("gauges")
      .where({ siteCode })
      .update({ hasReading: true })
      .catch((err: Error) => {
        throw new CommonError(err);
      });
  }
  public async updateGaugeLocation(siteCode: string, locationId: number) {
    return await db("gauges")
      .where({ siteCode })
      .update({ locationId: locationId })
      .catch((err: Error) => {
        throw new CommonError(err);
      });
  }
  // Readings
  public async findAllReadings() {
    return await db("readings")
      .join("gauges", {
        "readings.siteCode": "gauges.siteCode",
      })
      .catch((err: Error) => {
        throw new CommonError(err);
      });
  }

  public async addHasReading(siteCode: string) {
    return await db("gauges")
      .where({ siteCode })
      .insert({ hasReading: true })
      .catch((err: Error) => {
        throw new CommonError(err);
      });
  }

  public async addReading(reading: ReadingType) {
    return await db("gauges")
      .where({ siteCode: reading.siteCode })
      .insert({ hasReading: true })
      .then(
        db("readings")
          .where({
            "readings.siteCode": reading.siteCode,
          })
          .andWhere({ "readings.timeStamp": reading.timeStamp })
          .then((readingList: ReadingType[]) => {
            if (readingList.length === 0) {
              // console.log('inserting', reading.siteCode);
              db("readings")
                .insert(reading)
                .then(() => reading)
                .catch((err: Error) => {
                  throw new CommonError(`err adding reading ${err}`);
                });
            }
          })
          .then(this.updateGauge(reading.siteCode))
          .catch((err: Error) => {
            throw new CommonError(`err updating gauge ${err}`);
          })
      )
      .catch((err: Error) => {
        throw new CommonError(err);
      });
  }

  public async findReadingsBySiteCode(siteCode: number) {
    return await db("readings")
      .join("gauges", {
        "readings.siteCode": "gauges.siteCode",
      })
      .where({ "readings.siteCode": siteCode, "readings.units": "ft3/s" })
      .then((id: number) => id);
  }

  public async findReadingsBySiteCodeTimestamp(
    siteCode: number,
    timeStamp: string,
    units: string
  ) {
    return await db("readings").where({
      "readings.siteCode": siteCode,
      "readings.timeStamp": timeStamp,
      "readings.units": units,
    });
  }
  // ***************************************** Populate Data *****************************************

  // GetData Sites
  public async populateSites() {
    const siteURL =
      "http://waterservices.usgs.gov/nwis/iv/?format=json&stateCd=NC&siteStatus=active";
    const response: AxiosResponse = await axios.get(siteURL);
    if (!response) {
      throw new CommonError(
        "There was no data returned from that source. Check your URL and try again."
      );
    }
    const allSitesData = [];
    const geoData = response.data.value.timeSeries;
    geoData.map(item => {
      const siteData: {
        name: string;
        siteCode: string;
        latitude: number;
        longitude: number;
      } = {
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

  // GetData Readings
  public async populateReadings() {
    const url = `http://waterservices.usgs.gov/nwis/iv/?format=json&sites=${NC_SITES}&period=P3D&siteType=ST&variable=00060,00065`;
    const { data }: AxiosResponse = await axios.get(encodeURI(url));
    if (!data) {
      throw new CommonError("Could not retrieve those readings.");
    }
    const responseData = data.value.timeSeries;
    const allSitesData = [];

    responseData.forEach(item => {
      if (item.values[0].value && item.values[0].value.length > 0) {
        allSitesData.push(item);
      }
    });
    const returnData = await this.buildArr(allSitesData);
    return returnData;
  }

  // Helper function to build an object to insert into readings db from an array
  private async buildArr(arr) {
    arr.forEach(async item => {
      for (let i = 0; i < item.values[0].value.length; i += 1) {
        const reading: ReadingType = {
          siteCode: item.sourceInfo.siteCode[0].value,
          gaugeReading: item.values[0].value[i].value,
          timeStamp: item.values[0].value[i].dateTime,
          variableName: item.variable.variableName,
          units: item.variable.unit.unitCode,
        };
        this.addReading(reading);
      }
    });
  }
};
export {};

const NC_SITES: string[] = [
  "03524000",
  "03512000",
  "03512000",
  "03460000",
  "03410210",
  "03453000",
  "03460000",
  "02176930",
  "02176930",
  "02177000",
  "02177000",
  "02177000",
  "0351706800",
  "03518500",
  "03539778",
  "03539778",
  "03540500",
  "03540500",
  "03539600",
  "03539600",
  "03441000",
  "03451500",
  "03453500",
  "03451500",
  "03451500",
  "03451500",
  "03439000",
  "03443000",
  "03453500",
  "03439000",
  "03451500",
  "03189600",
  "03192000",
  "03540500",
  "03539778",
  "03453000",
  "02138500",
  "02399200",
  "02398950",
  "02399200",
  "02398950",
  "02399200",
  "02398950",
  "03539778",
  "03539778",
  "03503000",
  "03503000",
  "03446000",
  "03505550",
  "03505550",
  "03185400",
  "03465500",
  "03465500",
  "03465500",
  "03540500",
  "03540500",
  "03512000",
  "02176930",
  "02177000",
  "03460795",
  "03455500",
  "03531500",
  "03531500",
  "03512000",
  "03512000",
  "03208500",
  "03209000",
  "03208500",
  "03209000",
  "02169000",
  "02168504",
  "02162350",
  "03518500",
  "03451000",
  "02181580",
  "03473000",
  "03465500",
  "03463300",
  "03463300",
  "03510577",
  "03076500",
];
