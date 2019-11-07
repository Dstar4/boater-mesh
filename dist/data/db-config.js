"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var knex = require('knex');
require('dotenv').config();
var knexConfig = require('../../knexfile');
var dbEnv = process.env.DB_ENV || 'development';
module.exports = knex(knexConfig[dbEnv]);
