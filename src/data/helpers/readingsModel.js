const db = require('../db-config');

function find() {
  return db('readings').join('gauges', {
    'readings.siteCode': 'gauges.siteCode',
  });
}
async function add(reading) {
  return db('readings')
    .insert(reading)
    .then(id => id);
}
async function findBySiteCode(siteCodeId) {
  return db('readings').where({ 'readings.siteCode': siteCodeId });
  // .join('gauges', {
  // 'readings.siteCode': 'gauges.siteCode',
  // });
}
async function findBySiteCodeTimestamp(siteCodeId, timeStamp) {
  return db('readings').where({
    'readings.siteCode': siteCodeId,
    timeStamp,
  });
  // .join('gauges', {
  // 'readings.siteCode': 'gauges.siteCode',
  // });
}
module.exports = {
  find,
  add,
  findBySiteCode,
  findBySiteCodeTimestamp,
};
