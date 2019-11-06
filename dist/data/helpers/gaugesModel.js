"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db = require("../db-config");
function find() {
    return db("gauges");
}
function findById(id) {
    return db("gauges").where("id", id);
}
function findBySiteCode(siteCode) {
    return db("gauges").where("siteCode", siteCode);
}
function add(gauge) {
    return db("gauges")
        .insert(gauge)
        .then(function (id) { return id; })
        .catch(function (err) { return err; });
}
module.exports = {
    find: find,
    findById: findById,
    add: add,
    findBySiteCode: findBySiteCode,
};
