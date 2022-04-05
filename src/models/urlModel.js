const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema({
    longUrl : {
        type : String,
        lowercase :true,
        trim : true,
        required : true
    },
    shortUrl : {
        type : String,

    },
    urlCode : {
        type : String,
        unique : true
    }
    
})

module.exports =mongoose.model('Url',urlSchema )