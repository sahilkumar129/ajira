"use strict";

const PORT = process.env.PORT || 3000;
const http = require("http");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// parse application/json
app.use(bodyParser.json())

// Set global configuration for environment and rover
global.__envConfig={};
global.__roverConfig={};

// Routes handler
app.use("/api/rover/", require("./api/rover"));
app.use("/api/environment/", require("./api/environment"));

// Server start
const server = http.createServer(app);
server.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`);
});

// Global error handler
app.use((err, req, res, next) => {
    if(err) {
        res.status(err.status || 500);
        res.set("Content-Type", "application/json");
        res.send(err.message || "Unexpected error occured");
    }
    next();
});
