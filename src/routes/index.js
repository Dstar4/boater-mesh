const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const weatherDataRouter = require('./weatherData');
const gaugesDataRouter = require('./gaugesData');
const gaugesRouter = require('./gauges');
const swaggerDocument = require('../../swagger.json');
// Routes for weather
router.use('/weatherData', weatherDataRouter);
// Routes to populate db with gauge data
router.use('/gaugesData', gaugesDataRouter);
// Routes to get gauge data from db
router.use('/gauges', gaugesRouter);

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

module.exports = router;
