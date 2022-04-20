const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

const cartSchema = new mongoose.Schema({
    userId : {
        type : ObjectId,
        ref : 'user'
    },

    items : [{
        productId : {
            type : String,
            ref : 'product'
        },
        quantity : {
            type : Number,
            default : 1
            // required : 'quantity required'

        } 
    }],
    totalPrice : {
        type : Number,
        // comment : "hol"
    },
    totalItems : {
        type : Number,
        default : 1
    }

},{timestamps : true})

module.exports = mongoose.model('Cart', cartSchema)