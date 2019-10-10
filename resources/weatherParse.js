const fs = require('fs');

const xml2js = require('xml2js');

const parser = new xml2js.Parser();

const xmlfile = './weatherRSS.xml';

fs.readFile(xmlfile, 'utf-8', function(error, text) {
  if (error) {
    throw error;
  } else {
    parser.parseString(text, function(err, result) {
      const data = result;
      fs.writeFile('test.json', JSON.stringify(data), function(error) {
        if (err) {
          return console.log(err);
        }
        console.log('Success');
      });
    });
  }
  return console.log('Good to go');
});
