const express = require('express');
const serverMiddleware = require('./middleware/serverMiddleware');
const router = require('./routes/index');

const server = express();

serverMiddleware(server);

server.use('/api', router);

module.exports = server;
