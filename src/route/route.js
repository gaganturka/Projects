const express = require("express");
const router = express.Router();

const authorController = require("../controllers/authorController");
const blogController = require("../controllers/blogController");
const middleware = require("../middleware/auth.js")




router.post("/createAuthor",authorController.createAuthor);
router.post("/createblog",middleware.authenticate,blogController.createblog);

router.get("/getblog",middleware.authenticate,blogController.getblog)
router.put("/blog/:blogId",middleware.authenticate,middleware.authorisation, blogController.updateblog)
router.delete("/blogs/:blogId",middleware.authenticate,middleware.authorisation,blogController.deleteblog)

router.delete("/deleteblog",middleware.authenticate,blogController.deleteByElement)


router.post("/login",authorController.loginauthor)

module.exports = router;