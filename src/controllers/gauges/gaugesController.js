const axios = require('axios');
const xml2js = require('xml2js');

const parser = new xml2js.Parser();

const baseURL =
  'https://water.weather.gov/ahps2/hydrograph_to_xml.php?gage=avln7&output=xml';

async function getGaugeData(url) {
  try {
    const text = await axios.get(url);
    if (text) {
      return text;
    }
  } catch (error) {
    console.log('error here', error);
    // throw new Error('bad request');
    return 'bad request';
  }
}

async function getRiverData(req, res) {
  getGaugeData(baseURL).then(response => {
    parser.parseString(response.data, function(err, result) {
      const myData = result.site.observed[0].datum;
      const waterData = [];

      myData.map(item => {
        const waterObj = {
          timeStamp: item.valid[0]._,
          primaryLevel: item.primary[0]._,
          primaryLevelUnits: item.primary[0].$.units,
          secondaryLevel: item.secondary[0]._,
          secondaryLevelUnits: item.secondary[0].$.units,
        };
        waterData.push(waterObj);
      });

      console.log('waterData', waterData);
      res.status(200).json(waterData);
      if (err) {
        console.log(err);
      }
    });
  });
}

module.exports = { getRiverData, getGaugeData };
