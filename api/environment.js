const router = require("express").Router();

router.post("/configure", (req, res) => {
    __envConfig=req.body;
    res.sendStatus(200);
});

router.patch("/", (req, res) => {
    Object.entries(req.body).forEach(obj => {
        __envConfig[obj[0]] = obj[1];
    });
    res.sendStatus(200);
});

router.get("/status", (req, res) => {
    res.json(__envConfig);
});

module.exports = router;