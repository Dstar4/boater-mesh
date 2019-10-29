const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./data/graphql/schema/schema');

const serverMiddleware = require('./middleware/serverMiddleware');
const router = require('./routes/index');

const server = express();

serverMiddleware(server);

server.use('/api', router);
server.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);
module.exports = server;
