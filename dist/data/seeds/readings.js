"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex("readings").del();
};
