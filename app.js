const PORT = process.env.PORT || localPort;
const http = require("http");
const express = require("express");
const app = express();

app.use("/api/rover/", require("./api/rover"));
app.use("/api/environment/", require("./api/environment"));

const server = http.createServer(app);
server.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`);
});
