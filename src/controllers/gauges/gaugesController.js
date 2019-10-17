// const Sequelize = require('sequelize');
const Gauge = require('../../models/gauge');
const GaugeReading = require('../../models/gaugeReading');

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
  const data = await Gauge.findAll();
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
    const GaugeData = await Gauge.findAll({
      where: { siteCode: siteCodeId },
    });
    const GaugeReadingData = await GaugeReading.findAll({
      where: { siteCode: siteCodeId },
    });
    await Promise.all([GaugeData, GaugeReadingData]).then(values => {
      const returnData = {
        gaugeData: values[0],
        gaugeReading: values[1],
      };
      if (values[0].length > 0 || values[1].length > 0) {
        res.status(200).json(returnData);
      } else {
        res.status(500).json({ error: 'invalid siteCode' });
      }
    });
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
    const data = await GaugeReading.findAll();
    console.log(data);
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
  const siteCodeId = req.params.id;
  try {
    const GaugeReadingData = await GaugeReading.findAll({
      where: { siteCode: siteCodeId },
    });
    res.status(200).json(GaugeReadingData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
}

// +++++++++++++++++++++++++++++++++++++++++ Site Data ++++++++++++++++++++++++++++++++++++++++++++

module.exports = {
  gaugeInformation,
  getGaugeHistory,
  getSiteById,
  getReadingsById,
};
