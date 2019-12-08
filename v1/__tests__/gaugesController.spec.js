/* eslint-disable no-undef */
const request = require('supertest');

const api = require('../src/server');

jest.setTimeout(20000);
// TODO: UPDATE ROUTE PATHS TO NEW ONES
describe('GAUGES CONTROLLER', () => {
  describe('/api/gauges/', () => {
    it('should return a 200 on success', async () => {
      const res = await request(api).get('/api/gauges/');
      expect(res.status).toBe(200);
    });
  });
  describe('/api/gauges/:id', () => {
    it('should return a 200 on success', async () => {
      const res = await request(api).get('/api/gauges/03446000');
      expect(res.status).toBe(200);
    });
    it('should return a 500 on failure', async () => {
      const res = await request(api).get('/api/gauges/0350');
      expect(res.status).toBe(500);
      // expect(res.data).toBe('Invalid Id');
    });
  });
});
