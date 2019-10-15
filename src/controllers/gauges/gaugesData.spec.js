const request = require('supertest');
const api = require('../../server');
const gauges = require('./gaugesDataController');

const gaugeURL =
  'https://water.weather.gov/ahps2/hydrograph_to_xml.php?gage=avln7&output=xml';

describe('Gauges Route', () => {
  describe('getRiverData controller', () => {
    it('should return 200 on success', async () => {
      const res = await request(api).get('/api/gauges/now');
      expect(res.status).toEqual(200);
    });
    it('weather.gov api should return 200', async () => {
      const res = await request(gaugeURL).get(gaugeURL);
      expect(res.status).toEqual(200);
    });
    it('Get XML should be truthy', async () => {
      const data = await gauges.getGaugeData(gaugeURL);
      expect(data).toBeTruthy();
    });
  });
});
