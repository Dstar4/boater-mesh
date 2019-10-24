const db = require('../db-config');

function find() {
  return db('gauges');
}
function findById(id) {
  return db('gauges').where('id', id);
}
function findBySiteCode(siteCode) {
  return db('gauges').where('siteCode', siteCode);
}
async function add(gauge) {
  return db('gauges')
    .insert(gauge)
    .then(id => id)
    .catch(err => err);
}

async function updateGauge(ids, params) {
  // console.log(ids, params);
  return db('gauges')
    .where({ siteCode: ids })
    .update(params);
  // .then(name => name)
  // .catch(err => err);
}
module.exports = {
  find,
  findById,
  add,
  findBySiteCode,
  updateGauge,
};
