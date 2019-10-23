// const Sequelize = require('sequelize');
const Gauge = require('../../data/helpers/gaugesModel');
const GaugeReading = require('../../data/helpers/readingsModel');

// +++++++++++++++++++++++++++++++++++++++++ All Data +++++++++++++++++++++++++++++++++++++++++++++

/**
 * @swagger
 * /gauges/all:
 *   get:
 *     description: Gets Gauge Info on all Gauges from database.
 *     responses:
 *        '200':    # status code
 *          description: A JSON array of all available gauges
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                    type: object
 *                    properties:
 *                      id:
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
 *                      createdAt:
 *                        type: string
 *                      updatedAt:
 *                        type: string
 */
async function gaugeInformation(req, res, next) {
  const data = await Gauge.find();
  if (data) {
    res.status(200).json(data);
  } else {
    res.status(500).json('error finding gauge information');
  }
}

/**
 * @swagger
 * /gauges/sites/:id:
 *   get:
 *     description: Gets Gauge Readings and Gauge info by siteCode
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           description: Numeric ID of the site, titled "siteCode"
 *     responses:
 *        '200':
 *          description: A JSON array of gauge readings and site data
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
async function getSiteById(req, res, next) {
  const siteCodeId = req.params.id;
  try {
    const data = await GaugeReading.findBySiteCode(siteCodeId);
    // console.log(data);
    if (data.length > 0) {
      res.status(200).json(data);
    } else {
      res.status(500).json({ error: 'invalid siteCode' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'There was an error retrieving that site.',
      error: err,
    });
  }
}
// +++++++++++++++++++++++++++++++++++++++++ Reading Data +++++++++++++++++++++++++++++++++++++++++

/**
 * @swagger
 * /gauges/info:
 *   get:
 *     description: Gets all Gauge Readings from DB.
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
async function getGaugeHistory(req, res, next) {
  try {
    const data = await GaugeReading.find();
    // console.log(data);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
}

/**
 * @swagger
 * /gauges/readings/:id:
 *   get:
 *     description: Gets Gauge Readings from DB by siteCode.
 *     summary: Gets Gauge Readings from DB by siteCode.
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
async function getReadingsById(req, res, next) {
  // TODO add a check what works for a sitecode that exists but is invalid.
  const siteCodeId = req.params.id;
  try {
    const gaugeData = await GaugeReading.findBySiteCode(siteCodeId);
    if (gaugeData) {
      const returnObject = {
        message: 'data here',
        data: gaugeData,
      };
      res.status(200).json(returnObject);
    } else {
      res.status(500).json({ error: 'invalid siteCode' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'There was an error retrieving that site.',
      error: err,
    });
  }
}

// +++++++++++++++++++++++++++++++++++++++++ Site Data ++++++++++++++++++++++++++++++++++++++++++++

module.exports = {
  gaugeInformation,
  getGaugeHistory,
  getSiteById,
  getReadingsById,
};
