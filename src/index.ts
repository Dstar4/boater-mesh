require("dotenv").config();
import { Application } from "express";
const server: Application = require("./server");

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`\n** Running on port ${PORT} ** \n`));
export {};
