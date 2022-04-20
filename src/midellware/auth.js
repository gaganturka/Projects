const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const { FSx } = require('aws-sdk')

const mid = async function(req, res, next ) {
    const _id = req.params.userId
    const token = req.headers["x-api-key"]
    if(!token) {
        return res.status(400).send({status : false, message : 'please login'})
    }
    
    secreatKey = "project5-@9855"
    const verifingUser = jwt.verify(token, secreatKey, {ignoreExpiration : true})
    if(!verifingUser) {
        return res.status(403).send({status : false, message : 'authentication failed'})
    }

    if(Date.now > verifingUser.exp*1000) {
        return res.status(false).send({status: false, message : 'session expired please login' })
    }

    req.token = verifingUser.userId

    next()







}

module.exports.mid = mid