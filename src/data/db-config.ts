const knex = require("knex");
require("dotenv").config();

const knexConfig = require("../../knexfile");

const dbEnv = "production";

module.exports = knex(knexConfig[dbEnv]);
