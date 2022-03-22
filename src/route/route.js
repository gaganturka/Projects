const express = require("express");
const router = express.Router();

const controler = require("../controller/controler");

router.post("/createCollege", controler.createCollege);
router.post("/createIntern", controler.createIntern)
router.get("/details", controler.detail)


module.exports = router;