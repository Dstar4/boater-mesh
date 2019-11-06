const db = require("../db-config");
import {
  SiteDataType,
  ReadingDataType,
  SiteDataRequestType,
  ReadingType,
} from "../../controllers/rivers/riverTypes";
function find(): [] {
  return db("gauges");
}
function findById(id: number): SiteDataType {
  return db("gauges").where("id", id);
}
function findBySiteCode(siteCode: string): SiteDataType {
  return db("gauges").where("siteCode", siteCode);
}
function add(gauge: {
  id: number;
  name: string;
  siteCode: number;
  latitude: number;
  longitude: number;
  runName: null | string;
  description: null | string;
}): SiteDataType {
  return db("gauges")
    .insert(gauge)
    .then(id => id)
    .catch(err => err);
}

module.exports = {
  find,
  findById,
  add,
  findBySiteCode,
};
export {};
