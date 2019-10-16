const request = require('supertest');
const api = require('../../server');

describe('GAUGE CONTROLLER', () => {
  describe('GET GAUGE INFORMATION', () => {
    it('returns a 200 on success', async () => {
      const data = await request(api).get('/api/gauges/all');
      await expect(data.status).toBe(200);
    });
    it('returns defined data', async () => {
      const response = await request(api).get('/api/gauges/all');
      const data = response.req.res;
      expect(data.text).toBeTruthy();
      const parsedText = JSON.parse(data.text);
      expect(parsedText.id).toEqual(1);
    });
  });
});
