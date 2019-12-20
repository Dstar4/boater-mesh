/* eslint-disable func-names */
// import * as Knex from "knex";
exports.up = function (knex) {
  return knex.schema
    .createTable('users', user => {
      user.increments()
      user.string('email').unique().notNullable()
      user.string('password').notNullable()
      user.json('favorites')
      user.string('avatar')
      user.string('zip').notNullable()
    })
    .createTable('locations', location => {
      location.increments()
      location
        .string('name', 255)
        .notNullable()
        .unique()
      location.text('description', 'longtext')
    })

    .createTable('gauges', gauges => {
      gauges.increments()
      gauges
        .string('name', 255)
        .notNullable()
        .unique()
      gauges
        .string('siteCode')
        .notNullable()
        .unique()
      gauges.decimal('latitude')
      gauges.decimal('longitude')
      gauges.text('description', 'longtext')
      gauges.boolean('hasReading')
      gauges
        .int('locationId', BigInt)
        .references('id')
        .inTable('locations')
    })

    .createTable('readings', readings => {
      readings.increments()
      readings
        .string('siteCode')
        .references('siteCode')
        .inTable('gauges')
        .notNullable()
      readings.string('gaugeReading').notNullable()
      readings.string('timeStamp').notNullable()
      readings.string('variableName').notNullable()
      readings.string('units')
    })
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('gauges').dropTableIfExists('readings')
}
