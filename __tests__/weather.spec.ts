const request = require("supertest");
const api = require("../../server");

const zipURL = "/api/weatherData/now?";
const cityURL = "/api/weatherData/city?";

describe("Weather Router", () => {
  describe("Get By Zip", () => {
    it("should return 200 on success", async () => {
      const zipQuery = "zip=85741";
      const res = await request(api).get(zipURL + zipQuery);
      expect(res.status).toEqual(200);
    });
    it("should return 400 on failure", async () => {
      const zipQuery = "zip=85123123117";
      const res = await request(api).get(zipURL + zipQuery);
      expect(res.status).toEqual(400);
    });
    it("should fail on a character input with a 400", async () => {
      const zipQuery = "zip=ansad";
      const res = await request(api).get(zipURL + zipQuery);
      expect(res.status).toEqual(400);
    });
  });

  describe("Get by City", () => {
    it("should return 200 on success", async () => {
      const cityQuery = "city=Tucson";
      const res = await request(api).get(cityURL + cityQuery);
      expect(res.status).toEqual(200);
    });
    it("should return 400 on failure", async () => {
      const cityQuery = "city=";
      const res = await request(api).get(cityURL + cityQuery);
      expect(res.status).toEqual(400);
    });
  });
});
