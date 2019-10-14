const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'daniel', 'password', {
  dialect: 'sqlite',
  storage: './mesh.sqlite',
});

module.exports = sequelize;
