const userModel = require("../models/userModel")
const jwt = require("jsonwebtoken")

//validation function
const isvalid = function (value) {
    if (typeof (value) == 'undefined' || typeof (value) == 'null') {
        return false
    }
    if (typeof (value) == 'string' && value.trim().length == 0) {
        return false
    }
    if (typeof (value) == 'number') {
        return false
    }
    return true
}


const isValidRequestBody = function (data) {
    if (Object.keys(data).length > 0) {
        return true
    }
}

// handeler function for registration of new user
const register = async function (req, res) {
    try {

        const queryData = req.query
        const requestBody = req.body

        //query params must be empty
        if (Object.keys(queryData).length > 0) {
            return res.status(400).send('page Not Found!')
        }

        if (!isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, msg: "please provide user details" })
        }


        // using destructering that we can validaing each key individually 
        const { name, title, phone, email, password, address, isDeleted } = requestBody

        if (isvalid(name)) {
            // !isNaN(name) define if value of name != alphabat then give error 
            if (!isNaN(name)) {
                return res.status(400).send({ status: false, message: 'valid name is required' })
            }
        } else {
            return res.status(400).send({ status: false, message: 'name is required' })
        }

        if (isvalid(title)) {
            if (["Mr", "Mrs", "Miss"].indexOf(title) == -1) {
                return res.status(400).send({ status: false, message: 'title should be in ["Mr"/"Mrs" /"Miss"] formate' })
            }
        } else {
            return res.status(400).send({ status: false, message: 'title is required in ["Mr"/"Mrs" /"Miss"] formate' })
        }


        if (isvalid(phone)) {
            if (!/^[6-9]{1}[0-9]{9}$/.test(phone.trim())) {
                return res.status(400).send({ status: false, message: 'please enter a valid 10 digit mobile number' })
            }
        } else {
            return res.status(400).send({ status: false, message: 'valid mobile number is required' })
        }



        if (isvalid(email)) {
            if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email.trim())) {
                return res.status(400).send({ status: false, message: 'email address must be in valid formate' })
            }

        } else {
            return res.status(400).send({ status: false, message: 'valid email address is required' })
        }



        if (isvalid(password)) {
            if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/.test(password.trim())) {
                return res.status(400).send({ status: false, message: 'The length of password should not be less then 8 and not be greater then 15 ' })
            }
        } else {
            return res.status(400).send({ status: false, message: 'password should be 8 to 15 characters, at least one character or one Number ' })
        }
        if (isvalid(address)) {

            if (!isvalid(address.street)) {
                return res.status(400).send({ status: false, message: 'valid street name is required' })
            }

            if (!isvalid(address.city)) {
                return res.status(400).send({ status: false, message: 'valid city name is required' })
            }

            if (isvalid(address.pincode)) {
                if (!/^[1-9][0-9]{5}$/.test(address.pincode)) {
                    return res.status(400).send({ status: false, message: 'please enter valid pincode' })
                }
            }
            else {
                return res.status(400).send({ status: false, message: 'valid pincode is required' })
            }
        } else {
            return res.status(400).send({ status: false, message: 'please enter a valid address' })
        }


        const isPhoneUnique = await userModel.findOne({ phone }) // ({phone : phone}) === ({ phone }) if key and value are same
        if (isPhoneUnique) {
            return res.status(400).send({ status: false, message: 'phone number is already exist' })
        }

        const isEmailUniqe = await userModel.findOne({ email })
        if (isEmailUniqe) {
            return res.status(400).send({ status: false, message: 'email address is already exist' })
        }

        if (isDeleted) {
            requestBody["isDeleted"] = false
        }


        const creatingUser = await userModel.create(requestBody)
        res.status(201).send({ status: true, message: 'user created successfully', data: creatingUser })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


const login = async function (req, res) {
    try {
        const params = req.query
        if (Object.keys(params).length > 0) {
            res.send(400).send({ status: false, message: 'invalid request' })
        }

        const requestBody = req.body
        const email = requestBody.email.toLowerCase()
        const password = requestBody.password

        if (!isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, message: 'data is missing' })
        }


        //if you give correct email with space then email will varified else not verified
        if (isvalid(email))
            if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email.trim())) {
                return res.status(400).send({ status: false, message: 'emailn addres must be in valid formate' })

            }

        if (isvalid(password)) {
            if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/.test(password.trim())) {
                return res.status(400).send({ status: false, message: 'The length of password should not be less then 8 and not be greater then 15 ' })
            }
        } else {
            return res.status(400).send({ status: false, message: 'password should be 8 to 15 characters, at least one character or one Number ' })
        }

        const logInUser = await userModel.findOne({ email: email, password: password })
        if (!logInUser) {
            return res.status(400).send({ status: false, message: 'invalid email or password' })
        }

        userId = logInUser._id
        payLoad = { userId }
        secretKey = "project3-user@9855"


        // in decoded token it give date in seconds
        const token = jwt.sign(payLoad, secretKey, { expiresIn: "6000s" })


        res.header("x-api-key", token)
        res.status(201).send({ status: true, message: 'user login successfully', data: token })
    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}
module.exports.register = register
module.exports.login = login