const knex = require('knex');
require('dotenv').config();

const knexConfig = require('../../knexfile');

const dbEnv = process.env.DB_ENV || 'production';

module.exports = knex(knexConfig[dbEnv]);
