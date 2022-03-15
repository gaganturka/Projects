const express = require("express");
const router = express.Router();

const authorController = require("../controllers/authorController");
const blogController = require("../controllers/blogController");


router.post("/createAuthor", authorController.createAuthor);
router.post("/createblog", blogController.createblog);

router.get("/getblog", blogController.getblog)
router.put("/blog/:blogId", blogController.updateblog)
router.delete("/blogs/:blogId", blogController.deletebloog)

router.delete("/dllt", blogController.dllt)

module.exports = router;
