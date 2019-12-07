/* eslint-disable array-callback-return */
/* eslint-disable class-methods-use-this */
const axios = require('axios');

const db = require('../data/db-config');
const CommonError = require('../errors/common-error');

const NC_SITES = [
  '03524000',
  '03512000',
  '03512000',
  '03460000',
  '03410210',
  '03453000',
  '03460000',
  '02176930',
  '02176930',
  '02177000',
  '02177000',
  '02177000',
  '0351706800',
  '03518500',
  '03539778',
  '03539778',
  '03540500',
  '03540500',
  '03539600',
  '03539600',
  '03441000',
  '03451500',
  '03453500',
  '03451500',
  '03451500',
  '03451500',
  '03439000',
  '03443000',
  '03453500',
  '03439000',
  '03451500',
  '03189600',
  '03192000',
  '03540500',
  '03539778',
  '03453000',
  '02138500',
  '02399200',
  '02398950',
  '02399200',
  '02398950',
  '02399200',
  '02398950',
  '03539778',
  '03539778',
  '03503000',
  '03503000',
  '03446000',
  '03505550',
  '03505550',
  '03185400',
  '03465500',
  '03465500',
  '03465500',
  '03540500',
  '03540500',
  '03512000',
  '02176930',
  '02177000',
  '03460795',
  '03455500',
  '03531500',
  '03531500',
  '03512000',
  '03512000',
  '03208500',
  '03209000',
  '03208500',
  '03209000',
  '02169000',
  '02168504',
  '02162350',
  '03518500',
  '03451000',
  '02181580',
  '03473000',
  '03465500',
  '03463300',
  '03463300',
  '03510577',
  '03076500',
];

module.exports = class GaugesService {
  // Locations
  async findAllLocations() {
    return db('locations');
  }

  async addLocation(location) {
    return db('locations')
      .insert(location)
      .catch((err) => {
        throw new CommonError(err);
      });
  }

  // Sites
  async findAllSites() {
    return db('gauges');
    // .where({ hasReading: true });
  }

  async findSiteById(id) {
    return db('gauges')
      .where('id', id)
      .catch((err) => {
        throw new CommonError(err);
      });
  }

  async findBySiteCode(siteCode) {
    return db('gauges').where({ siteCode });
  }

  async addSite(gauge) {
    return db('gauges')
      .insert(gauge)
      .catch((err) => {
        throw new CommonError(err);
      });
  }

  async updateGauge(siteCode) {
    return db('gauges')
      .where({ siteCode })
      .update({ hasReading: true })
      .catch((err) => {
        throw new CommonError(err);
      });
  }

  async updateGaugeLocation(siteCode, locationId) {
    return db('gauges')
      .where({ siteCode })
      .update({ locationId })
      .catch((err) => {
        throw new CommonError(err);
      });
  }

  // Readings
  async findAllReadings() {
    return db('readings')
      .join('gauges', {
        'readings.siteCode': 'gauges.siteCode',
      })
      .catch((err) => {
        throw new CommonError(err);
      });
  }

  async addHasReading(siteCode) {
    return db('readings')
      .where({ siteCode })
      .insert({ hasReading: true })
      .catch((err) => {
        throw new CommonError('Error adding HasReading');
      });
  }

  async addReading(reading) {
    db('gauges')
      .where({ siteCode: reading.siteCode })
      .insert({ hasReading: true })
      .then(
        db('readings')
          .where({
            'readings.siteCode': reading.siteCode,
          })
          .andWhere({ 'readings.timeStamp': reading.timeStamp })
          .then((readingList) => {
            if (readingList.length === 0) {
              db('readings')
                .insert(reading)
                .catch((err) => {
                  throw new CommonError(err);
                });
              // console.log('READING', reading);
              return reading;
            }
            // console.log('else');
            return 'no reading';
          }),
        // .then(this.updateGauge(reading.siteCode))
        // .catch((err) => {
        // throw new CommonError(err);
        // console.log('Error Updating Reading');
        // }),
      )
      .catch((err) => {
        // throw new CommonError('Error Adding Reading', err);
      });
  }

  async findReadingsBySiteCode(siteCode) {
    return db('readings')
      .join('gauges', {
        'readings.siteCode': 'gauges.siteCode',
      })
      .where({ 'readings.siteCode': siteCode, 'readings.units': 'ft3/s' });
    // .then((id: number) => id);
  }

  async findReadingsBySiteCodeTimestamp(
    siteCode,
    timeStamp,
    units,
  ) {
    return db('readings').where({
      'readings.siteCode': siteCode,
      'readings.timeStamp': timeStamp,
      'readings.units': units,
    });
  }
  // ***************************************** Populate Data *****************************************

  // GetData Sites
  async populateSites() {
    const siteURL = `http://waterservices.usgs.gov/nwis/iv/?format=json&sites=${NC_SITES}`;
    const response = await axios.get(siteURL);
    if (!response) {
      throw new CommonError(
        'There was no data returned from that source. Check your URL and try again.',
      );
    }
    const allSitesData = [];
    const geoData = response.data.value.timeSeries;

    geoData.map((item) => {
      if (item.sourceInfo.siteCode && item.sourceInfo.siteCode[0].value) {
        const siteData = {
          name: item.sourceInfo.siteName,
          siteCode: item.sourceInfo.siteCode[0].value,
          latitude: item.sourceInfo.geoLocation.geogLocation.latitude,
          longitude: item.sourceInfo.geoLocation.geogLocation.longitude,
        };
        allSitesData.push(siteData);
        this.addSite(siteData);
      }
    });
    return allSitesData;
  }

  // GetData Readings
  async populateReadings() {
    const url = `http://waterservices.usgs.gov/nwis/iv/?format=json&sites=${NC_SITES}&period=P3D&siteType=ST&variable=00060,00065`;
    const { data } = await axios.get(encodeURI(url));
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
    // console.log('RETURN DATA', returnData);
    return returnData;
  }

  // Helper function to build an object to insert into readings db from an array
  async buildArr(arr) {
    const tmp = [];
    arr.forEach(async (item) => {
      for (let i = 0; i < item.values[0].value.length; i += 1) {
        const reading = {
          siteCode: item.sourceInfo.siteCode[0].value,
          gaugeReading: item.values[0].value[i].value,
          timeStamp: item.values[0].value[i].dateTime,
          variableName: item.variable.variableName,
          units: item.variable.unit.unitCode,
        };
        tmp.push(reading);
        tmp.push(this.addReading(reading));
      }
    });
    return tmp;
  }
};
