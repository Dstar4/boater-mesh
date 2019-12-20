const fs = require('fs')
const parseString = require('xml2js').parseString

fs.readFile('data.xml', 'utf-8', (error, text) => {
  if (error) {
    throw error
  } else {
    parseString(text, function (err, result) {
      const data = result
      // console.log(data)
      const x = JSON.stringify(cleanData(data))
      fs.writeFile('test.json', x, function (error) {
        if (err) {
          return console.log(err)
        }
        // console.log('Success');
      })
    })
  }
  // return console.log('Good to go')
})

function cleanData (data) {
  console.log(data.site.observed[0].datum[0].primary[0]._)
  const returnData = {
    name: data.site.$.name,
    readings: []
  }
  data.site.observed[0].datum.map(el => {
    const readingsObject = {
      timeStamp: el.valid[0]._,
      primary: el.primary[0]._,
      units: el.primary[0].$.units
    }
    returnData.readings.push(readingsObject)
  })
  console.log(returnData)
  return returnData
}
