/* eslint-disable no-undef */
const GaugesService = require('../dist/services/gaugesService');

const gaugesService = new GaugesService();

const testReading = {
  id: 4507,
  siteCode: '03550000',
  gaugeReading: '93.1',
  timeStamp: '2019-11-16T18:30:00.000-05:00',
  variableName: 'Streamflow, ft&#179;/s',
  units: 'ft3/s',
  name: 'VALLEY RIVER AT TOMOTLA, NC',
  latitude: 35.13888889,
  longitude: -83.9805556,
  runName: null,
  description: null,
  hasReading: 1,
};
const testSite = {
  id: 4507,
  name: 'VALLEY RIVER AT TOMOTLA, NC',
  siteCode: '03550000',
  latitude: 35.13888889,
  longitude: -83.9805556,
  runName: null,
  description: null,
  hasReading: 1,
};


const keys = Object.keys(testSite).sort();

// TODO: UPDATE ROUTE PATHS TO NEW ONES
describe('GAUGES SERVICE', () => {
  describe('GET GAUGE INFORMATION', () => {
    it('returns defined data', async () => {
      const data = await gaugesService.findAllSites();
      expect(data).toBeTruthy();
    });
    it('returns an array with a length', async () => {
      const data = await gaugesService.findAllSites();
      expect(data.length).toBeGreaterThan(1);
    });
  });
  describe('GET SITE BY ID', () => {
    it('returns defined data', async () => {
      const data = await gaugesService.findBySiteCode('0204382800');
      expect(data).toBeTruthy();
    });
    it('should return an object that with the proper keys', async () => {
      const data = await gaugesService.findBySiteCode('0204382800');
      expect(Object.keys(data[0]).sort()).toMatchObject(keys);
    });
    it('should return defined values for a site', async () => {
      const data = await gaugesService.findBySiteCode('03550000');
      expect(data[0]).toMatchObject(testSite);
    });
    it('should return an empty array with a bad site ID', async () => {
      const data = await gaugesService.findBySiteCode('02043');
      expect(data.length).toEqual(0);
      expect(data).toEqual([]);
    });
  });
  describe('GET GAUGE HISTORY', () => {
    it('returns defined data', async () => {
      const data = await gaugesService.findAllReadings();
      expect(data).toBeTruthy();
    });
    it('returns an array with a length', async () => {
      const data = await gaugesService.findAllReadings();
      expect(data).toBeTruthy();
      expect(data.length).toBeGreaterThan(1);
    });
  });
  describe('GET READINGS BY ID', () => {
    it('Should fail with an invalid id', async () => {
      const data = await gaugesService.findReadingsBySiteCode('0355');
      expect(data).toEqual([]);
      expect(data.length).toEqual(0);
    });
    it('should return defined data on success', async () => {
      const data = await gaugesService.findReadingsBySiteCode('03550000');
      expect(data).toBeTruthy();
      expect(data.length).toBeGreaterThan(1);
      // expect(data[0]).toMatchObject(testReading);
    });
  });
});
