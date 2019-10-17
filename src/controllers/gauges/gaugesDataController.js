const axios = require('axios');
const sequelize = require('sequelize');
const Gauge = require('../../models/gauge');
const GaugeReading = require('../../models/gaugeReading');
// ****************************** Helpers ******************************++++

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

// ****************************** Site Data *********************************

const siteURL =
  'http://waterservices.usgs.gov/nwis/iv/?format=json&stateCd=NC&siteStatus=active';
// TODO ADD 500 response
/**
 * @swagger
 * /gaugesData/sites:
 *   get:
 *     description: Gets Gauge Info from all Gauges.
 *     responses:
 *        '200':    # status code
 *          description: A JSON array of user names
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                    type: object
 *                    properties:
 *                      name:
 *                        type: string
 *                        example: NORTHWEST RIVER ABOVE MOUTH NEAR MOYOCK, NC
 *                      siteCode:
 *                        type: string
 *                        example: 02043410
 *                      latitude:
 *                        type: float
 *                        example: 36.5122222
 *                      longitude:
 *                         type: float
 *                         example: -76.0866667
 *                      units:
 *                         type: string
 *                         example: ft3/s
 *                      flowType:
 *                         type: string
 *                      example: Streamflow, ft&#179;/s
 */
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
        allSitesData.push(siteData);
      });
    } catch (err) {
      next(err);
    }
    const returnObject = {
      data: allSitesData,
    };
    res.status(201).json(allSitesData);
  });
}
// ****************************** Reading Data ******************************+

const populateURL =
  'http://waterservices.usgs.gov/nwis/iv/?format=json&stateCd=NC&period=P1D';
/**
 * @swagger
 * /gaugesData/readings:
 *   get:
 *     description: Gets Gauge Readings from all Gauges.
 *     responses:
 *        '200':
 *          description: A JSON array of gauge readings
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                    type: object
 *                    properties:
 *                      siteCode:
 *                        type: string
 *                        example: 02043410
 *                      gaugeReading:
 *                        type: float
 *                        example: 1.63
 *                      timestamp:
 *                         type: string
 *                         example: 2019-10-14T20:30:00.000-04:00
 *                      variableName:
 *                         type: string
 *                         example: Streamflow, ft&#179;/s"
 */
async function populateGaugeData(req, res, next) {
  getGaugeData(populateURL).then(response => {
    const responseData = response.data.value.timeSeries;
    const allSitesData = [];

    responseData.map(item => {
      if (item.values[0].value) {
        try {
          // TODO REMOVE THE HARD CODED 2 AND BRING IN MORE DATA
          for (let i = 0; i < item.values.length; i += 1) {
            const siteData = {
              siteCode: item.sourceInfo.siteCode[0].value,
              gaugeReading: item.values[0].value[i].value,
              timeStamp: item.values[0].value[i].dateTime,
              variableName: item.variable.variableName,
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
/*
{
	"period":"T1H",
	"siteCodes": ["0204382800","02069000"],
	"variable":["00060","00065"],
	"siteType": "ST"
}
*/
async function getDataBySiteId(req, res, next) {
  try {
    const url = 'http://waterservices.usgs.gov/nwis/iv/?format=json';
    const {
      period = 'PT6H',
      siteCodes,
      variable = ['00060', '00065'],
      siteType = 'ST',
    } = req.body;
    const request = `${url}&period=P${period}&site=${siteCodes}&variable=${variable}&siteType=${siteType}`;
    const { data } = await axios.get(request);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}
module.exports = {
  getGaugeData,
  getAllSites,
  populateGaugeData,
  getDataBySiteId,
};
