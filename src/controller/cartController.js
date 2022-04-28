const cartModel = require("../model/cartModel")
const userModel = require("../model/userModel")
const validator = require("../validator/validator")
const productModel = require("../model/productModel");



const createCart = async function (req, res) {
    try {
        const requestBody = req.body;
        const queryParams = req.query;
        const userId = req.params.userId;

        // query params must be empty
        if (!validator.queryParam(queryParams)) {
            return res
                .status(404)
                .send({ status: false, message: " page not found" });
        }

        // using destructuring
        const { productId, cartId } = requestBody;

        // product id is required
        if (!validator.isValid(productId)) {
            return res.status(400).send({
                status: false,
                message: "Product ID is required ",
            });
        }
        // product id should be a valid mongoose ObjectId 
        if (!validator.isValidObjectId(productId)) {
            return res
                .status(400)
                .send({ status: false, message: "Product ID is not valid" });
        }

        const productByProductId = await productModel.findOne({
            _id: productId,
            isDeleted: false,
        });

        if (!productByProductId) {
            return res
                .status(404)
                .send({ status: false, message: `No product found by ${productId}` });
        }

        let productPriceInRupees = productByProductId.price

        const cartByUserId = await cartModel.findOne({ userId: userId });

        if (requestBody.hasOwnProperty("cartId")) {
            // if cart Id is coming from requestBody so first validating cart id then updating cart data

            // cart Id must not be an empty string
            if (!validator.isValid(cartId)) {
                return res
                    .status(400)
                    .send({ status: false, message: "cartId could not be blank" });
            }

            // cart Id must be a valid mongoose Object Id
            if (!validator.isValidObjectId(cartId)) {
                return res
                    .status(400)
                    .send({ status: false, message: "cartId  is not valid" });
            }

            const cartByCartId = await cartModel.findById(cartId);

            if (!cartByCartId) {
                return res
                    .status(404)
                    .send({ status: false, message: `No cart found by ${cartId}` });
            }

            // if user is not matching in cart found by userId and cart found by cart id that mean some other user's cart id is coming from request body
            if (cartId !== cartByUserId._id.toString()) {
                return res.status(403).send({
                    status: false,
                    message: `User is not allowed to update this cart`,
                });
            }
        }

        //  if cart is not found by userId that mean some other user's cart Id is coming from request body
        if (cartByUserId) {
            // applying higher order function "map" on items array of cart to get an array of product id in string
            const isProductExistsInCart = cartByUserId.items.map(
                (product) => (product["productId"] = product["productId"].toString())
            );

            // if product id coming from request body is present in cart then updating its quantity
            if (isProductExistsInCart.includes(productId)) {
                /* condition :  cartId and items array element which has product id coming from request body
                    update :     totalItems will increase by 1, totalPrice will increase by price of that product 
                    and items array element(product) quantity will increase by one*/

                const updateExistingProductQuantity = await cartModel.findOneAndUpdate({ userId: userId, "items.productId": productId }, {
                    $inc: {
                        totalPrice: +productPriceInRupees,
                        "items.$.quantity": +1,
                    },
                }, { new: true });
                return res.status(200).send({
                    status: true,
                    message: "Product quantity updated to cart",
                    data: updateExistingProductQuantity,
                });
            }

            // if product id coming from request body is not present in cart then we have to add that product in items array of cart
            const aAddNewProductInItems = await cartModel.findOneAndUpdate({ userId: userId }, {
                $addToSet: { items: { productId: productId, quantity: 1 } },
                $inc: { totalItems: +1, totalPrice: +productPriceInRupees },
            }, { new: true });

            return res.status(200).send({
                status: true,
                message: "Item updated to cart",
                data: aAddNewProductInItems,
            });
        } else {
            // if no cart found by userID then creating a new cart the product coming from request body
            const productData = {
                productId: productId,
                quantity: 1,
            };

            const cartData = {
                userId: userId,
                items: [productData],
                totalPrice: productPriceInRupees,
                totalItems: 1,
            };

            const newCart = await cartModel.create(cartData);

            return res
                .status(200)
                .send({
                    status: true,
                    message: "New cart created and product added to cart",
                    data: newCart,
                });
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({ error: error.message });
    }
};


const getCartByUserId = async function (req, res) {
    try {
        const userId = req.params.userId

        const queryParam = req.query
        if (!validator.queryParam(queryParam)) {
            return res
                .status(400)
                .send({
                    status: false,
                    message: 'page not found'
                })
        }

        if (!validator.isValidObjectId(userId)) {
            return res
                .status(400)
                .send({
                    status: false,
                    message: "Invalid User Id"
                })
        }
        const getProduct = await cartModel.findOne({ userId: userId })
        if (!getProduct) {
            return res
                .status(404)
                .send({
                    status: false,
                    message: "cart not found"
                })
        }
        return res
            .status(200)
            .send({
                status: true,
                message: "cart data",
                data: getProduct
            })
    }
    catch (error) {
        return res.status(500).send({ status: false, ERROR: error.message })
    }
}

const updateCart = async (req, res) => {
    try {
        const requestBody = req.body;
        const queryParams = req.query;
        const userId = req.params.userId;

        if (!validator.queryParam(queryParams)) {
            return res
                .status(404)
                .send({ status: false, message: " page not found" });
        }

        const { productId, cartId, removeProduct } = requestBody;

        if (!validator.isValidObjectId(productId)) {
            return res
                .status(400)
                .send({ status: false, message: "Product ID is not valid" });
        }

        const productByProductId = await productModel.findOne({
            _id: productId,
            isDeleted: false,
        });

        if (!productByProductId) {
            return res
                .status(404)
                .send({ status: false, message: `No product found by ${productId}` });
        }

        let productPriceInRupees = productByProductId.price

        if (!validator.isValidObjectId(cartId)) {
            return res
                .status(400)
                .send({ status: false, message: "cart Id  is not valid" });
        }

        const cartByCartId = await cartModel.findById(cartId);

        if (!cartByCartId) {
            return res
                .status(404)
                .send({ status: false, message: `No cart found by ${cartId}` });
        }

        const cartByUserId = await cartModel.findOne({ userId: userId });

        if (!cartByUserId) {
            return res.status(403).send({
                status: false,
                message: `User is not allowed to update this cart`,
            });
        }

        // cart id coming from request body and cart id of the user should be a  match
        if (cartId !== cartByUserId._id.toString()) {
            return res.status(403).send({
                status: false,
                message: `User is not allowed to update this cart`,
            });
        }

        // removeProduct should be either 1 or 0
        if (![0, 1].includes(removeProduct)) {
            return res.status(400).send({
                status: false,
                message: "Remove Product is required and its value must be either 0 or 1",
            });
        }

        // creating an array of objects with key productId and quantity
        const allProductsInCart = cartByCartId.items.map((product) => ({
            productId: product["productId"].toString(),
            quantity: product["quantity"],
        }));
        // console.log(allProductsInCart.flat())
        // checking product id coming from request body is present in the cart
        const isProductExistsInCart = allProductsInCart.filter(
            (x) => x.productId === productId
        );

        if (isProductExistsInCart.length === 0) {
            return res.status(404).send({
                status: false,
                message: "No product found by this product id inside cart",
            });
        }
        // identifying quantity of that product
        const productQuantity = isProductExistsInCart[0].quantity;
        // if client want to reduce the product quantity by one
        if (removeProduct === 1) {
            // first check whether productQuantity is  greater than one then reduce the quantity else remove whole product
            if (productQuantity > 1) {
                const decreaseExistingProductQuantity =
                    await cartModel.findOneAndUpdate({ _id: cartId, "items.productId": productId }, {
                        $inc: {
                            totalPrice: -productPriceInRupees,
                            "items.$.quantity": -1,
                        },
                    }, { new: true });

                return res.status(200).send({
                    status: true,
                    message: "product quantity reduced in cart",
                    data: decreaseExistingProductQuantity,
                });
            } else {
                const eraseProductFromCart = await cartModel.findOneAndUpdate({ _id: cartId }, {
                    $pull: { items: isProductExistsInCart[0] },
                    $inc: { totalItems: -1, totalPrice: -productPriceInRupees },
                }, { new: true });

                return res.status(200).send({
                    status: true,
                    message: "Product removed from cart",
                    data: eraseProductFromCart,
                });
            }
        } else {
            const removeProductFromCart = await cartModel.findOneAndUpdate({ _id: cartId }, {
                $pull: { items: isProductExistsInCart[0] },
                $inc: {
                    totalItems: -1,
                    totalPrice: -(productQuantity * productPriceInRupees),
                },
            }, { new: true });

            return res.status(200).send({
                status: true,
                message: "product removed from cart",
                data: removeProductFromCart,
            });
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({ error: error.message });
    }
};

const deleteCartItems = async (req, res) => {
    try {
        const { userId } = req.params

        const queryParam = req.query
        if (!validator.queryParam(queryParam)) {
            return res.status(400).send({
                status: false,
                message: 'page not found'
            })
        }

        if (!validator.isValidObjectId(userId)) {
            return res.status(400).send({
                status: false,
                message: "invalid userID"
            })
        }
        const isUserExist = await userModel.findOne({ _id: userId })
        if (!isUserExist) {
            return res.status(404).send({
                status: false,
                message: "user does not exist"
            })
        }
        const isCartexist = await cartModel.findOne({ userId: userId })
        if (!isCartexist) {
            return res.status(404).send({
                status: false,
                message: "cart does not exist"
            })
        }
        const data = {
            items: [],
            totalPrice: 0,
            totalItems: 0
        }
        const emptyCart = await cartModel.findOneAndUpdate({ userId: userId }, data, { new: true })
        return res.status(204).send({
            status: true,
            message: "remove all items from cart"
        })//, data: emptyCart
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

module.exports.createCart = createCart
module.exports.getCartByUserId = getCartByUserId
module.exports.updateCart = updateCart
module.exports.deleteCartItems = deleteCartItems