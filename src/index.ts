require("dotenv").config();
import { Application } from "express";
const server: Application = require("./server");
const pgInfo = [
  process.env.POSTGRES_HOST,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  process.env.POSTGRES_NAME,
];

const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log(`\n** PG INFO ${pgInfo} \nRunning on port ${PORT} \n  ** \n`)
);
export {};
