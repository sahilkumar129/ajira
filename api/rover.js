const router = require("express").Router();

router.post("/configure", (req, res) => {
    __roverConfig=req.body;
    res.sendStatus(200);
});

router.post("/move", (req, res) => {
    const dir=req.body.direction; 
});

router.get("/status", (req, res) => {
    res.json(__roverConfig);
});

module.exports = router;