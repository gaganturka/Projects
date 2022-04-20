const mongoose = require('mongoose')


const isValid = function (value) {
    if (typeof (value) == 'undefined' || typeof (value) == 'null') {
        return false
    }
    if (typeof (value) != 'string') {
        return false
    }
    if (typeof (value) == 'string' && value.trim().length == 0) {
        return false
    }
    return true
}


const requestBody = function (value) {
    if (Object.keys(value).length == 0) {
        return false
    }
}


const queryParams = function (value) {
    if (Object.keys(value).length == 0) {
        return true
    }

}


const id = function (id) {
    if (id) {
        return mongoose.Types.ObjectId.isValid(id)
    }
}


module.exports = {isValid,requestBody, queryParams, id}