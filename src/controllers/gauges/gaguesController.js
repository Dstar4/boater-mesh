const axios = require('axios');
const xml2js = require('xml2js');
const fs = require('fs');

const parser = new xml2js.Parser();

const baseURL =
  'https://water.weather.gov/ahps2/hydrograph_to_xml.php?gage=avln7&output=xml';

async function parseXML(url) {
  const text = await axios.get(url);
  if (text) {
    // console.log('return txt');
    return text;
  }
}

async function getRiverData(req, res) {
  parseXML(baseURL).then(response => {
    // console.log('response', response, 'response');
    parser.parseString(response.data, function(err, result) {
      const data = result;
      const { observed } = data.site;
      res.status(200).json(observed);
      // console.log('data', data);
      if (err) {
        console.log(err);
      }
    });
  });
}

module.exports = { getRiverData };
