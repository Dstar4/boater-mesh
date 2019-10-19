const db = require('../db-config');

function find() {
  return db('gauges');
}
function findById(id) {
  return db('gauges').where('id', id);
  // .first()
  // .then(gauge => gauge || null);
}
function findBySiteCode(siteCode) {
  return db('gauges').where('siteCode', siteCode);
  // .first()
  // .then(gauge => gauge || null);
}
function add(gauge) {
  // console.log('adding');
  return db('gauges')
    .insert(gauge)
    .then(id => id);

  // .then(([id]) => this.FindById(id));
}

module.exports = {
  find,
  findById,
  add,
  findBySiteCode,
};
