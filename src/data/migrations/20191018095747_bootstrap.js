exports.up = function(knex) {
  return knex.schema
    .createTable('gauges', gauges => {
      gauges.increments();
      gauges.string('name', 255).notNullable();
      gauges.string('siteCode');
      gauges.decimal('latitude');
      gauges.decimal('longitude');
      gauges.string('units');
      gauges.string('flowType');
    })
    .createTable('readings', readings => {
      readings.increments();
      readings.string('siteCode');
      readings.string('gaugeReading');
      readings.string('timeStamp');
      readings.string('variableName');
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('gauges').dropTableIfExists('readings');
};
