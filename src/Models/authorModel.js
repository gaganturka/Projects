const mongoose = require("mongoose")
var validator = require("email-validator");
validator.validate("test@email.com");

const authorSchema = new mongoose.Schema({


    "firstName": {
        type: String,
        required: true
    },
    "lastName": {
        type: String,
        required: true
    },
    "title": {
        type: String,
        required: true,

        enum: ["Mr", "Mrs", "Miss"]
    },
    "email": {
        type: String,
        validator : true,
        required: true,
        unique: true
    },
    "password": {
        type: String,
        required: true
    }

}, { timestamps: true })

module.exports = mongoose.model("author", authorSchema)

