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
var axios_1 = require("axios");
var db = require("../data/db-config");
var CommonError = require("../errors/common-error");
module.exports = /** @class */ (function () {
    function GaugesService() {
    }
    // Locations
    GaugesService.prototype.findAllLocations = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db("locations")];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    GaugesService.prototype.addLocation = function (location) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db("locations")
                            .insert(location)
                            .catch(function (err) {
                            throw new CommonError(err);
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // Sites
    GaugesService.prototype.findAllSites = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db("gauges").where({ hasReading: true })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    GaugesService.prototype.findSiteById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db("gauges").where("id", id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    GaugesService.prototype.findBySiteCode = function (siteCode) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db("gauges").where("siteCode", siteCode)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    GaugesService.prototype.addSite = function (gauge) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db("gauges")
                            .insert(gauge)
                            .catch(function (err) {
                            // throw new CommonError(err);
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    GaugesService.prototype.updateGauge = function (siteCode) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db("gauges")
                            .where({ siteCode: siteCode })
                            .update({ hasReading: true })
                            .catch(function (err) {
                            throw new CommonError(err);
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    GaugesService.prototype.updateGaugeLocation = function (siteCode, locationId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db("gauges")
                            .where({ siteCode: siteCode })
                            .update({ locationId: locationId })
                            .catch(function (err) {
                            throw new CommonError(err);
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // Readings
    GaugesService.prototype.findAllReadings = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db("readings")
                            .join("gauges", {
                            "readings.siteCode": "gauges.siteCode",
                        })
                            .catch(function (err) {
                            throw new CommonError(err);
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    GaugesService.prototype.addHasReading = function (siteCode) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db("gauges")
                            .where({ siteCode: siteCode })
                            .insert({ hasReading: true })
                            .catch(function (err) {
                            throw new CommonError(err);
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    GaugesService.prototype.addReading = function (reading) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db("gauges")
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
                                    .catch(function (err) {
                                    // throw new CommonError(`err adding reading ${err}`);
                                });
                            }
                        })
                            .then(this.updateGauge(reading.siteCode))
                            .catch(function (err) {
                            // throw new CommonError(`err updating gauge ${err}`);
                        }))
                            .catch(function (err) {
                            throw new CommonError(err);
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    GaugesService.prototype.findReadingsBySiteCode = function (siteCode) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db("readings")
                            .join("gauges", {
                            "readings.siteCode": "gauges.siteCode",
                        })
                            .where({ "readings.siteCode": siteCode, "readings.units": "ft3/s" })
                            .then(function (id) { return id; })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    GaugesService.prototype.findReadingsBySiteCodeTimestamp = function (siteCode, timeStamp, units) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db("readings").where({
                            "readings.siteCode": siteCode,
                            "readings.timeStamp": timeStamp,
                            "readings.units": units,
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
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
                        return [4 /*yield*/, axios_1.default.get(siteURL)];
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
            var url, data, responseData, allSitesData, returnData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "http://waterservices.usgs.gov/nwis/iv/?format=json&sites=" + NC_SITES + "&period=P3D&siteType=ST&variable=00060,00065";
                        return [4 /*yield*/, axios_1.default.get(encodeURI(url))];
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
var NC_SITES = [
    "03524000",
    "03512000",
    "03512000",
    "03460000",
    "03410210",
    "03453000",
    "03460000",
    "02176930",
    "02176930",
    "02177000",
    "02177000",
    "02177000",
    "0351706800",
    "03518500",
    "03539778",
    "03539778",
    "03540500",
    "03540500",
    "03539600",
    "03539600",
    "03441000",
    "03451500",
    "03453500",
    "03451500",
    "03451500",
    "03451500",
    "03439000",
    "03443000",
    "03453500",
    "03439000",
    "03451500",
    "03189600",
    "03192000",
    "03540500",
    "03539778",
    "03453000",
    "02138500",
    "02399200",
    "02398950",
    "02399200",
    "02398950",
    "02399200",
    "02398950",
    "03539778",
    "03539778",
    "03503000",
    "03503000",
    "03446000",
    "03505550",
    "03505550",
    "03185400",
    "03465500",
    "03465500",
    "03465500",
    "03540500",
    "03540500",
    "03512000",
    "02176930",
    "02177000",
    "03460795",
    "03455500",
    "03531500",
    "03531500",
    "03512000",
    "03512000",
    "03208500",
    "03209000",
    "03208500",
    "03209000",
    "02169000",
    "02168504",
    "02162350",
    "03518500",
    "03451000",
    "02181580",
    "03473000",
    "03465500",
    "03463300",
    "03463300",
    "03510577",
    "03076500",
];
