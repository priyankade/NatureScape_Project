const express = require("express");
const router = express.Router();


router.get("/profile", (req, res) => {
    res.render("display/profile", {});
});

router.post("/profile", (req, res) => {
    res.render("display/profile", {});
});

module.exports = router;