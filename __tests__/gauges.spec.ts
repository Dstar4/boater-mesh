const request = require("supertest");
const api = require("../src/index");

describe("GAUGE CONTROLLER", () => {
  describe("GET GAUGE INFORMATION", () => {
    it("returns a 200 on success", async () => {
      const data = await request(api).get("/api/gauges/all");
      expect(data.status).toBe(200);
    });
    //     it("returns defined data", async () => {
    //       const response = await request(api).get("/api/gauges/all");
    //       const data = response.req.res.text;
    //       // console.log('HERELOG', data, 'RESPONSEST', response);
    //       // expect(data.text).toBeTruthy();
    //       const parsedText = JSON.parse(data)[0].id;
    //       // console.log('parsedText', parsedText);
    //       expect(parsedText).toBe(1);
    //     });
    //     it("returns an array with a length", async () => {
    //       const response = await request(api).get("/api/gauges/all");
    //       const data = response.req.res;
    //       const parsedText = JSON.parse(data.text);
    //       expect(parsedText.length).toBeGreaterThan(1);
    //     });
  });

  //   describe("GET SITE BY ID", () => {
  //     it("should fail with a 404 is no id is provided", async () => {
  //       const response = await request(api).get("/api/gauges/sites/");
  //       expect(response.status).toBe(404);
  //     });
  //     it("Should fail with an invalid id", async () => {
  //       const response = await request(api).get("/api/gauges/sites/02062331500");
  //       expect(response.status).toBe(500);
  //     });
  //     it("should return a 200 on success", async () => {
  //       const response = await request(api).get("/api/gauges/sites/0204382800");
  //       expect(response.status).toBe(200);
  //     });
  //     it("should return an object with 2 arrays inside", async () => {
  //       const response = await request(api).get("/api/gauges/sites/0204382800");
  //       const data = response.req.res;
  //       const parsedText = JSON.parse(data.text);
  //       expect(parsedText.gaugeData[0].siteCode).toBe("0204382800");
  //       // expect(parsedText.gaugeReading[0].siteCode).toBe('0204382800');
  //     });
  //   });

  //   describe("GET GAUGE HISTORY", () => {
  //     it("returns a 200 on success", async () => {
  //       const data = await request(api).get("/api/gauges/info");
  //       expect(data.status).toBe(200);
  //     });
  //     // it('returns defined data', async () => {
  //     //   const response = await request(api).get('/api/gauges/info');
  //     //   const data = response.req.res;
  //     //   // console.log('response', data);
  //     //   const parsedText = await JSON.parse(response);
  //     //   // console.log('parsed text', parsedText);
  //     //   // expect(data.text).toBeTruthy();
  //     //   await expect(parsedText).toBe([{}]);
  //     // });
  //     // it('returns an array with a length', async () => {
  //     //   const response = await request(api).get('/api/gauges/info');
  //     //   const data = response.req.res;
  //     //   const parsedText = JSON.parse(data.text);
  //     //   console.log(parsedText);
  //     //   expect(parsedText.length).toBeGreaterThan(1);
  //     // });
  //   });

  //   describe("GET READINGS BY ID", () => {
  //     it("should fail with a 404 is no id is provided", async () => {
  //       const response = await request(api).get("/api/gauges/readings/");
  //       expect(response.status).toBe(404);
  //     });
  //     // it('Should fail with an invalid id', async () => {
  //     //   const response = await request(api).get(
  //     //     '/api/gauges/readings/0204382800'
  //     //   );
  //     //   const data = response.req.res;
  //     //   const parsedText = JSON.parse(data.text);
  //     //   expect(parsedText).toBe(500);
  //     // });
  //     it("should return a 200 on success", async () => {
  //       const response = await request(api).get(
  //         "/api/gauges/readings/0208458892"
  //       );
  //       expect(response.status).toBe(200);
  //     });
  //   });
});
