const express = require("express");
const serverMiddleware = require("./middleware/serverMiddleware");
const router = require("./routes/index");
const server = express();
require("dotenv").config();

serverMiddleware(server);

server.use("/api", router);

const PORT = process.env.PORT || 5500;
server.listen(PORT, () => console.log(`\n** Running on port ${PORT} ** \n`));
export {};
