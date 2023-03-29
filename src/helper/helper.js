const mongoose = require("mongoose")

const isValidObject = (data) => {
    if (Object.keys(data).length === 0) {
        return false
    }
    return true
}

const isValid = (value) => {
    if (typeof (value) == "undefined" || value == null) return false
    if (typeof (value) == "string" && value.trim().length === 0) return false
    if (typeof (value) == "number" && value.toString().trim().length === 0) return false
    return true
}

const queryParam = (value) => {
    if (Object.keys(value).length != 0) {
        return false
    }
    return true
}

const isValidPhone = (value) => {
    return /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/.test(value)
}

const isValidEmail = (value) => {
    return /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(value.trim())
}

const isValidPW = (value) => {
    return /^[a-zA-Z0-9'@&#.\s]{8,15}$/.test(value.trim())
}


const isValidObjectId = (value) => {
    return mongoose.Types.ObjectId.isValid(value)

}


const isValidString = (value) => {
    return /^[a-zA-Z -]+$/.test(value)
}

const isValidPincode = (value) => {
    return /^[1-9][0-9]{5}$/.test(value)

}

const sendSucess = (response, res) => {
    const statusCode = response && response.statusCode ? response.statusCode : 200
    const message = response && response.message ? response.message : 'sucess'
    const data = response && response.data ? response.data : {}
    data.password && delete data.password
    return res.json({
        statusCode,
        message,
        data
    })
}



const sendError = (response, res) => {
    const statusCode = response && response.statusCode ? response.statusCode : 400
    const message = response && response.message ? response.message : {}
    const data = {}
    return res.json({
        statusCode,
        message,
        data
    })
}




module.exports.isValidObject = isValidObject
module.exports.isValid = isValid
module.exports.queryParam = queryParam
module.exports.isValidPhone = isValidPhone
module.exports.isValidEmail = isValidEmail
module.exports.isValidPW = isValidPW
module.exports.isValidObjectId = isValidObjectId
module.exports.isValidString = isValidString
module.exports.isValidPincode = isValidPincode
module.exports.sendSucess = sendSucess
module.exports.sendError = sendError
