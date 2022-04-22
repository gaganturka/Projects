const jwt = require("jsonwebtoken")
const validator = require("../validator/validator")

const authentication = async function (req, res, next) {
    try {
        const token = req.header('Authorization', 'Bearer Token')
        if (!token) {
            return res.status(400).send({ status: false, message: "Plz enter a token" })
        }
        let splitToken = token.split(' ')
        let decodedToken = jwt.verify(splitToken[1], "projectfivegroup20")
        //check decoded Token
        if (!decodedToken) {
            return res.status(400).send({ status: false, message: "token is invalid" })
        }
        if (Date.now() > (decodedToken.exp) * 1000) {
            return res.status(404).send({ status: false, message: `please login again because session is expired` })
        }

        req.decodedToken = decodedToken.userId
        next()
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const userAuthorization = async function (req, res, next) {
    try {
        let userId = req.params.userId;
        let userIdInToken = req.decodedToken;
        if (!(validator.isValid(userId)) && (validator.isValidobjectId(userId))) {
            return res.status(400).send({ status: false, message: "plz enter a valid userId" })
        }
        if (userId != userIdInToken) {
            return res.status(403).send({ status: false, message: "You are not authorized" })
        }

        next()
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


module.exports.userAuthorization = userAuthorization;
module.exports.authentication = authentication