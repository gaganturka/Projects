const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fname : {
        type : String,
        required : 'firstName is required'
    },
    lname : {
        type : String,
        required : 'lastName is required'
    },
    email : {
        type : String,
        require : 'Email address is required',
        unique : true
    },
    profileImage : {
        type : String,
    },
    phone : {
        type : String,
        required : 'phone Number is required',
        unique : true

    },
    password : {
        type : String,
        required : 'password is required',
        minlength : [8,'password must not be less then 8 digits'],
        maxlength : [15, 'password must not be greater then 15 digits']
    },
    address :{
        shipping :{
            street : {type : String , required : 'street number is required'},
            city : {type : String, required : 'city name is required'},
            pincode : {type : Number, required : 'pincode is required'}          
        }
    },
    billing : {
        street : {type : String , required : 'street number is required'},
        city : {type : String, required : 'city name is required'},
        pincode : {type : Number, required : 'pincode is required'}      
    }
 },{timestamps : true})

 module.exports=mongoose.model('User', userSchema)