"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Joi = require("joi");
"use strict";
module.exports.GaugeValidationSchema = Joi.object().keys({
    period: Joi.string().required(),
    siteCodes: Joi.array().required(),
    variable: Joi.array().required(),
    siteType: Joi.string().required(),
});
