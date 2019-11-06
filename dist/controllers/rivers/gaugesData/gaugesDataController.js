"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
Object.defineProperty(exports, "__esModule", { value: true });
var axios = require("axios");
var Gauge = require("../../../data/helpers/gaugesModel");
var GaugeReading = require("../../../data/helpers/readingsModel");
// ****************************** Helpers ******************************++++
function getGaugeData(url) {
    return __awaiter(this, void 0, void 0, function () {
        var text, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios.get(url)];
                case 1:
                    text = _a.sent();
                    if (text) {
                        return [2 /*return*/, text];
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    return [2 /*return*/, error_1];
                case 3: return [2 /*return*/];
            }
        });
    });
}
// ****************************** Site Data *********************************
/**
 * @swagger
 * /gaugesData/sites:
 *   get:
 *     description: Gets Gauge Info from all Gauges.
 *     responses:
 *        '200':    # status code
 *          description: A JSON array of user names
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                    type: object
 *                    properties:
 *                      name:
 *                        type: string
 *                        example: NORTHWEST RIVER ABOVE MOUTH NEAR MOYOCK, NC
 *                      siteCode:
 *                        type: string
 *                        example: 02043410
 *                      latitude:
 *                        type: float
 *                        example: 36.5122222
 *                      longitude:
 *                         type: float
 *                         example: -76.0866667
 *                      units:
 *                         type: string
 *                         example: ft3/s
 *                      flowType:
 *                         type: string
 *                      example: Streamflow, ft&#179;/s
 */
function getAllSites(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var siteURL;
        return __generator(this, function (_a) {
            siteURL = "http://waterservices.usgs.gov/nwis/iv/?format=json&stateCd=NC&siteStatus=active";
            getGaugeData(siteURL).then(function (response) {
                var allSitesData = [];
                var geoData = response.data.value.timeSeries;
                try {
                    geoData.map(function (item) {
                        var siteData = {
                            name: item.sourceInfo.siteName,
                            siteCode: item.sourceInfo.siteCode[0].value,
                            latitude: item.sourceInfo.geoLocation.geogLocation.latitude,
                            longitude: item.sourceInfo.geoLocation.geogLocation.longitude,
                        };
                        Gauge.add(siteData).catch(console.log("Error inserting siteData into database\n" + JSON.stringify(siteData)));
                        allSitesData.push(siteData);
                    });
                }
                catch (err) {
                    res.status(500).json("error getting sites");
                    next(err);
                }
                res.status(201).json(allSitesData);
            });
            return [2 /*return*/];
        });
    });
}
// ****************************** Reading Data ******************************+
var populateURL = "http://waterservices.usgs.gov/nwis/iv/?format=json&stateCd=NC&period=PT12H&siteType=ST";
/**
 * @swagger
 * /gaugesData/readings:
 *   get:
 *     description: Gets Gauge Readings from all Gauges.
 *     responses:
 *        '200':
 *          description: A JSON array of gauge readings
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                    type: object
 *                    properties:
 *                      siteCode:
 *                        type: string
 *                        example: 02043410
 *                      gaugeReading:
 *                        type: float
 *                        example: 1.63
 *                      timestamp:
 *                         type: string
 *                         example: 2019-10-14T20:30:00.000-04:00
 *                      variableName:
 *                         type: string
 *                         example: Streamflow, ft&#179;/s"
 */
function populateGaugeData(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            getGaugeData(populateURL).then(function (response) {
                var responseData = response.data.value.timeSeries;
                var allSitesData = [];
                responseData.map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                    var i, siteData, compare, err_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!item.values[0].value) return [3 /*break*/, 7];
                                _a.label = 1;
                            case 1:
                                _a.trys.push([1, 6, , 7]);
                                i = 0;
                                _a.label = 2;
                            case 2:
                                if (!(i < item.values.length)) return [3 /*break*/, 5];
                                siteData = {
                                    siteCode: item.sourceInfo.siteCode[0].value,
                                    gaugeReading: item.values[0].value[i].value,
                                    timeStamp: item.values[0].value[i].dateTime,
                                    variableName: item.variable.variableName,
                                    units: item.variable.unit.unitCode,
                                };
                                allSitesData.push(siteData);
                                return [4 /*yield*/, GaugeReading.findBySiteCodeTimestamp(siteData.siteCode, siteData.timeStamp, siteData.units)];
                            case 3:
                                compare = _a.sent();
                                if (compare.length < 1) {
                                    GaugeReading.add(siteData);
                                }
                                _a.label = 4;
                            case 4:
                                i += 1;
                                return [3 /*break*/, 2];
                            case 5: return [3 /*break*/, 7];
                            case 6:
                                err_1 = _a.sent();
                                return [2 /*return*/, err_1];
                            case 7: return [2 /*return*/];
                        }
                    });
                }); });
                res.status(201).json(allSitesData);
            });
            return [2 /*return*/];
        });
    });
}
function getDataBySiteId(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var url, _a, _b, period, siteCodes, _c, variable, _d, siteType, request, data, err_2;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _e.trys.push([0, 2, , 3]);
                    url = "http://waterservices.usgs.gov/nwis/iv/?format=json";
                    _a = req.body, _b = _a.period, period = _b === void 0 ? "PT6H" : _b, siteCodes = _a.siteCodes, _c = _a.variable, variable = _c === void 0 ? ["00060", "00065"] : _c, _d = _a.siteType, siteType = _d === void 0 ? "ST" : _d;
                    request = url + "&period=P" + period + "&site=" + siteCodes + "&variable=" + variable + "&siteType=" + siteType;
                    return [4 /*yield*/, axios.get(request)];
                case 1:
                    data = (_e.sent()).data;
                    res.status(200).json(data);
                    return [3 /*break*/, 3];
                case 2:
                    err_2 = _e.sent();
                    console.log(err_2);
                    res.status(500).json(err_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
module.exports = {
    getGaugeData: getGaugeData,
    getAllSites: getAllSites,
    populateGaugeData: populateGaugeData,
    getDataBySiteId: getDataBySiteId,
};
