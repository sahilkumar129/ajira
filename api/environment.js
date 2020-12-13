const router = require("express").Router();
const updateEnv = require("../lib/updateEnv");

router.post("/configure", (req, res) => {
    __envConfig=req.body;
    res.sendStatus(200);
});

router.patch("/", updateEnv);

router.get("/status", (req, res) => {
    res.json(__envConfig);
});

module.exports = router;