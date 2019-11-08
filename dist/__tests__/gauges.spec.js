var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var request = require("supertest");
var api = require("../src/index");
describe("GAUGE CONTROLLER", function () {
    describe("GET GAUGE INFORMATION", function () {
        it("returns a 200 on success", function () { return __awaiter(_this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request(api).get("/api/gauges/all")];
                    case 1:
                        data = _a.sent();
                        expect(data.status).toBe(200);
                        return [2 /*return*/];
                }
            });
        }); });
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
