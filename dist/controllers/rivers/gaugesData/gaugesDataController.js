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
var asyncWrapper = require("../../../util/asyncWrapper").AsyncWrapper;
var Gauge = require("../../../data/helpers/gaugesModel");
var GaugeReading = require("../../../data/helpers/readingsModel");
var router = require("express").Router();
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
router.get("/sites", asyncWrapper(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var siteURL;
    return __generator(this, function (_a) {
        siteURL = "http://waterservices.usgs.gov/nwis/iv/?format=json&stateCd=NC&siteStatus=active";
        getGaugeData(siteURL).then(function (response) {
            var allSitesData = [];
            var geoData = response.data.value.timeSeries;
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
            res.status(201).json(allSitesData);
        });
        return [2 /*return*/];
    });
}); }));
// ****************************** Reading Data ******************************+
router.get("/readings", asyncWrapper(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var populateURL;
    return __generator(this, function (_a) {
        populateURL = "http://waterservices.usgs.gov/nwis/iv/?format=json&stateCd=NC&period=PT12H&siteType=ST";
        getGaugeData(populateURL).then(function (response) {
            var responseData = response.data.value.timeSeries;
            var allSitesData = [];
            responseData.map(function (item) { return __awaiter(void 0, void 0, void 0, function () {
                var i, siteData, compare;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!item.values[0].value) return [3 /*break*/, 5];
                            i = 0;
                            _a.label = 1;
                        case 1:
                            if (!(i < item.values.length)) return [3 /*break*/, 4];
                            siteData = {
                                siteCode: item.sourceInfo.siteCode[0].value,
                                gaugeReading: item.values[0].value[i].value,
                                timeStamp: item.values[0].value[i].dateTime,
                                variableName: item.variable.variableName,
                                units: item.variable.unit.unitCode,
                            };
                            allSitesData.push(siteData);
                            return [4 /*yield*/, GaugeReading.findBySiteCodeTimestamp(siteData.siteCode, siteData.timeStamp, siteData.units)];
                        case 2:
                            compare = _a.sent();
                            if (compare.length < 1) {
                                GaugeReading.add(siteData);
                            }
                            _a.label = 3;
                        case 3:
                            i += 1;
                            return [3 /*break*/, 1];
                        case 4:
                            res.status(201).json(allSitesData);
                            _a.label = 5;
                        case 5: return [2 /*return*/];
                    }
                });
            }); });
        });
        return [2 /*return*/];
    });
}); }));
router.post("/sites", asyncWrapper(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var url, _a, _b, period, siteCodes, _c, variable, _d, siteType, request, data;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                url = "http://waterservices.usgs.gov/nwis/iv/?format=json";
                _a = req.body, _b = _a.period, period = _b === void 0 ? "PT6H" : _b, siteCodes = _a.siteCodes, _c = _a.variable, variable = _c === void 0 ? ["00060", "00065"] : _c, _d = _a.siteType, siteType = _d === void 0 ? "ST" : _d;
                request = url + "&period=P" + period + "&site=" + siteCodes + "&variable=" + variable + "&siteType=" + siteType;
                return [4 /*yield*/, axios.get(request)];
            case 1:
                data = (_e.sent()).data;
                res.status(200).json(data);
                return [2 /*return*/];
        }
    });
}); }));
module.exports = router;
