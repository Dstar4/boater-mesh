const db = require('../db-config');

function find() {
  return db('readings').join('gauges', {
    'readings.siteCode': 'gauges.siteCode',
  });
}
async function add(reading) {
  // const check = db('readings').where({
  //   siteCode: reading.siteCode,
  //   gaugeReading: reading.gaugeReading,
  //   timeStamp: reading.timeStamp,
  //   variableName: reading.variableName,
  //   units: reading.units,
  // });
  // console.log(check);
  // if (check > 0) {
  // console.log('check failed');
  // return 'error';
  // }
  // try {
  // console.log('here', reading);

  return db('readings')
    .insert(reading)
    .then(id => id);
  // } catch (err) {
  // console.debug(err);
  // return err;
  // }
}
async function findBySiteCode(siteCodeId) {
  return db('readings')
    .where({ 'readings.siteCode': siteCodeId })
    .join('gauges', {
      'readings.siteCode': 'gauges.siteCode',
    });
}
module.exports = {
  find,
  add,
  findBySiteCode,
};
