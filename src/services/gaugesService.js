/* eslint-disable class-methods-use-this */
const axios = require('axios');
const db = require('../data/db-config');
const CommonError = require('../errors/common-error');

module.exports = class GaugesService {
  // Sites
  async findAllSites() {
    return db('gauges');
  }

  async findSiteById(id) {
    return db('gauges').where('id', id);
  }

  async findBySiteCode(siteCode) {
    return db('gauges').where('siteCode', siteCode);
  }

  async addSite(gauge) {
    return db('gauges')
      .insert(gauge)
      .catch((err) => err);
  }

  async updateGauge(ids, params) {
    return db('gauges')
      .where({ siteCode: ids })
      .update(params);
  }

  // Readings
  async findAllReadings() {
    return db('readings').join('gauges', {
      'readings.siteCode': 'gauges.siteCode',
    });
  }

  async addReading(reading) {
    return db('readings').where({
      'readings.siteCode': reading.siteCode,
    }).andWhere({ 'readings.timeStamp': reading.timeStamp }).then((readingList) => {
      if (readingList.length === 0) {
        db('readings')
          .insert(reading)
          .then(() => reading)
          .catch((err) => err);
      }
    })
      .catch((err) => err);
  }

  async findReadingsBySiteCode(siteCodeId) {
    return db('readings')
      .where({ 'readings.siteCode': siteCodeId })
      .then((id) => id);
  }

  async findReadingsBySiteCodeTimestamp(siteCodeId, timeStamp, units) {
    return db('readings').where({
      'readings.siteCode': siteCodeId,
      'readings.timeStamp': timeStamp,
      'readings.units': units,
    });
  }
  // ***************************************** Populate Data *****************************************

  // GetData Sites
  async populateSites() {
    const siteURL = 'http://waterservices.usgs.gov/nwis/iv/?format=json&stateCd=NC&siteStatus=active';
    const response = await axios.get(siteURL);
    if (!response) {
      throw new CommonError(
        'There was no data returned from that source. Check your URL and try again.',
      );
    }
    const allSitesData = [];
    const geoData = response.data.value.timeSeries;
    geoData.map((item) => {
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

  // GetData Readings
  async populateReadings() {
    const url = 'http://waterservices.usgs.gov/nwis/iv/?format=json&stateCd=NC&siteStatus=active';
    const params = {
      period: 'PT1H',
      variable: ['00060', '00065'],
      siteType: 'ST',
    };
    const request = `${url}&period=${params.period}&variable=${params.variable}&siteType=${params.siteType}`;
    const { data } = await axios.get(request);
    if (!data) {
      throw new CommonError('Could not retrieve those readings.');
    }
    const responseData = data.value.timeSeries;
    const allSitesData = [];


    responseData.forEach((item) => {
      if (item.values[0].value && item.values[0].value.length > 0) {
        allSitesData.push(item);
      }
    });

    const returnData = await this.buildArr(allSitesData);
    return returnData;
  }

  // Helper function to build an object to insert into readings db from an array
  async buildArr(arr) {
    arr.forEach(async (item) => {
      for (let i = 0; i < item.values[0].value.length; i += 1) {
        const reading = {
          siteCode: item.sourceInfo.siteCode[0].value,
          gaugeReading: item.values[0].value[i].value,
          timeStamp: item.values[0].value[i].dateTime,
          variableName: item.variable.variableName,
          units: item.variable.unit.unitCode,
        };
        (this.addReading(reading));
      }
    });
  }
};
