// const Sequelize = require('sequelize');
const Gauge = require('../../models/gauge');
const GaugeReading = require('../../models/gaugeReading');

// +++++++++++++++++++++++++++++++++++++++++ All Data +++++++++++++++++++++++++++++++++++++++++++++
// Get Information on all Gauges
async function gaugeInformation(req, res, next) {
  const data = await Gauge.findAll();
  if (data) {
    res.status(200).json(data);
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
