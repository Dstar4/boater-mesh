const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const GaugeReading = sequelize.define('gaugeReading', {
  siteCode: Sequelize.STRING,
  gaugeReading: Sequelize.STRING,
  timeStamp: Sequelize.STRING,
  // siteCodeFK: Sequelize.STRING,
});

module.exports = GaugeReading;
