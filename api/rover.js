const router = require("express").Router();
const move = require("../lib/move");

router.post("/configure", (req, res) => {
    __roverConfig=req.body;
    res.sendStatus(200);
});

router.post("/move", move);

router.get("/status", (req, res) => {
    res.json(__roverConfig);
});

module.exports = router;