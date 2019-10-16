const request = require('supertest');
const api = require('../../server');

jest.setTimeout(20000);
describe('Gauges Data Routes', () => {
  describe('getAllSites controller', () => {
    it('should return 200 on success', async () => {
      const res = await request(api).get('/api/gaugesData/sites');
      expect(res.status).toEqual(201);
    });

    it('should return an array of JSON objects', async () => {
      const res = await request(api).get('/api/gaugesData/sites');
      expect(res.text).toBeTruthy();
    });
  });
});
