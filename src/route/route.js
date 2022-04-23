const express = require("express");
const router = express.Router();

const interControler = require("../controller/internControler");
const collegeController = require("../controller/collegeControler")

router.post("/functionup/colleges", collegeController.createCollege);
router.post("/functionup/interns", interControler.createIntern)
router.get("/functionup/collegeDetails", interControler.fetchCollegeData)


module.exports = router;