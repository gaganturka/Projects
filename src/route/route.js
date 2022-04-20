const express = require('express')
const router = express.Router()
const removeUploadedFiles=require('multer/lib/remove-uploaded-files');
// const s3 = require('../s3')
const user = require('../controller/userController')
const mid = require('../midellware/auth')
const product = require('../controller/productController')
const cart = require('../controller/cartController')
const order = require('../controller/orderController')



router.get("/test-me", function (re, res) {
    console.log('i am fine')
    res.send('all is well')
})

router.post("/createUser", user.createUser)
router.get("/loginUser", user.loginUser)
router.get("/user/:userId/profile",mid.mid, user.userProfile)
router.put("/user/:userId/profile", mid.mid, user.updateUser)

router.post("/createProduct", product.createProduct)
router.get("/product", product.fetchProductdata)
router.get("/products/:productId", product.getProduct)
router.put("/products/:productId", product.updateProduct)
router.delete("/products/:productId", product.deleteProduct)

router.post("/users/:userId/cart", cart.createCart)
router.put("/users/:userId/cart", cart.updateCart)
router.delete("/delete", cart.deleteCart)

router.post("/users/:userId/orders", order.createOrder)
router.put("/users/:userId/orders", order.updateOrder)

module.exports = router;