
const express = require("express");
const app = express();

app.use(express.json());

const tripRoutes = require("./routes/triproutes");

app.use("/api/v1/trips", tripRoutes);

module.exports = app;
