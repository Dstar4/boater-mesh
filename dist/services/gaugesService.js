"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable class-methods-use-this */
var axios = require("axios");
var db = require("../data/db-config");
var CommonError = require("../errors/common-error");
module.exports = /** @class */ (function () {
    function GaugesService() {
    }
    // Sites
    GaugesService.prototype.findAllSites = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, db("gauges").where({ hasReading: true })];
            });
        });
    };
    GaugesService.prototype.findSiteById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, db("gauges").where("id", id)];
            });
        });
    };
    GaugesService.prototype.findBySiteCode = function (siteCode) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, db("gauges").where("siteCode", siteCode)];
            });
        });
    };
    GaugesService.prototype.addSite = function (gauge) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, db("gauges")
                        .insert(gauge)
                        .catch(function (err) { return err; })];
            });
        });
    };
    GaugesService.prototype.updateGauge = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, db("gauges")
                        .where({ siteCode: id })
                        .update({ hasReading: true })];
            });
        });
    };
    // Readings
    GaugesService.prototype.findAllReadings = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, db("readings").join("gauges", {
                        "readings.siteCode": "gauges.siteCode",
                    })];
            });
        });
    };
    GaugesService.prototype.addHasReading = function (siteCode) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, db("gauges")
                        .where({ siteCode: siteCode })
                        .insert({ hasReading: true })];
            });
        });
    };
    GaugesService.prototype.addReading = function (reading) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, db("gauges")
                        .where({ siteCode: reading.siteCode })
                        .insert({ hasReading: true })
                        .then(db("readings")
                        .where({
                        "readings.siteCode": reading.siteCode,
                    })
                        .andWhere({ "readings.timeStamp": reading.timeStamp })
                        .then(function (readingList) {
                        if (readingList.length === 0) {
                            // console.log('inserting', reading.siteCode);
                            db("readings")
                                .insert(reading)
                                .then(function () { return reading; })
                                .catch(function (err) { return err; });
                        }
                    })
                        .then(this.updateGauge(reading.siteCode)))
                        .catch(function (err) { return err; })];
            });
        });
    };
    GaugesService.prototype.findReadingsBySiteCode = function (siteCodeId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, db("readings")
                        .join("gauges", {
                        "readings.siteCode": "gauges.siteCode",
                    })
                        .where({ "readings.siteCode": siteCodeId, "readings.units": "ft3/s" })
                        .then(function (id) { return id; })];
            });
        });
    };
    GaugesService.prototype.findReadingsBySiteCodeTimestamp = function (siteCodeId, timeStamp, units) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, db("readings").where({
                        "readings.siteCode": siteCodeId,
                        "readings.timeStamp": timeStamp,
                        "readings.units": units,
                    })];
            });
        });
    };
    // ***************************************** Populate Data *****************************************
    // GetData Sites
    GaugesService.prototype.populateSites = function () {
        return __awaiter(this, void 0, void 0, function () {
            var siteURL, response, allSitesData, geoData;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        siteURL = "http://waterservices.usgs.gov/nwis/iv/?format=json&stateCd=NC&siteStatus=active";
                        return [4 /*yield*/, axios.get(siteURL)];
                    case 1:
                        response = _a.sent();
                        if (!response) {
                            throw new CommonError("There was no data returned from that source. Check your URL and try again.");
                        }
                        allSitesData = [];
                        geoData = response.data.value.timeSeries;
                        geoData.map(function (item) {
                            var siteData = {
                                name: item.sourceInfo.siteName,
                                siteCode: item.sourceInfo.siteCode[0].value,
                                latitude: item.sourceInfo.geoLocation.geogLocation.latitude,
                                longitude: item.sourceInfo.geoLocation.geogLocation.longitude,
                            };
                            allSitesData.push(siteData);
                            _this.addSite(siteData);
                        });
                        return [2 /*return*/, allSitesData];
                }
            });
        });
    };
    // GetData Readings
    GaugesService.prototype.populateReadings = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, params, request, data, responseData, allSitesData, returnData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "http://waterservices.usgs.gov/nwis/iv/?format=json&stateCd=NC&siteStatus=active";
                        params = {
                            period: "P6D",
                            variable: ["00060", "00065"],
                            siteType: "ST",
                        };
                        request = url + "&period=" + params.period + "&variable=" + params.variable + "&siteType=" + params.siteType;
                        return [4 /*yield*/, axios.get(request)];
                    case 1:
                        data = (_a.sent()).data;
                        if (!data) {
                            throw new CommonError("Could not retrieve those readings.");
                        }
                        responseData = data.value.timeSeries;
                        allSitesData = [];
                        responseData.forEach(function (item) {
                            if (item.values[0].value && item.values[0].value.length > 0) {
                                allSitesData.push(item);
                            }
                        });
                        return [4 /*yield*/, this.buildArr(allSitesData)];
                    case 2:
                        returnData = _a.sent();
                        return [2 /*return*/, returnData];
                }
            });
        });
    };
    // Helper function to build an object to insert into readings db from an array
    GaugesService.prototype.buildArr = function (arr) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                arr.forEach(function (item) { return __awaiter(_this, void 0, void 0, function () {
                    var i, reading;
                    return __generator(this, function (_a) {
                        for (i = 0; i < item.values[0].value.length; i += 1) {
                            reading = {
                                siteCode: item.sourceInfo.siteCode[0].value,
                                gaugeReading: item.values[0].value[i].value,
                                timeStamp: item.values[0].value[i].dateTime,
                                variableName: item.variable.variableName,
                                units: item.variable.unit.unitCode,
                            };
                            this.addReading(reading);
                        }
                        return [2 /*return*/];
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    return GaugesService;
}());
