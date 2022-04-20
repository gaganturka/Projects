const userModel = require('../model/uerModel')
const orderModel = require('../model/orderModel')
const productModel = require('../model/productModel')



const createOrder = async function (req, res) {

    const userId = req.params.userId
    const data = req.body

    const { productId } = data

    const product = await productModel.findOne({ _id: productId })


    const userPlacedOder = await orderModel.findOne({ userId })
    data["userId"] = userId
    if (userPlacedOder) {


    const keysInItems = userPlacedOder.items
    const keys = Object.keys(keysInItems)
    // console.log(keys.length)
    let productt = {}
    for (let i = 0; i < keys.length; i++) {
        productt = (userPlacedOder.items[i])
        // console.log([i])

    }
    // console.log(productt)

    // console.log(userPlacedOder)


        const productAlreadyExist = productt._id
        // console.log(productAlreadyExist)
        if (productAlreadyExist == productId) {
            console.log("if")

            const incrementQuantity = await orderModel.findOneAndUpdate({ userId, "items._id": productId }, { $inc: { "items.$.quantity": 1 } }, { new: true })
            // console.log(incrementQuantity.items.productt)
            let totalQuantity = 0
            let totalPrice = 0
            for (let i = 0; i < keys.length; i++) {
                totalQuantity = totalQuantity + (incrementQuantity.items[i].quantity)

                const productIdInOrder = (incrementQuantity.items[i]._id)
                const productInOrder = await productModel.find({ _id: productIdInOrder })
                totalPrice = totalPrice + +((productInOrder[0].price) * (incrementQuantity.items[i].quantity))
            }
            data["totalQuantity"] = totalQuantity
            data["totalPrice"] = totalPrice
            // return res.send(incrementQuantity)
            const incrementQuntity = await orderModel.findOneAndUpdate({ userId }, {totalQuantity : totalQuantity,totalPrice : totalPrice  }, { new: true })


        } else {
            console.log('else')
            //  const update = {}
            //     update["items"] = product

            // console.log(update)
            const createOrder = await orderModel.findOneAndUpdate({ userId }, { $addToSet: { items: product } }, { new: true })
            // return res.send(createOrder)
            let totalQuantity = 0
            let totalPrice = 0
            for (let i = 0; i <= keys.length; i++) {
                totalQuantity = totalQuantity + (createOrder.items[i].quantity)

                const productIdInOrder = (createOrder.items[i]._id)
                const productInOrder = await productModel.find({ _id: productIdInOrder })
                totalPrice = totalPrice + +((productInOrder[0].price) * (createOrder.items[i].quantity))
            }
            data["totalQuantity"] = totalQuantity
            data["totalPrice"] = totalPrice
            console.log(totalPrice)
            console.log(totalQuantity)
            const totalItems = (createOrder.items.length)
            const incrementQuntity = await orderModel.findOneAndUpdate({ userId }, { totalItems : totalItems, totalQuantity: totalQuantity,totalPrice:totalPrice}, { new: true })

// console.log(incrementQuntity)
        }

    }
    if(userPlacedOder){
  const updateOrder = {
    totalItems : data.totalItems,
    // totalQuantity : data.totalQuantity,
    totalPrice : data.totalPrice
  }
    // console.log('ooiyhgvggggggggggggggggggggggggggggggggggggggggggg')
   console.log(data)
    const createOrder = await orderModel.findOneAndUpdate({userId},{updateOrder}, {new : true})

    return res.send(createOrder)
    }else{
        console.log('oh god')
        const product = await productModel.findOne({_id : productId})
    data["items"]=product
    data["totalItems"] = 1
    data["totalQuantity"] = 1
    data["totalPrice"] = product.price
        console.log(product)
        const order = await orderModel.create(data)
        return res.send(order)

    }



}


const updateOrder = async function(req, res){
    // Updates an order status
//     Make sure the userId in params and in JWT token match.
//     Make sure the user exist
//     Get order id in request body
//     Make sure the order belongs to the user
//     Make sure that only a cancellable order could be canceled. Else send an appropriate error message and response.
//     Response format
//         On success - Return HTTP status 200. Also return the updated order document. The response should be a JSON object like this
//         On error - Return a suitable error message with a valid HTTP status code. The response should be a JSON object like this

const  userId = req.params.userId
const data = req.body

const{status}= data
console.log(data)

// const userExist = await userModel.findOne({_id : userId})
// if(!userExist){
//     return res.status(400).send('invalid user')
// }

if(status.includes(status.includes('pending', 'completed', 'cancled'))) {
    return res.send('status invalid')

}

const order = await orderModel.findOneAndUpdate({userId, isDeleted :false}, {status}, {new : true})

if(status == 'cancled'){
    const deleteOrder = await orderModel.findOneAndUpdate({userId, isDeleted : false}, {isDeleted : true, deletedAt : new Date},{new : true})
if(deleteOrder) {
    return res.send('order cancled')
}
} else{
    return res.send('order complete')
}

return res.send(order)


}
module.exports.createOrder = createOrder
module.exports.updateOrder = updateOrder


