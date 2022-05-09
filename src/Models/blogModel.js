const mongoose = require("mongoose")
const objectId = mongoose.Schema.Types.ObjectId
const blogSchema = new mongoose.Schema({

    "title": {
        type: String,
        required: 'Blog title is required',
        trim: true
    },
    "body": {
        type: String,
        required: 'Blog body is requird',
        trim: true
    },
    "authorId": {
        type: objectId,
        ref: "author",
        required: 'authorId is required'
    },
    "tags": [String],
    "category": {
        type: String,
        required: 'Blog category is required',
        trim: true
    },
    "subcategory": [String],
    "isPublished": {
        type: Boolean,
        default: false
    },
    "publishedAt": Date, // if published is true publishedAt will have a date 2021-09-17T04:25:07.803Z
    "isDeleted": {
        type: Boolean,
        default: false
    },
    "deletedAt": {
        type: Date, // if deleted is true deletedAt will have a date 2021-09-17T04:25:07.803Z,
        default: null
    }
}, { timestamps: true })

module.exports = mongoose.model("blog", blogSchema)
