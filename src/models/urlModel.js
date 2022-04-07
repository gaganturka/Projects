const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema({
    longUrl: {
        type: String,
        trim: true,
        required: 'longUrl is required'
    },
    shortUrl: {
        type: String,
        trim: true,
        unique: true

    },
    urlCode: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true
    }

})


module.exports = mongoose.model('Url', urlSchema)