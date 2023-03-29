const express = require('express')
const userController = require("../controller/userController")
const productController = require("../controller/productController")
const cartController = require("../controller/cartController")
const orderController = require("../controller/orderController")
const mw = require("../middleware/auth")
const {upload} = require("../helper/multer")
const multer = require('multer');
const payment = require('../helper/paymentGateway')
const router = express.Router()

router.get("/test", (req, res) => {
    let data = req.body
    res.status(200).send({ status: true, message: "it's working", data: data })
})
    router.post("/create-checkout-session", payment.payment)


// user
router.post("/register", userController.register)
router.post("/login", userController.userlogin)
router.get("/user/:userId/profile",  mw.authentication, userController.getUserProfile)
router.put("/update/user", mw.authentication,  userController.updateUser)

//products
router.post("/products", upload.fields([
    {name : 'featherImages', maxCount : 2},
    {name : 'productImage', maxCount : 1}
]), productController.createProduct)
router.get("/products", productController.getSpecificProduct)
router.get("/products/:productId", productController.getProductByProductId)
router.put("/products/:productId", productController.updatedProduct)
router.delete("/products/:productId", productController.deleteProduct)
router.post("/products/cart", productController.ProductForCart)


// Cart // mw.authentication, mw.userAuthorization,
router.post("/users/:userId/cart", cartController.createCart)
router.get("/users/:userId/cart", cartController.getCartByUserId)
router.delete("/users/:userId/cart", cartController.deleteCartItems)
router.put("/users/:userId/cart", cartController.updateCart)

// order
router.post("/users/:userId/orders", orderController.postOrder)
router.put("/users/:userId/orders", orderController.upadateOrder)
//  upload.fields([{name : 'productImage', maxCount : 2}])
// router.post('/image', upload.fields([
//     {name : 'featherImages', maxCount : 2},
//     {name : 'productImage', maxCount : 1}
// ]), (req, res) => {
//     console.log("files", req.files)
//     console.log("file", req.file)
// })
   

module.exports = router