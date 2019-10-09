module.exports = {
  getWeatherDataByZip,
  getWeatherDataByCity
}


const axios = require('axios')

// const URL = "https://api.openweathermap.org/data/2.5/weather?zip=85741,us&appid=f95f8b937ea0757b479511295634ebf6&units=imperial"

const baseURL = "https://api.openweathermap.org/data/2.5"
const appId = "f95f8b937ea0757b479511295634ebf6"

async function getWeatherDataByZip(req, res, next) {
  let zip = req.query.zip
  const cityURL = baseURL + `/weather?zip=${zip},us&appid=${appId}`
  let { data } = await getWeatherData(cityURL)
  console.log(data)
  if (data) {
    res.status(200).json(data)
  } else {
    res.status(400).json("error with zip");
  }
}

async function getWeatherDataByCity(req, res, next) {
  let city = req.query.city
  const cityURL = baseURL + `/forecast?q=${city}&appid=${appId}`
  let { data } = await getWeatherData(cityURL)
  // let loggedData = JSON.stringify(data)
  res.status(200).json(data);
}

async function getWeatherData(url) {
  try {
    return await axios.get(url)
  } catch (err) {
    console.log(err)
    // next(err)
  }
}
