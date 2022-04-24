const mongoose = require("mongoose")
const moment = require('moment')
const objectId = mongoose.Schema.Types.ObjectId

const reviewSchma = new mongoose.Schema({
    bookId: {
        type: objectId,
        ref: 'book',
        trim: true
    },
    reviewedBy: {
        type: String,
        trim: true,
        default: "Guest"
    },
    reViewedAt: {
        type: Date,
        default: moment().format('YYYY-MM-DD'),  //simple give current date in formate ('YYYY-MM-DD') 
        trim: true,
  
    },
    rating: {
        type: Number,
        required: [true, 'rating must be provided'],
        trim: true,
        min : 1,
        max : 5
    },
    review: {
        type: String,
        trim: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Review', reviewSchma)