const axios = require('axios');

const baseURL = 'https://api.openweathermap.org/data/2.5';
const appId = 'f95f8b937ea0757b479511295634ebf6';

module.exports = class WeatherService {
  static async getWeatherDataByZip(zip) {
    const zipUrl = `${baseURL}/weather?zip=${zip},us&units=Imperial&appid=${appId}`;
    const { data } = await axios.get(zipUrl);
    return data;
  }

  static async getWeatherDataByCity(city) {
    const cityURL = `${baseURL}/forecast?q=${city}&units=Imperial&appid=${appId}`;
    const { data } = await axios.get(cityURL);
    return data;
  }
};
