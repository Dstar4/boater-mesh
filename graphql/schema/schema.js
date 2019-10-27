const graphql = require('graphql');
const Gauges = require('../../src/data/helpers/gaugesModel');

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

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    gauge: {
      type: new GraphQLList(GaugeType),
      resolve(parent, args) {
        return Gauges.find();
      },
    },
  },
});
module.exports = new GraphQLSchema({
  query: RootQuery,
});
