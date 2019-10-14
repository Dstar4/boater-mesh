const { Parser } = require('xml2js');
const axios = require('axios');
const Gauge = require('../../models/gauge');

const parser = new Parser();

const baseURL =
  'https://water.weather.gov/ahps2/hydrograph_to_xml.php?gage=avln7&output=xml';

async function getGaugeData(url) {
  try {
    const text = await axios.get(url);
    if (text) {
      return text;
    }
  } catch (error) {
    // console.log('error here', error);
    return error;
  }
}

// FETCHES DATA AND CONVERTS XML, NEW JSON API SHOULD REPLACE THIS
async function getRiverData(req, res, next) {
  getGaugeData(baseURL).then(response => {
    parser.parseString(response.data, function(err, result) {
      const myData = result.site.observed[0].datum;
      const waterData = [];

      myData.map(item => {
        const waterObj = {
          timeStamp: item.valid[0]._,
          primaryLevel: item.primary[0]._,
          primaryLevelUnits: item.primary[0].$.units,
          secondaryLevel: item.secondary[0]._,
          secondaryLevelUnits: item.secondary[0].$.units,
        };
        return waterData.push(waterObj);
      });
      res.status(200).json(waterData);
      if (err) {
        next(err);
        console.log(err);
      }
    });
  });
}
const siteURL =
  'http://waterservices.usgs.gov/nwis/iv/?format=json&stateCd=NC&siteType=ST';

// Gets all gauge sites main data
async function getAllSites(req, res, next) {
  getGaugeData(siteURL).then(response => {
    // const responseData = response.data;
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
        console.log(`inserting ${JSON.stringify(siteData)}`);
        Gauge.create({
          name: item.sourceInfo.siteName,
          siteCode: item.sourceInfo.siteCode[0].value,
          latitude: item.sourceInfo.geoLocation.geogLocation.latitude,
          longitude: item.sourceInfo.geoLocation.geogLocation.longitude,
          units: item.variable.unit.unitCode,
          flowType: item.variable.variableName,
        });
      });
    } catch (err) {
      return err;
    }
    res.status(200).json(allSitesData);
  });
}
const populateURL =
  'http://waterservices.usgs.gov/nwis/iv/?format=json&stateCd=NC&siteType=ST&period=P1D';
async function populateGaugeData(req, res, next) {
  getGaugeData(populateURL).then(response => {
    const responseData = response.data.value.timeSeries;
    const allSitesData = [];

    responseData.map(item => {
      const siteData = {
        siteCode: item.sourceInfo.siteCode[0].value,
        gaugeReading: item.values[0].value.map(x => ({
          timeStamp: x.dateTime,
          value: x.value,
        })),
      };
      return allSitesData.push(siteData);
    });
    res.status(200).json(allSitesData);
  });
}
module.exports = {
  getRiverData,
  getGaugeData,
  getAllSites,
  populateGaugeData,
};
