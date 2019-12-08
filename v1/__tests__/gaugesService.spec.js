/* eslint-disable no-undef */
const GaugesService = require('../src/services/gaugesService');

const gaugesService = new GaugesService();

const testReading = {
  id: 19,
  siteCode: '03446000',
  gaugeReading: '218',
  timeStamp: '2019-12-02T12:00:00.000-05:00',
  variableName: 'Streamflow, ft&#179;/s',
  units: 'ft3/s',
  name: 'MILLS RIVER NEAR MILLS RIVER, NC',
  latitude: 35.39805556,
  longitude: -82.595,
  description: null,
  hasReading: null,
  locationId: null,
};
const testSite = {
  id: 19,
  name: 'MILLS RIVER NEAR MILLS RIVER, NC',
  siteCode: '03446000',
  latitude: 35.39805556,
  longitude: -82.595,
  description: null,
  hasReading: null,
  locationId: null,
};


const keys = Object.keys(testSite).sort();

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
      const data = await gaugesService.findBySiteCode('03446000');
      expect(data).toBeTruthy();
    });
    it('should return an object that with the proper keys', async () => {
      const data = await gaugesService.findBySiteCode('03446000');
      expect(Object.keys(data[0]).sort()).toMatchObject(keys);
    });
    it('should return defined values for a site', async () => {
      const data = await gaugesService.findBySiteCode('03446000');
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
      const data = await gaugesService.findReadingsBySiteCode('03446000');
      expect(data).toBeTruthy();
      expect(data.length).toBeGreaterThan(1);
    });
  });
});
