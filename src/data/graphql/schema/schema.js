const graphql = require('graphql');
const Gauges = require('../../helpers/gaugesModel');
const Readings = require('../../helpers/readingsModel');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLFloat,
} = graphql;

const GaugeType = new GraphQLObjectType({
  name: 'Gauge',
  description: 'Gauges site information.',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    siteCode: { type: GraphQLString },
    latitude: { type: GraphQLFloat },
    longitude: { type: GraphQLFloat },
    runName: { type: GraphQLString },
    description: { type: GraphQLString },
  }),
});

const ReadingType = new GraphQLObjectType({
  name: 'Reading',
  description: 'Gauges Readings.',
  fields: () => ({
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
  }),
});
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    gauge: {
      type: GaugeType,
      args: { siteCode: { type: GraphQLString } },
      async resolve(parent, args) {
        const data = await Gauges.findBySiteCode(args.siteCode);
        return data[0];
      },
    },
    reading: {
      type: new GraphQLList(ReadingType),
      args: {
        siteCode: { type: GraphQLString },
        units: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const data = await Readings.findBySiteCode(args.siteCode, args.units);
        return data;
      },
    },
  },
});
module.exports = new GraphQLSchema({
  query: RootQuery,
});
