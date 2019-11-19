var knex = require("knex");
require("dotenv").config();
var knexConfig = require("../../knexfile");
var dbEnv = process.env.DB_ENV || "production";
module.exports = knex(knexConfig[dbEnv]);
