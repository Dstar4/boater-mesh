const Sequelize = require('sequelize');

const sequelize = require('../util/database');
// const Gauge = require('../models/gauge');

const GaugeReading = sequelize.define('gaugeReading', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  siteCode: {
    type: Sequelize.STRING,
    // references: 'gauge',
    // referencesKey: 'siteCode',
  },
  gaugeReading: Sequelize.STRING,
  timeStamp: Sequelize.STRING,
  variableName: Sequelize.STRING,
});

module.exports = GaugeReading;
