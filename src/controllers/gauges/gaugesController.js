// const Sequelize = require('sequelize');
const Gauge = require('../../models/gauge');
const GaugeReading = require('../../models/gaugeReading');

// +++++++++++++++++++++++++++++++++++++++++ All Data +++++++++++++++++++++++++++++++++++++++++++++

/**
 * @swagger
 * /gauges/all:
 *   get:
 *     description: Gets Gauge Info from all Gauges from database.
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

// Get Information on all Gauges -- '/api/gauges/all'
async function gaugeInformation(req, res, next) {
  const data = await Gauge.findAll();
  if (data) {
    res.status(200).json(data[0].dataValues);
  } else {
    res.status(500).json('error finding gauge information');
  }
}

// Get gauge info and site info by siteCode
async function getSiteById(req, res, next) {
  const siteCodeId = req.params.id;
  try {
    const GaugeData = await Gauge.findAll({
      where: { siteCode: siteCodeId },
    });
    const GaugeReadingData = await GaugeReading.findAll({
      where: { siteCode: siteCodeId },
    });
    await Promise.all([GaugeData, GaugeReadingData]).then(function(values) {
      // console.log(values[1]);
      const returnData = {
        GaugeData: values[0],
        GaugeReading: values[1],
      };
      res.status(200).json(returnData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
}
// +++++++++++++++++++++++++++++++++++++++++ Reading Data +++++++++++++++++++++++++++++++++++++++++

// Get information on all gauge readings
async function getGaugeHistory(req, res, next) {
  try {
    const data = await GaugeReading.findAll();
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
}

// Get all readings for a gauge by site code
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
