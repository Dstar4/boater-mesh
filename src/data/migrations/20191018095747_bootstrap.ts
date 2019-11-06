import * as Knex from "knex";
exports.up = function(knex: Knex) {
  return knex.schema
    .createTable("gauges", gauges => {
      gauges.increments();
      gauges
        .string("name", 255)
        .notNullable()
        .unique();
      gauges
        .string("siteCode")
        .notNullable()
        .unique();
      gauges.decimal("latitude");
      gauges.decimal("longitude");
      gauges.string("runName", 255).unique();
      gauges.text("description", "longtext");
    })

    .createTable("readings", readings => {
      readings.increments();
      readings
        .string("siteCode")
        .references("siteCode")
        .inTable("gauges")
        .notNullable();
      readings.string("gaugeReading").notNullable();
      readings.string("timeStamp").notNullable();
      readings.string("variableName").notNullable();
      readings.string("units");
    });
};

exports.down = function(knex: Knex) {
  return knex.schema.dropTableIfExists("gauges").dropTableIfExists("readings");
};
export {};
