const request = require('supertest')
const api = require('../server')

const zipURL = '/api/weather/now?'
const cityURL = 'api/weather/city?'

describe('Weather Router', () => {
  let zipQuery = 'zip=85741'
  describe('Get By Zip', () => {
    it('should return 200 on success', async () => {
      const res = await request(api).get(zipURL + zipQuery)
      expect(res.status).toEqual(200)
    });
    it('should fail on invalid zip', async () => {
      let cityQuery = 'city=Tucson'
      const res = await request(api).get(cityURL + cityQuery)
    });
  });
});
