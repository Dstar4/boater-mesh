const axios = require("axios");

// const URL = "https://api.openweathermap.org/data/2.5/weather?zip=85741,us&appid=f95f8b937ea0757b479511295634ebf6&units=imperial"

const baseURL = "https://api.openweathermap.org/data/2.5";
const appId = "f95f8b937ea0757b479511295634ebf6";

async function getWeatherData(url) {
  try {
    return await axios.get(url);
  } catch (err) {
    // console.log(err)
    return err;
  }
}

async function getWeatherDataByZip(req, res) {
  const { zip } = req.query;
  const zipURL = `${baseURL}/weather?zip=${zip},us&units=Imperial&appid=${appId}`;
  const response = await getWeatherData(zipURL);
  // console.log(response)
  if (response.status === 200) {
    res.status(200).json(response.data);
  } else {
    res.status(400).json("error with zip");
  }
}

async function getWeatherDataByCity(req, res) {
  const { city } = req.query;
  const cityURL = `${baseURL}/forecast?q=${city}&units=Imperial&appid=${appId}`;
  const response = await getWeatherData(cityURL);
  // console.log(response)
  if (response.status === 200) {
    res.status(200).json(response.data);
  } else {
    res.status(400).json("error getting city");
  }
}

module.exports = {
  getWeatherDataByZip,
  getWeatherDataByCity,
};
export {};
