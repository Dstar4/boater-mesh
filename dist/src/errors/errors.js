var ValidationError = require("./validation-error");
var AuthenticationError = require("./authentication-error");
var AccessDeniedError = require("./access-denied-error");
var CommonError = require("./common-error");
module.exports = {
    AccessDeniedError: AccessDeniedError,
    AuthenticationError: AuthenticationError,
    ValidationError: ValidationError,
    CommonError: CommonError,
};
