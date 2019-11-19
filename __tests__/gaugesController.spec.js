/* eslint-disable no-undef */
const request = require('supertest');

const api = require('../dist/server');

jest.setTimeout(20000);

describe('GAUGES CONTROLLER', () => {
  describe('/all', () => {
    it('should return a 200 on success', async () => {
      const res = await request(api).get('/api/gauges/all');
      expect(res.status).toBe(200);
    });
  });
  describe('/sites/:id', () => {
    it('should return a 200 on success', async () => {
      const res = await request(api).get('/api/gauges/sites/03550000');
      expect(res.status).toBe(200);
    });
    it('should return a 500 on failure', async () => {
      const res = await request(api).get('/api/gauges/sites/0350');
      expect(res.status).toBe(500);
    });
  });
  describe('/info/all', () => {
    it('should return a 200 on success', async () => {
      const res = await request(api).get('/api/gauges/info/all');
      expect(res.status).toBe(200);
    });
  });
  describe('/info/:id', () => {
    it('should return a 200 on success', async () => {
      const res = await request(api).get('/api/gauges/info/03550000');
      expect(res.status).toBe(200);
    });
    it('should return a 500 on failure', async () => {
      const res = await request(api).get('/api/gauges/info/0350');
      expect(res.status).toBe(500);
    });
  });
});
