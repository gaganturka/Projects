const mongoose = require('mongoose')

const productSchema = new mongoose.Schema ({
    title : {
        type : String,
        required : 'title is required',
        unique : true
    },
    description : {
        type : String,
        required : 'Description is required'
    },
    price : {
        type : String,
        required : 'price is required'

    },
    currencyId : {
        type : String,
        // required : 'currencyId is required',
        default : "INR"
        },
    currencyFormat : {
        type : String,
        // required : 'currencyFormate is required',
        default : "₹"
        
    },
    isFreeShipping : {
        type : Boolean,
        default : false
    },
    productImage : {
        type : String
    },
    style : {
        type : String
    },
    availableSizes : [{
        type : Array,
        enum : ["S", "XS","M","X", "L","XXL", "XL"],
        required : true,
        trim : true
    }],
    installments : {
        type : Number
    },
    deletedAt : {
        type : Date,
        default : null
    },
    isDeleted : {
        type : Boolean,
        default : false
    },

},{timestamps : true})

module.exports = new mongoose.model("Product", productSchema)