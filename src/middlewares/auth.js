const jwt = require("jsonwebtoken");
const booksModel = require("../models/bookModel");

const authenticate = function (req, res, next) {
    const token = req.headers["x-api-key"];
    if (!token) {
        return res.status(403).send({ status: false, message: 'token is required' })
    }

    // using ,{ignoreExpiration : true} (validate the expirered toke) & for bring error in 403
    const verifyToken = jwt.verify(token, "project3-user@9855", { ignoreExpiration: true })
    if (!verifyToken) {
        return res.status(403).send({ status: false, message: 'invalid user' })
    }

    // Date.now() give time in milisecods from 1970
    // verifyToken.exp give time in seconds because we defined in seconds .Here we converting seconds into miliseconds

    if (Date.now() > verifyToken.exp * 1000) {
        return res.status(403).send({ status: false, message: 'session expired please login again' })
    }

    // sending userId from token in request(req)
    req.userIdFromToken = verifyToken.userId;
    next()

}


module.exports.authenticate = authenticate
