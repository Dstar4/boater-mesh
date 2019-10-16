const express = require('express');
const serverMiddleware = require('./middleware/serverMiddleware');
const router = require('./routes/index');

const server = express();

serverMiddleware(server);

// router.use('/', (req, res) => {
//   res.status(200).json('API online');
// });
server.use('/api', router);

module.exports = server;
