const express = require("express");
const router = express.Router();

const userControler = require("../controllers/userController");
const bookControler = require("../controllers/bookController")
const reviweControler = require("../controllers/reviewController")
const midelware = require("../middlewares/auth")

router.post("/register", userControler.register)
router.post("/login", userControler.login)

router.post("/books", midelware.authenticate, bookControler.createBook)
router.get("/books", midelware.authenticate, bookControler.getBooks)
router.get("/books/:bookId", midelware.authenticate, bookControler.getBookByParams)
router.put("/books/:bookId", midelware.authenticate, bookControler.updateBookById)
router.delete("/books/:bookId", midelware.authenticate, bookControler.deleteBookByparams)

router.post("/books/:bookId", reviweControler.addreview)
router.put("/books/:bookId/review/:reviewId", reviweControler.updateReview)
router.delete("/books/:bookId/review/:reviewId", reviweControler.deleteReview)




module.exports = router;