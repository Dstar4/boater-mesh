const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Gauge = sequelize.define('gauge', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: { type: Sequelize.STRING, allowNull: false },
  siteCode: { type: Sequelize.STRING, allowNull: false },
  latitude: { type: Sequelize.STRING, allowNull: false },
  longitude: { type: Sequelize.STRING, allowNull: false },
  units: { type: Sequelize.STRING, allowNull: false },
  flowType: { type: Sequelize.STRING, allowNull: false },
});

module.exports = Gauge;
