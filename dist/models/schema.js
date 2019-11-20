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
var graphql = require("graphql");
var GaugesService = require("../services/gaugesService");
var GraphQLObjectType = graphql.GraphQLObjectType, GraphQLString = graphql.GraphQLString, GraphQLSchema = graphql.GraphQLSchema, GraphQLID = graphql.GraphQLID, GraphQLList = graphql.GraphQLList, GraphQLNonNull = graphql.GraphQLNonNull, GraphQLInt = graphql.GraphQLInt, GraphQLFloat = graphql.GraphQLFloat, GraphQLBoolean = graphql.GraphQLBoolean;
var gaugesService = new GaugesService();
var GaugeType = new GraphQLObjectType({
    name: "Gauge",
    description: "Gauges site information.",
    fields: function () { return ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        siteCode: { type: GraphQLString },
        latitude: { type: GraphQLFloat },
        longitude: { type: GraphQLFloat },
        description: { type: GraphQLString },
        hasReading: { type: GraphQLBoolean },
        locationId: { type: GraphQLInt },
    }); },
});
var ReadingType = new GraphQLObjectType({
    name: "Reading",
    description: "Gauges Readings.",
    fields: function () { return ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        siteCode: { type: GraphQLString },
        gaugeReading: { type: GraphQLString },
        timeStamp: { type: GraphQLString },
        variableName: { type: GraphQLString },
        units: { type: GraphQLString },
        latitude: { type: GraphQLFloat },
        longitude: { type: GraphQLFloat },
        runName: { type: GraphQLString },
        description: { type: GraphQLString },
    }); },
});
var RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        gauge: {
            type: GaugeType,
            args: { siteCode: { type: GraphQLString } },
            resolve: function (parent, args) {
                return __awaiter(this, void 0, void 0, function () {
                    var data;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, gaugesService.findBySiteCode(args.siteCode)];
                            case 1:
                                data = _a.sent();
                                return [2 /*return*/, data[0]];
                        }
                    });
                });
            },
        },
        allGauges: {
            type: new GraphQLList(GaugeType),
            resolve: function (parent, args) {
                return __awaiter(this, void 0, void 0, function () {
                    var data;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, gaugesService.findAllSites()];
                            case 1:
                                data = _a.sent();
                                return [2 /*return*/, data];
                        }
                    });
                });
            },
        },
        allReadings: {
            type: new GraphQLList(ReadingType),
            resolve: function (parent, args) {
                return __awaiter(this, void 0, void 0, function () {
                    var data;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, gaugesService.findAllReadings()];
                            case 1:
                                data = _a.sent();
                                return [2 /*return*/, data];
                        }
                    });
                });
            },
        },
        reading: {
            type: new GraphQLList(ReadingType),
            args: {
                siteCode: { type: GraphQLString },
            },
            resolve: function (parent, args) {
                return __awaiter(this, void 0, void 0, function () {
                    var data;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, gaugesService.findReadingsBySiteCode(args.siteCode)];
                            case 1:
                                data = _a.sent();
                                return [2 /*return*/, data];
                        }
                    });
                });
            },
        },
    },
});
module.exports = new GraphQLSchema({
    query: RootQuery,
});
