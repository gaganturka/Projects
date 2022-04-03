const mongoose = require('mongoose')
const objectId = mongoose.Schema.Types.ObjectId

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'title must be provided'],
        unique: [true, 'tital must be unique'],
        trim: true
    },
    excerpt: {
        type: String,
        required: [true, 'exert must be provided '],
        trim: true
    },
    userId: {
        type: objectId,
        required: [true, 'userId must be provided'],
        ref: 'User',
        trim: true
    },
    ISBN: {
        type: String,
        required: [true, 'ISBN must be provided'],
        unique: [true, 'ISBN must be unique'],
        trim: true
    },
    catagory: {
        type: String,
        required: [true, 'catagory must be provided'],
        trim: true
    },
    subCatagory: {
        type: String,
        required: [true, 'subcatagory must be provided'],
        trim: true
    },
    reviews: {
        type: Number,
        default: 0
    },
    deletedAt: {
        type: Date,
        default: null
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    releasedAt: {
        type: Date,
        required: true
    }

}, { timestamps: true })

module.exports = mongoose.model("Book", bookSchema)