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

// Example Object
// "name": "NORTHWEST RIVER ABOVE MOUTH NEAR MOYOCK, NC",
// "siteCode": "02043410",
// "latitude": 36.5122222,
// "longitude": -76.0866667,
// "units": "ft3/s",
// "flowType": "Streamflow, ft&#179;/s"
