exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('locations')
    .del()
    .truncate();
};
