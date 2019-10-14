const Gauge = require('../../models/gauge');
const GaugeReading = require('../../models/gaugeReading');

async function gaugeInformation(req, res, next) {
  const data = await Gauge.findAll();
  if (data) {
    res.status(200).json(data);
  } else {
    res.status(500).json('error finding gauge information');
  }
}

async function getGaugeHistory(req, res, next) {
  const data = await GaugeReading.findAll({
    include: [Gauge],
  });
  console.log(data.data);
  res.status(200).json(data);
}

module.exports = {
  gaugeInformation,
  getGaugeHistory,
};
