const request = require('supertest');
const api = require('../../server');
// const gauges = require('./gaugesDataController');

describe('Gauges Data Routes', () => {
  describe('getAllSites controller', () => {
    it('should return 200 on success', async () => {
      const response = await request(api).get('/api/gaugesData/sites');
      expect(response.status).toEqual(201);
    });
  });
});
