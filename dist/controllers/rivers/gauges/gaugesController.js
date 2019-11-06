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
// const Sequelize = require('sequelize');
var Gauge = require("../../data/helpers/gaugesModel");
var GaugeReading = require("../../data/helpers/readingsModel");
/**
 * @swagger
 * /gauges/all:
 *   get:
 *     description: Gets Gauge Info on all Gauges from database.
 *     responses:
 *        '200':    # status code
 *          description: A JSON array of all available gauges
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                    type: object
 *                    properties:
 *                      id:
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
 *                      createdAt:
 *                        type: string
 *                      updatedAt:
 *                        type: string
 */
// interface SiteDataType {
//   id: Number;
//   name: String;
//   siteCode: String;
//   latitude: Number;
//   longitude: Number;
//   runName: string | null;
//   runDescription: string | null;
// }
// interface ReadingDataType {
//   id: Number;
//   gaugeReading: String;
//   timeStamp: String;
//   variableName: String;
//   units: String;
//   name: String;
//   siteCode: String;
//   latitude: Number;
//   longitude: Number;
//   runName: string | null;
//   runDescription: string | null;
// }
function gaugeInformation(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Gauge.find()];
                case 1:
                    data = _a.sent();
                    console.log(data);
                    if (data) {
                        res.status(200).json(data);
                    }
                    else {
                        res.status(500).json("error finding gauge information");
                    }
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * @swagger
 * /gauges/sites/:id:
 *   get:
 *     description: Gets Gauge Readings and Gauge info by siteCode
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           description: Numeric ID of the site, titled "siteCode"
 *     responses:
 *        '200':
 *          description: A JSON array of gauge readings and site data
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
function getSiteById(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var siteCodeId, data, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    siteCodeId = req.params.id;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, GaugeReading.findBySiteCode(siteCodeId)];
                case 2:
                    data = _a.sent();
                    // console.log(data);
                    if (data.length > 0) {
                        res.status(200).json(data);
                    }
                    else {
                        res.status(500).json({ error: "invalid siteCode" });
                    }
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    console.log(err_1);
                    res.status(500).json({
                        message: "There was an error retrieving that site.",
                        error: err_1,
                    });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// +++++++++++++++++++++++++++++++++++++++++ Reading Data +++++++++++++++++++++++++++++++++++++++++
/**
 * @swagger
 * /gauges/info:
 *   get:
 *     description: Gets all Gauge Readings from DB.
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
function getGaugeHistory(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var data, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, GaugeReading.find()];
                case 1:
                    data = _a.sent();
                    // console.log(data);
                    res.status(200).json(data);
                    return [3 /*break*/, 3];
                case 2:
                    err_2 = _a.sent();
                    console.log(err_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
/**
 * @swagger
 * /gauges/readings/:id:
 *   get:
 *     description: Gets Gauge Readings from DB by siteCode.
 *     summary: Gets Gauge Readings from DB by siteCode.
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
function getReadingsById(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var siteCodeId, gaugeData, returnObject, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    siteCodeId = req.params.id;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, GaugeReading.findBySiteCode(siteCodeId)];
                case 2:
                    gaugeData = _a.sent();
                    if (gaugeData) {
                        returnObject = {
                            message: "data here",
                            data: gaugeData,
                        };
                        res.status(200).json(returnObject);
                    }
                    else {
                        res.status(500).json({ error: "invalid siteCode" });
                    }
                    return [3 /*break*/, 4];
                case 3:
                    err_3 = _a.sent();
                    console.log(err_3);
                    res.status(500).json({
                        message: "There was an error retrieving that site.",
                        error: err_3,
                    });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// +++++++++++++++++++++++++++++++++++++++++ Site Data ++++++++++++++++++++++++++++++++++++++++++++
module.exports = {
    gaugeInformation: gaugeInformation,
    getGaugeHistory: getGaugeHistory,
    getSiteById: getSiteById,
    getReadingsById: getReadingsById,
};
