const mongoose = require('mongoose')
const cartModel = require('../model/cartModel')
const productModel = require('../model/productModel')
const userModel = require('../model/uerModel')
const validator = require('../validator/validator')

const id = validator.id


// const createCart = async function (req, res) {
//     const userId = req.params.userId
//     const data = req.body

//     const { cartId, productId, items, totalPrice, totalItems } = data


//     if (!id(userId)) {
//         return res.status(false).send({ status: false, message: 'invalid userId' })
//     }
//     const user = await userModel.findOne({ _id: userId, isDeleted: false })
//     if (!user) {
//         return res.status(400).send({ status: false, message: 'user not registered' })
//     } else {
//         data["userId"] = userId
//     }




//     // token


//     if (!id(productId)) {
//         return res.status(400).send({ status: false, message: 'invalid productid' })
//     }
//     const product = await productModel.findOne({ _id: productId, isDeleted: false })
//     if (product) {
//         console.log('3')


//         data["items"] = product
//         data["totalPrice"] = product.price
//     } else {
//         return res.status(400).send({ status: false, message: 'product not exist' })
//     }


//     // if (cartId) {
//     // if (!id(cartId)) {
//     //     return res.status(false).send({ status: false, message: 'invalid cart id' })
//     // }
//     const cartExist = await cartModel.findOne({ userId, isDeleted: false }).lean()
//     if (cartExist) {


//         const increment = await cartModel.findOneAndUpdate({ userId, "items._id": productId }, { $inc: { "items.$.quantity": 1 } }, { new: true }).lean()

//         if (increment) {
//             console.log('4')

//             // const itemss = increment.items
//             let totalItems = 0
//             let totalPrice = 0
//             const keysInItems = increment.items.length
//             console.log(keysInItems)
//             const keyss = Object.keys(keysInItems)
//             console.log(keyss)
            
//             for (let i = 0; i < keyss.length; i++) {
//                 console.log([i])
            
//             const jntotalItems = totalItems + (increment.keysInItems[i].quantity)
//             }
//                 const productIdInOrder = (increment.items[i]._id)
//                 const productInOrder = await productModel.find({ _id: productIdInOrder })
//                 totalPrice = totalPrice + +((productInOrder[0].price) * (increment.keysInItems[i].quantity))
            
//             // data["totalQuantity"] = totalQuantity
//             // data["totalPrice"] = totalPrice
//             increment["totalItems"] = totalItems
//             // console.log(productInCarts)


//             increment["totalPrice"] = totalPrice



//             const updateCart = await cartModel.findOneAndUpdate({ userId }, { totalPrice: increment.totalPrice, totalItems: increment.totalItems }, { new: true })
//             if (updateCart) {

//                 return res.send(updateCart)
//             }
//         } else {
//             console.log('5')
//             const addProduct = await cartModel.findOneAndUpdate({ userId }, { $addToSet: { items: product } }, { new: true }).lean()
//             // console.log(addProduct)
//             const itemss = addProduct.items
//             let totalItems = 0
//             let totalPrice = 0
//             const totalKeysInArray = Object.keys(itemss)
//             console.log
//             const update = {}
//             for (let i = 0; i < totalKeysInArray.length; i++) {
//                 console.log([i])

//                 totalItems = totalItems + (itemss[i].quantity)
//                 addProduct["totalItems"] = totalItems
//                 const productInCarts = itemss[i]._id
//                 // console.log(productInCarts)


//                 const productsPrice = await productModel.find({ _id: productInCarts })
//                 if (productsPrice) {
//                     totalPrice = totalPrice + (productsPrice[0].price * (itemss[i].quantity))

//                     addProduct["totalPrice"] = (productsPrice[0].price * (itemss[i].quantity))
//                 }



//                 const update = (addProduct.totalItems)
//                 // console.log(addProduct)
//                 // what we cannot do with this below
//                 //    const updateCart = await cartModel.findOneAndUpdate({_id : cartId}, {totalItems : update}, {new: true})
//                 const updateCart = await cartModel.findOneAndUpdate({ userId }, { addProduct }, { new: true })
//                 if (updateCart) {

//                     return res.send(updateCart)
//                 }
//             }

//         }
//     }

//     console.log(data)
//     const cart = await cartModel.create(data)
//     if (cart) {
//         return res.status(201).send({ status: true, message: 'product added in cart successfully', data: cart })
//     }
// }
const createCart = async function(req, res) {
    let userId = req.params.userId
    let items2 
    if(!(validator.isValid(userId)&&validator.id(userId))){
        return res.status(400).send({status:false, message:"Please provide a valid userId"})
    }
     let items = req.body.items
    // let userId2 =req.body.userId
     const isCartExist = await cartModel.findOne({userId:userId})
     let totalPrice = 0;
     if(!isCartExist){
        for(let i = 0; i < items.length; i++){
          let productId = items[i].productId
          let quantity = items[i].quantity
          let findProduct = await productModel.find(productId)
          console.log((findProduct[0].price*quantity))
          totalPrice = totalPrice + (findProduct[0].price*quantity)
         }
        let createCart = await cartModel.create({userId:userId,items:items,totalPrice:totalPrice,totalItems:items.length })
        items2 = createCart.items
        console.log(createCart)
        return res.status(200).send({status:true,data:createCart})
     } if(isCartExist){
          items2 = isCartExist.items
     }
        let findProduct = await productModel.findById(items[0].productId)
        let totalPrice2 = findProduct.price
        let newquantity = items[0].quantity
        let flage = 0
           for(let i = 0; i < items2.length; i++){
               let productId = items2[i].productId
            if(productId == items[0].productId){
                   flage = 1
                   items2[i].quantity = items2[i].quantity + newquantity}
    } 
       totalPrice2 = totalPrice2 + isCartExist.totalPrice
        if(flage == 0){
            items2.push(items[0])
        }
       let updateCart = await cartModel.findOneAndUpdate({userId:userId},{$set:{items:items2,totalPrice:totalPrice2,totalItems:items2.length}},{new:true})
               return res.send(updateCart)
}


const updateCart = async function (req, res) {
    const userId = req.params.userId

    const data = req.body

    const { productId, cartId, removeProduct } = data

    // if(removeProduct){
    //     console.log('jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjhj')
    // }

    const findindCart = await cartModel.findOne({ _id: cartId, isDeleted: false })

    if (findindCart) {
        const item = findindCart.items
        const productInCart = Object.keys(item)
        let totalItems = 0
        let totalPrice = 0

        for (let i = 0; i < productInCart.length; i++) {
            const products = item[i]._id
            if ((products == productId) == true) {
                const quantity = item[i].quantity
                // console.log(quantity)

                //  here + convert string into number to check its value
                if (+quantity > 0) {
                    const decrementProduct = await cartModel.findOneAndUpdate({ _id: cartId, "items._id": productId }, { $inc: { "items.$.quantity": -1 } }, { new: true })

                } else {
                    console.log('no')
                }
            }


            const cart = await cartModel.findOne({ _id: cartId })
            if (cart) {

                totalItems = totalItems + (cart.items[i].quantity)

                const productAvilable = await productModel.find({ _id: products })
                // console.log(productAvilable)
                const price = (productAvilable[0].price) * (cart.items[i].quantity)
                // 
                totalPrice = totalPrice + price


            }

        }

        const result = await cartModel.findOneAndUpdate({ _id: cartId }, { totalItems: totalItems, totalPrice: totalPrice }, { new: true })
        if (result) {
            // console.log(result)
            return res.status(200).send({ message: 'updated', data: result })
        }
    }



}


const deleteCart = async function (req, res) {
    const data = req.body

    const cartId = data.cartId
    const cart = await cartModel.findOne({ _id: cartId })
    // console.log(cart)
    const item = cart.items
    // console.log(item)
    const keys = Object.keys(item)
    // console.log(keys)
    for (let i = 0; i < keys.length; i++) {
        const tems = item[i]
        // console.log(tems)
        //   const thiss = (cart.items[i])
        console.log(item[i])

        // console.log(totalItems)

        if (cart) {
            ///////////////////////         NOT ABLE TO MAKE ) QUANTITY ONLY REMAIL ELSE VALIDATIONS
            const deleteCart = await cartModel.findOneAndUpdate({ _id: cartId }, { $set: { "items[0].quantity": 0, totalItems: 0, totalPrice: 0 } }, { new: true })

            if (deleteCart) {
                // console.log(deleteCart)
                return res.status(400).send(deleteCart)
            }
        }
    }


}




module.exports.createCart = createCart
module.exports.updateCart = updateCart
module.exports.deleteCart = deleteCart