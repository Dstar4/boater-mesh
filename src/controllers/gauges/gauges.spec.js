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
      // console.log('data', data);
      expect(data.text).toBeTruthy();
      const parsedText = JSON.parse(data.text);
      // console.log('parsed text', parsedText);
      expect(parsedText[0].id).toBe(1);
    });
    it('returns an array with a length', async () => {
      const response = await request(api).get('/api/gauges/all');
      const data = response.req.res;
      const parsedText = JSON.parse(data.text);
      expect(parsedText.length).toBeGreaterThan(1);
    });
  });

  describe('GET SITE BY ID', () => {
    it('should fail with a 404 is no id is provided', async () => {
      const response = await request(api).get('/api/gauges/sites/');
      expect(response.status).toBe(404);
    });
    it('Should fail with an invalid id', async () => {
      const response = await request(api).get('/api/gauges/sites/02062331500');
      expect(response.status).toBe(500);
    });
    it('should return a 200 on success', async () => {
      const response = await request(api).get('/api/gauges/sites/0204382800');
      expect(response.status).toBe(200);
    });
    it('should return an object with 2 arrays inside', async () => {
      const response = await request(api).get('/api/gauges/sites/0204382800');
      const data = response.req.res;
      // expect(data.text).toBeTruthy();
      const parsedText = JSON.parse(data.text);
      expect(parsedText.gaugeData[0].siteCode).toBe('0204382800');
    });
  });

  describe('GET GAUGE HISTORY', () => {});

  describe('GET READINGS BY ID', () => {});
});
