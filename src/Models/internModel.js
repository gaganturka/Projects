const mongoose = require('mongoose')
const objectId = mongoose.Schema.Types.ObjectId

const internSchema = new mongoose.Schema({

    name: {
        type : String,
        required: true,
        trim: true
    },
    email: {
        type : String,
        required: true,
        trim: true,
        unique: true,

        validate: {
            validator: function (v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        },
    },
        "mobile": {
            type : Number,
            required: true,
            unique: true,
            validate: {
                validator: function (inputtxt) {
                   return /^[6-9]\d{9}$/.test(inputtxt);              
        },
        message : "please enter valid mobile number"
    }
},

        collegeId : {
           
            type : objectId,
            ref: "College"
        },
        isDeleted : {
         
            type : Boolean,
            default : false
        }
    },{timestamps: true})



 module.exports = mongoose.model("Intern",internSchema )