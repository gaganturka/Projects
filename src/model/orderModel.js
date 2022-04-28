const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

const orderSchema = new mongoose.Schema({

    userId: {
        type: ObjectId,
        ref: 'user',
        required: true
    },
    items: [{
        productId: {
            type: ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            default: 1
        }
    }],
    totalPrice: {
        type: Number
    },
    totalItems: {
        type: Number
    },
    totalQuantity: {
        type: Number
    },
    cancellable: {
        type: Boolean,
        default: true
    },
    status: {
        type: String,
        default: 'pending',
        enum: ["pending", "completed", "cancled"]
    },

}, { timestamps: true })

module.exports = new mongoose.model("Order", orderSchema)