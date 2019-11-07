const router = require("express").Router();
const swaggerUi = require("swagger-ui-express");
const weatherDataRouter = require("../controllers/weather/weatherDataController");
const gaugesDataController = require("../controllers/rivers/gaugesData/gaugesDataController");
const gaugesController = require("../controllers/rivers/gauges/gaugesController");
const swaggerDocument = require("../../swagger.json");

router.use("/api-docs", swaggerUi.serve);
router.get("/api-docs", swaggerUi.setup(swaggerDocument));

// Routes for weather
router.use("/weatherData", weatherDataRouter);

// Routes to populate db with gauge data
router.use("/gaugesData", gaugesDataController);

// Routes to get gauge data from db
router.use("/gauges", gaugesController);

module.exports = router;

export {};
