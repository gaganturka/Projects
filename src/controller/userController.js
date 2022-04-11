const mongoose = require('mongoose')
const userModel = require('../model/uerModel')

const isValid = function(value){
    if(typeof(value) == 'undefined' || typeof(value) == 'null'){
        return false
    }
    if(typeof(value) != 'string'){
        return false
    }
    if(typeof(value) == 'string' && value.trim().length == 0) {
        return false
    }
    return true
}



const requestBody = function(value){
    if(Object.keys(value).length == 0){
        return false
    }
}



const createUser = async function(req, res) {



    const data = req.body
    // console.log(data)
    // console.log(data.address.shipping.street)

    if(requestBody(data)){
        return res.status(400).send({status : false , message : "data is requird "})
    }

    const{fname, lname, email, phone, password, street, city, pincoode} = data

    if(!isValid(fname)){
        return res.status(400).send({status : false, message : 'firstName is required'})
    }

    if(!isValid(lname)){
        return res.status(400).send({status : false, message : 'lastName is required'})
    }

    if(isValid(email)){
        if(!/^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)){
            return res.status(400).send({status : false, message : 'valid email address required'})
        }
    }else{
        return res.status(400).send({status : false, message : 'email address is required'})
    }

    if(isValid(phone)){
        if(!/^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/.test(phone)){
            return res.status(400).send({status : false, message : 'valid phone number is required'})
        }
    } else{
        return res.status(400).send({status : false, message : 'phone number is required'})
    }

    if(isValid(password)){
        if(!(/^[a-zA-Z0-9!@#$%^&*]{8,15}$/.test(password))){
            return res.status(400).send({status : false, message : 'password must not be greater then 15 digits and not be less then 8 digits'})
        }
    }
    else{
        return res.status(400).send({status : false, message : 'password is required'})
    }

    if(!isValid(data.address.shipping.street)){
        return res.status(400).send({status : false, message : 'street number must be string'})
    }

    if(!isValid(data.address.shipping.city)){
        return res.status(400).send({status : false, message : 'city name is required'})
    }

    if(!(typeof(data.address.shipping.pincode) == 'number')){
        return res.status(400).send({status : false, message : 'pinco ode should be a number'})
    }



    if(!isValid(data.billing.street)){
        return res.status(400).send({status : false, message : 'street number must be string'})
    }

    if(!isValid(data.billing.city)){
        return res.status(400).send({status : false, message : 'city name is required'})
    }

    if(typeof (data.billing.pincode) != 'number'){
        return res.status(400).send({status : false, message : 'pincoode should be a number'})
    }

    const dublicateEmail = await userModel.findOne({email})
    if(dublicateEmail) {
        return res.status(400).send({status : false, message : 'email address already exist'})
    }

    const dublicatePhoneNumber = await userModel.findOne({phone})
    if(dublicatePhoneNumber) {
        return res.status(400).send({status : false, message : 'phone number already exist'})
    }

    const createUser = await userModel.create(data)
    res.send(201).send({status : true, data : createUser})


}
module.exports.createUser = createUser