const jwt = require("jsonwebtoken")
const {validator, sendError, sendSucess} = require("../helper/helper")
const logInSession = require('../model/logIn')

const authentication = async function (req, res, next) {
    try {
        const token = req.header('Authorization')
        if (!token) {
            return sendError({message: "You Not are authorized" }, res)
        }
        let decodedToken = jwt.verify(token, "projectfivegroup20")
        if (!decodedToken) {
            return sendError({message: "wrong authentication credential" }, res)

        }
        if (Date.now() > (decodedToken.exp) * 1000) {
            return sendError({message: `please login again because session is expired`  }, res)
        }

        req.decodedToken = decodedToken.userId

        const login = await logInSession.findOne({ token });
        if (login) {
            next()

        }else{
            sendError({ message: "You are not authorized", statusCode: 403 }, res);
        }
        
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

module.exports.authentication = authentication