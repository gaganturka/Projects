const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

const cartSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        ref: 'user',
        unique: true
    },

    items: [{
        productId: {
            type: String,
            ref: 'product',
            required: true
        },
        quantity: {
            type: Number,
            default: 1

            // required : 'quantity required'

        }
    }],
    totalPrice: {
        type: Number,
        // comment : "hol"
    },
    totalItems: {
        type: Number,
        default: 1
    }

}, { timestamps: true })

module.exports = new mongoose.model("Cart", cartSchema)