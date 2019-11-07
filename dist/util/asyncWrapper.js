"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports.AsyncWrapper = function AsyncWrapper(fn) {
    return function (req, res, next) {
        return fn(req, res).catch(next);
    };
};
