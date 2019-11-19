const router = require("express").Router();
const swaggerUi = require("swagger-ui-express");
const graphqlHTTP = require("express-graphql");
const weatherDataRouter = require("../controllers/weather/weatherDataController");
const gaugesDataController = require("../controllers/gauges/gaugesDataController");
const locationsController = require("../controllers/gauges/locationsController");
const gaugesController = require("../controllers/gauges/gaugesController");
const readingsController = require("../controllers/gauges/readingsController");
const swaggerDocument = require("../../swagger.json");
const schema = require("../models/schema");

router.use("/api-docs", swaggerUi.serve);
router.get("/api-docs", swaggerUi.setup(swaggerDocument));

// Routes for weather
router.use("/weatherData", weatherDataRouter);

// Routes to populate db with gauge data
router.use("/gaugesData", gaugesDataController);

// Routes to get gauge data from db
router.use("/gauges", gaugesController);
router.use("/readings", readingsController);
router.use("/locations", locationsController);

router.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);
module.exports = router;
export {};
