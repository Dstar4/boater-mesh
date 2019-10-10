const axios = require('axios');
const xml2js = require('xml2js');
const fs = require('fs');

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
    console.log(error);
    return error;
  }
}

async function getRiverData(req, res) {
  getGaugeData(baseURL).then(response => {
    parser.parseString(response.data, function(err, result) {
      const data = result;
      // const { observed } = data.site;
      res.status(200).json(data);
      if (err) {
        console.log(err);
      }
    });
  });
}

module.exports = { getRiverData, getGaugeData };
