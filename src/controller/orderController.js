const cartModel = require("../model/cartModel")
const userModel = require("../model/userModel")
const validator = require("../validator/validator")
const orderModel = require("../model/orderModel")


const createOrder = async (req, res) => {
  try {
    const { userId } = req.params

    const queryParam = req.query
    if (!validator.queryParam(queryParam)) {
      return res.status(400).send({ status: false, message: 'page not found' })
    }

    const requestBody = req.body
    if (!validator.isValidObject(requestBody)) {
      return res.status(404).send({ status: false, message: "enter data" })
    }

    const { cartId, cancellable, status } = requestBody

    if (!validator.isValidObjectId(userId)) {
      return res.status(400).send({ status: false, message: "Not a valid userID" })
    }

    const isUserExist = await userModel.findOne({ _id: userId, isDeleted: false })
    if (!isUserExist) {
      return res.status(404).send({ status: false, message: "user does not exist" })
    }

    if (!cartId) {
      return res.status(404).send({ status: false, message: "cartId is required" })
    }
    if (!validator.isValidObjectId(cartId)) {
      return res.status(404).send({ status: false, message: "Not a valid cartId" })
    }

    const cart = await cartModel.findOne({ _id: cartId, userId: userId })
    if (!cart) {
      return res.status(404).send({ status: false, message: "User not allowed to placed order" })
    }

    if (cancellable) {
      if (!typeof cancellable == 'boolean') {
        return res.status(404).send({ status: false, message: "cancellable should be a boolean value" })
      }
    }

    if (status) {
      if (["pending", "completed", "cancled"].indexOf(status) == -1) {
        return res.status(404).send({ status: false, message: "status should be among these value [pending, completed ,cancled]" })
      }
    }

    if (cart.items.length == 0) {
      return res.status(404).send({ status: false, message: "order has been accepted, please add more items in cart" })
    }


    let totalQuantity = 0
    for (let i = 0; i < cart.items.length; i++) {
      totalQuantity = totalQuantity + cart.items[i].quantity
    }

    const addToOrder = {
      userId: userId,
      items: cart.items,
      totalPrice: cart.totalPrice,
      totalItems: cart.totalItems,
      totalQuantity: totalQuantity,
      cancellable,
      status
    }

    const order = await orderModel.create(addToOrder)

    const updateCartData = {
      items: [],
      totalItems: 0,
      totalPrice: 0
    }

    const cartUpdate = await cartModel.findOneAndUpdate({ _id: cartId }, updateCartData, { new: true })

    return res.status(200).send({ status: true, message: 'order placed successfully', data: order })


  } catch (error) {
    return res.status(500).send({ status: false, message: error.message })
  }
}

const upadateOrder = async function (req, res) {
  try {
    const userId = req.params.userId;
    const requestBody = req.body

    // let orderId = req.body.orderId;
    // let status = req.body.status

    const queryParam = req.query
    if (!validator.queryParam(queryParam)) {
      return res.status(400).send({ status: false, message: 'page not found' })
    }

    const { status, orderId } = requestBody

    if (!(validator.isValid(userId) && validator.isValidObjectId(userId))) {
      return res
        .status(400)
        .send({ status: false, message: "user  Id not valid" });
    }
    if (!(validator.isValid(orderId) && validator.isValidObjectId(orderId))) {
      return res
        .status(400)
        .send({ status: false, message: "user  Id not valid" });
    }

    let cartExist = await cartModel.findOne({ userId: userId, isDeleted: false });
    if (!cartExist) {
      return res
        .status(400)
        .send({ status: false, message: "This user have no card till Now" });
    }

    let findOrder = await orderModel.findOne({ _id: orderId, isDeleted: false });
    if (!findOrder) {
      return res
        .status(400)
        .send({ status: false, message: "Order in not found with this Id" });
    }

    if (userId != findOrder.userId) {
      return res
        .status(400)
        .send({ status: false, message: "User is not utherized to do changes" });
    }

    if (status) {
      if (["pending", "completed", "cancled"].indexOf(status) == -1) {
        return res.status(404).send({ status: false, message: "status should be among these value [pending, completed ,cancled]" })
      }
    } else {
      return res.status(400).send({ status: false, message: 'status of order undefined' })
    }

    if (findOrder.cancellable == true) {
      if (findOrder.status == 'pending') {
        if (status) {
          if (["pending", "completed", "cancled"].indexOf(status) == -1) {
            return res.status(404).send({ status: false, message: "status should be among these value [pending, completed ,cancled]" })
          }
          const updateOrder = await orderModel.findOneAndUpdate({ _id: orderId }, { $set: { status } }, { new: true })
          return res.status(200).send({ status: true, message: 'order updated sucessfully', data: updateOrder })
        }
      }

      if (findOrder.status == 'completed') {
        if (status) {
          return res.status(400).send({ status: false, message: 'order already completed henced status cannot be changed' })
        }
      }

      if (findOrder.status == 'canceled') {
        if (status) {
          return res.status(400).send({ status: false, message: 'order already canceled henced status cannot be changed' })
        }
      }

    } else {

      if (findOrder.status == 'pending') {
        if (status) {
          if (["pending", "completed",].indexOf(status) == -1) {
            return res.status(404).send({ status: false, message: "status should be among these value [pending, completed ,cancled]" })
          }
          const updateOrder = await orderModel.findOneAndUpdate({ _id: orderId }, { $set: { status } }, { new: true })
          return res.status(200).send({ status: true, message: 'order updated sucessfully', data: updateOrder })

        }
      }
    }


  } catch (error) {
    return res.status(500).send({ status: false, message: error.message })
  }
};

module.exports.postOrder = createOrder
module.exports.upadateOrder = upadateOrder