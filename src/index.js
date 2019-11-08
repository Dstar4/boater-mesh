const express = require('express');
require('dotenv').config();
const Middleware = require('./middleware/middleware');
const ErrorHandlingMiddleware = require('./middleware/error-handling');

const PORT = process.env.PORT || 5000;

const app = express();

const router = require('./routes/index');

Middleware(app);

app.use('/api', router);

ErrorHandlingMiddleware(app);

app.listen(PORT, () => console.log(`\n** Running on port ${PORT} ** \n`));
