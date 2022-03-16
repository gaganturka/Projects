const express = require("express");
const router = express.Router();
const must = require("../middelware/mideware");
const authorController = require("../controllers/authorController");
const blogController = require("../controllers/blogController");


router.post("/createAuthor", authorController.createAuthor);
router.post("/createblog",must.authenticate, blogController.createblog);

router.get("/getblog", must.authenticate,  blogController.getblog)
router.put("/blog/:blogId", must.authenticate,must.authorisation, blogController.updateblog)
router.delete("/blogs/:blogId", must.authenticate,must.authorisation,blogController.deletebloog)

router.delete("/dllt", must.authenticate,must.authorisation,blogController.dllt)


router.post("/logIn", authorController.login)


module.exports = router;
