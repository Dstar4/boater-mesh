"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router = require("express").Router();
var swaggerUi = require("swagger-ui-express");
var weatherDataRouter = require("../controllers/weather/weatherDataController");
var gaugesDataController = require("../controllers/rivers/gaugesData/gaugesDataController");
var gaugesController = require("../controllers/rivers/gauges/gaugesController");
var swaggerDocument = require("../../swagger.json");
var graphqlHTTP = require("express-graphql");
var schema = require("../models/schema");
router.use("/api-docs", swaggerUi.serve);
router.get("/api-docs", swaggerUi.setup(swaggerDocument));
// Routes for weather
router.use("/weatherData", weatherDataRouter);
// Routes to populate db with gauge data
router.use("/gaugesData", gaugesDataController);
// Routes to get gauge data from db
router.use("/gauges", gaugesController);
router.use("/graphql", graphqlHTTP({
    schema: schema,
    graphiql: true,
}));
module.exports = router;
