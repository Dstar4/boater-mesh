const axios = require('axios');
const Gauge = require('../../models/gauge');
const GaugeReading = require('../../models/gaugeReading');

async function getGaugeData(url) {
  try {
    const text = await axios.get(url);
    if (text) {
      return text;
    }
  } catch (error) {
    return error;
  }
}

const siteURL =
  'http://waterservices.usgs.gov/nwis/iv/?format=json&stateCd=NC&siteType=ST';

// Gets all gauge sites main data
async function getAllSites(req, res, next) {
  getGaugeData(siteURL).then(response => {
    const allSitesData = [];
    const geoData = response.data.value.timeSeries;
    try {
      geoData.map(item => {
        const siteData = {
          name: item.sourceInfo.siteName,
          siteCode: item.sourceInfo.siteCode[0].value,
          latitude: item.sourceInfo.geoLocation.geogLocation.latitude,
          longitude: item.sourceInfo.geoLocation.geogLocation.longitude,
          units: item.variable.unit.unitCode,
          flowType: item.variable.variableName,
        };
        Gauge.create(siteData);
        return allSitesData.push(siteData);
      });
    } catch (err) {
      next(err);
    }
    res.status(201).json(allSitesData);
  });
}

const populateURL =
  'http://waterservices.usgs.gov/nwis/iv/?format=json&stateCd=NC&siteType=ST&period=P1D';

// Get Reading For all Gauges
async function populateGaugeData(req, res, next) {
  getGaugeData(populateURL).then(response => {
    const responseData = response.data.value.timeSeries;
    const allSitesData = [];

    responseData.map(item => {
      if (item.values[0].value) {
        try {
          for (let i = 0; i < 2; i += 1) {
            const siteData = {
              siteCode: item.sourceInfo.siteCode[0].value,
              gaugeReading: item.values[0].value[i].value,
              timeStamp: item.values[0].value[i].dateTime,
            };
            allSitesData.push(siteData);
            GaugeReading.create(siteData);
          }
        } catch (err) {
          return err;
        }
      }
    });

    res.status(201).json(allSitesData);
  });
}

module.exports = {
  getGaugeData,
  getAllSites,
  populateGaugeData,
};
