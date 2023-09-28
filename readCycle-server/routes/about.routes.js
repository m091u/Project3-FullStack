const router = require("express").Router();

//render page
router.get("/about", (req, res) => {
    res.json("about");;
});

module.exports = router;
