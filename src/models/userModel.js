const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, 'tital is must be provided from these value : ["Mr", "Miss", "Mrs"]'],
        trim: true,              //it will take tital value with space OR if we give tital like : "   Mr " it remove the extra space automatic and conside as "Mr"
        enum: ["Mr", "Miss", "Mrs"] //we accept tital with only ["Mr", "Miss", "Mrs"] these value
    },
    name: {
        type: String,
        required: [true, 'user name must be provided'],
        trim: true
    },
    phone: {
        type: String,
        required: [true, 'mobile number must be provided'],
        trim: true,  //it will help to keep phone number(No). uniqe. without trim user can make account with same No. simply with space space it consider as another no. 
        unique: [true, " mobile number already exist"]
    },
    email: {
        type: String,
        required: [true, "email address must be provided"],
        unique: [true, "email address alreaady exist"],
        trim: true,
        lowercase: true // it convert email address(every ) into lowar case from upper case if any
    },
    password: {
        type: String,
        trim: true,  //if you give password with extra spaces it remove extra space 
        required: [true, "password must be provided"],
        minlength: [8, 'minimun length of password should not be lessthen 8'],
        maxlength: [15, 'maximum length of password should not be grater then 15']

    },
    address: {
        street: {
            type: String,
            trim: true
        },
        city: {
            type: String,
            trim: true
        },
        pincode: {
            type: String,
            trim: true
        }
    }

}, { timestamps: true })

module.exports = mongoose.model("User", userSchema)