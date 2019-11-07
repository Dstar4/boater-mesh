const express = require("express");
const serverMiddleware = require("./middleware/serverMiddleware");
const router = require("./routes/index");
const app = express();
require("dotenv").config();

serverMiddleware(app);

app.use("/api", router);

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`\n** Running on port ${PORT} ** \n`));

export {};
