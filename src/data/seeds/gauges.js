exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('gauges')
    .del()
    .truncate();
};
