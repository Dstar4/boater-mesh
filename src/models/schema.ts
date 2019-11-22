import {
  GaugesServiceType,
  GaugeType,
  ReadingGaugeType,
  fieldsType,
  readingFieldsType,
} from "../Types";

const graphql = require("graphql");
const GaugesService = require("../services/gaugesService");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLInt,
  GraphQLFloat,
  GraphQLBoolean,
} = graphql;

const gaugesService: GaugesServiceType = new GaugesService();

const GaugeType: GaugeType = new GraphQLObjectType({
  name: "Gauge",
  description: "Gauges site information.",
  fields: (): fieldsType => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    siteCode: { type: GraphQLString },
    latitude: { type: GraphQLFloat },
    longitude: { type: GraphQLFloat },
    description: { type: GraphQLString },
    hasReading: { type: GraphQLBoolean },
    locationId: { type: GraphQLInt },
  }),
});
const ReadingType = new GraphQLObjectType({
  name: "Reading",
  description: "Gauges Readings.",
  fields: (): readingFieldsType => ({
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
    hasReading: { type: GraphQLBoolean },
    locationId: { type: GraphQLInt },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    gauge: {
      type: GaugeType,
      args: { siteCode: { type: GraphQLString } },
      async resolve(parent, args: { siteCode: string }) {
        const data = await gaugesService.findBySiteCode(args.siteCode);
        return data[0];
      },
    },
    allGauges: {
      type: new GraphQLList(GaugeType),
      async resolve(parent, args) {
        const data = await gaugesService.findAllSites();
        return data;
      },
    },
    allReadings: {
      type: new GraphQLList(ReadingType),
      async resolve(parent, args) {
        const data = await gaugesService.findAllReadings();
        return data;
      },
    },
    reading: {
      type: new GraphQLList(ReadingType),
      args: {
        siteCode: { type: GraphQLString },
      },
      async resolve(parent, args: { siteCode: string }) {
        const data = await gaugesService.findReadingsBySiteCode(args.siteCode);
        return data[0];
      },
    },
  },
});
module.exports = new GraphQLSchema({
  query: RootQuery,
});
export {};
