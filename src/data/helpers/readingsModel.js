const db = require('../db-config');

function find() {
  return db('readings');
}
function add(reading) {
  // console.log(reading);
  return db('readings')
    .insert(reading)
    .then(id => id);
}
async function findBySiteCode(siteCode) {
  return db('readings')
    .where({ siteCode })
    .first()
    .then(reading => reading || null);
}
module.exports = {
  find,
  add,
  findBySiteCode,
};
