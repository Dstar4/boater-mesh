exports.up = function(knex) {
  return knex.schema
    .createTable('gauges', gauges => {
      gauges.increments();
      gauges
        .string('name', 255)
        .notNullable()
        .unique();
      gauges
        .string('siteCode')
        .notNullable()
        .unique();
      gauges.decimal('latitude');
      gauges.decimal('longitude');
    })

    .createTable('readings', readings => {
      readings.increments();
      readings
        .string('siteCode')
        .references('siteCode')
        .inTable('gauges')
        .notNullable();
      readings.string('gaugeReading').notNullable();
      readings.string('timeStamp').notNullable();
      readings.string('variableName').notNullable();
      readings.string('units');
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('gauges').dropTableIfExists('readings');
};
