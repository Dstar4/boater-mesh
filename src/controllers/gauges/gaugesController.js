// const Sequelize = require('sequelize');
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
  try {
    const data = await GaugeReading.findAll({
      where: {
        gaugeId: 2053500,
      },
      include: [{ model: Gauge }],
    });
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
}
async function getSiteById(req, res, next) {
  // console.log('req.params', req.params);
  const siteCodeId = req.params.id;
  try {
    const GaugeData = await Gauge.findAll({
      where: { siteCode: siteCodeId },
    });
    const GaugeReadingData = await GaugeReading.findAll({
      where: { siteCode: siteCodeId },
    });
    await Promise.all([GaugeData, GaugeReadingData]).then(function(values) {
      console.log(values[1]);
      const returnData = {
        GaugeData: values[0],
        GaugeReading: values[1],
      };
      res.status(200).json(returnData);
    });
  } catch (err) {
    console.log(err);
  }
}

// var promise1 = Promise.resolve(3);
// var promise2 = 42;
// var promise3 = new Promise(function(resolve, reject) {
//   setTimeout(resolve, 100, 'foo');
// });

// Promise.all([promise1, promise2, promise3]).then(function(values) {
//   console.log(values);
// });
// expected output: Array [3, 42, "foo"]

module.exports = {
  gaugeInformation,
  getGaugeHistory,
  getSiteById,
};
