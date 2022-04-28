const userModel = require("../model/userModel")
const validator = require("../validator/validator")
const aws = require("./aws")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const salt = 10



const register = async (req, res) => {
    try {
        const requestBody = req.body
        const queryParam = req.query
        if (!validator.isValidObject(requestBody)) {
            return res.status(400).send({ status: false, message: "please fill all required fields" })
        }

        if (!validator.queryParam(queryParam)) {
            return res.status(400).send({ status: false, message: 'page not found' })
        }

        const { fname, lname, email, phone, password } = requestBody
        if (!requestBody.address) {
            return res.status(400).send({ status: false, message: "please enter your address " })
        }

        requestBody.address = JSON.parse(requestBody.address)

        const { shipping, billing } = requestBody.address

        if (!validator.isValidObject(shipping)) {
            return res.status(400).send({ status: false, message: "please fill all required fields in shipping" })
        }

        if (!validator.isValidObject(billing)) {
            return res.status(400).send({ status: false, message: "please fill all required fields billing" })
        }

        if (!validator.isValid(fname)) {
            return res.status(400).send({ status: false, message: "please enter your first name" })
        }

        if (!validator.isValidString(fname)) {
            return res.status(400).send({ status: false, message: "please enter letters only in first name" })
        }

        if (!validator.isValid(lname)) {
            return res.status(400).send({ status: false, message: "please enter your last name" })
        }

        if (!validator.isValidString(lname)) {
            return res.status(400).send({ status: false, message: "please enter letters only in last name" })
        }

        if (!validator.isValid(email)) {
            return res.status(400).send({ status: false, message: "please enter your email" })
        }

        if (!validator.isValidEmail(email)) {
            return res.status(400).send({ status: false, message: "please enter valid email" })
        }

        if (!validator.isValid(password)) {
            return res.status(400).send({ status: false, message: "please enter  password" })
        }

        if (!validator.isValidPW(password)) {
            return res.status(400).send({ status: false, message: "please enter valid password, between 8 to 15 characters" })
        }

        if (!validator.isValidPhone(phone)) {
            return res.status(400).send({ status: false, message: "please enter phone number" })
        }

        //in street not apply isValidString becouse street wiil be like these - '12, abc'
        if (!validator.isValid(shipping.street)) {
            return res.status(400).send({ status: false, message: "please enter street name" })
        }

        if (!validator.isValid(shipping.city)) {
            return res.status(400).send({ status: false, message: "please enter name of city" })
        }

        if (!validator.isValidString(shipping.city)) {
            return res.status(400).send({ status: false, message: "please enter vaid name of the city" })
        }

        if (!validator.isValidPincode(shipping.pincode)) {
            return res.status(400).send({ status: false, message: "please enter valid pincode" })
        }

        if (!validator.isValid(billing.street)) {
            return res.status(400).send({ status: false, message: "please enter street name" })
        }

        if (!validator.isValid(billing.city)) {
            return res.status(400).send({ status: false, message: "please enter name of the city" })
        }

        if (!validator.isValidString(billing.city)) {
            return res.status(400).send({ status: false, message: "please enter valid name of the city" })
        }

        if (!validator.isValidPincode(billing.pincode)) {
            return res.status(400).send({ status: false, message: "please enter valid pincode" })
        }

        const isEmailInUse = await userModel.findOne({ email: email })
        if (isEmailInUse) {
            return res.status(400).send({ status: false, message: "email already registered, enter different email" })
        }

        const isPhoneInUse = await userModel.findOne({ phone: phone })
        if (isPhoneInUse) {
            return res.status(400).send({ status: false, message: "phone number already registered, enter different number" })
        }

        // conveting password into encrypted password
        const hash = await bcrypt.hash(password, salt)
        // requestBody.password = hash

        const link = await aws.getProfileImgLink(req, res)
        // requestBody.profileImage = link

        const userData = {
            fname: fname,
            lname: lname,
            email: email,
            profileImage: link,
            phone: phone,
            password: hash,
            address: requestBody.address
        }
        //here we can use create(data) but to avoid unnecessary key (like isDeleted) we use userData
        const user = await userModel.create(userData)
        return res.status(201).send({ status: true, message: 'User created successfully', data: user })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


const userlogin = async function (req, res) {
    try {
        const requestBody = req.body;
        // check body  provied or not
        if (!validator.isValidObject(requestBody)) {
            return res.status(400).send({ status: false, message: "Please provide body" })
        }

        const queryParam = req.query
        if (!validator.queryParam(queryParam)) {
            return res.status(400).send({ status: false, message: 'page not found' })
        }

        const emailId = req.body.email
        const password = req.body.password
        //check user exist or not
        if (!(emailId || password)) {
            return res.status(400).send({ status: false, message: "email or password is missing" })
        }
        // check email provied or not
        if (!validator.isValid(emailId)) {
            return res.status(400).send({ status: false, message: "plese provide email_Id" })
        }
        // check by regex
        if (!(validator.isValidEmail(emailId))) {
            return res.status(400).send({ status: false, message: "please provide valid eamil with sign" })
        }
        // check password provied or not
        if (!validator.isValid(password)) {
            return res.status(400).send({ status: false, message: "please provide valid password" })
        }
        //check by regex
        if (!validator.isValidPW(password)) {
            return res.status(400).send({ status: false, message: "please enter valid password, between 8 to 15 characters" })
        }
        const login = await userModel.findOne({ email: emailId })
        if (!login) {
            return res.status(404).send({ status: false, message: "email is not register" })
        }
        bcrypt.compare(password, login.password, (err, result) => {
            if (result === true) {
                let token = jwt.sign(
                    {
                        userId: login._id,
                        iat: Math.floor(Date.now() / 1000),
                        exp: Math.floor(Date.now() / 1000) + 2 * 60 * 60

                    }, "projectfivegroup20"
                );
                res.status(200).setHeader("api-token-key", token)
                return res.status(200).send({ status: true, message: "User login successfull", data: { userId: login._id, Token: token } })
            } else {
                return res.status(400).send({ status: false, message: "incorrect password" })
            }
        })

    }
    catch (error) {
        return res.status(500).send({ status: false, error: error.message })
    }
};


const getUserProfile = async function (req, res) {
    try {
        let userId = req.params.userId;

        if (!(validator.isValid(userId) && validator.isValidObjectId(userId))) {
            return res.status(400).send({ status: false, message: "user  Id not valid" })
        }

        const queryParam = req.query
        if (!validator.queryParam(queryParam)) {
            return res.status(400).send({ status: false, message: 'page not found' })
        }

        let getUserProfile = await userModel.findById(userId);
        if (!getUserProfile) {
            return res.status(404).send({ status: false, message: "User Not Found" })
        }
        return res.status(200).send({ status: true, message: "User profile details", data: getUserProfile })
    } catch (err) {
        //   console.log("This is the error :", err.message);
        return res.status(500).send({ status: false, error: err.message });
    }
}


const updateUser = async (req, res) => {
    try {
        const { userId } = req.params  // const userId = req.params.userId
        if (!validator.isValidObjectId(userId)) {
            return res.status(400).send({ status: false, message: "Please provide valid ID" })
        }

        const queryParam = req.query
        if (!validator.queryParam(queryParam)) {
            return res.status(400).send({ status: false, message: 'page not found' })
        }

        const requestBody = req.body //JSON.parse(JSON.stringify(req.body)) 
        const files = req.files
        const { password } = requestBody
        const updateUserData = {}


        const isUserExist = await userModel.findById(userId)
        if (!isUserExist) {
            return res.status(404).send({ status: false, message: "user not found" })
        }

        if (requestBody._id) {
            return res.status(400).send({ status: false, message: "can not update user id" })
        }

        if (requestBody.fname) {
            if (!(validator.isValid(requestBody.fname))) {
                return res.status(400).send({ status: false, message: "please provide valid first name" })
            }

            if (!validator.isValidString(requestBody.fname)) {
                return res.status(400).send({ status: false, message: "please enter letters only in first name" })
            }
            updateUserData.fname = requestBody.fname
        }

        if (requestBody.lname) {
            if (!(validator.isValid(requestBody.lname))) {
                return res.status(400).send({ status: false, message: "please provide valid lname name" })
            }

            if (!validator.isValidString(requestBody.lname)) {
                return res.status(400).send({ status: false, message: "please enter letters only in last name" })
            }
            updateUserData.lname = requestBody.lname
        }

        if (requestBody.email) {
            if (!validator.isValidEmail(requestBody.email)) {
                return res.status(400).send({ status: false, message: "Please provide valid email Id" })

            }

            const isEmailInUse = await userModel.findOne({ email: requestBody.email })
            if (isEmailInUse) {
                return res.status(400).send({ status: false, message: "email already registered, enter different email" })
            }
            updateUserData.email = requestBody.email
        }

        if (requestBody.phone) {
            if (!validator.isValidPhone(requestBody.phone)) {
                return res.status(400).send({ status: false, message: "Please provide 10 digit number && number should start with 6,7,8,9" })
            }

            const isPhoneInUse = await userModel.findOne({ phone: requestBody.phone })
            if (isPhoneInUse) {
                return res.status(400).send({ status: false, message: "phone number already registered, enter different number" })
            }
            updateUserData.phone = requestBody.phone

        }

        //it check image avilable or not
        if (files && files.length > 0) {
            const link = await aws.getProfileImgLink(req, res)
            updateUserData.profileImage = link
        }

        if (password) {
            const hash = await bcrypt.hash(password, salt)
            updateUserData.password = hash
        }

        const updateAddress = JSON.parse(JSON.stringify(isUserExist.address))
        if (requestBody.address) {
            requestBody.address = JSON.parse(requestBody.address)

            if (requestBody.address.shipping) {
                if (requestBody.address.shipping.street) {
                    if (!validator.isValid(requestBody.address.shipping.street)) {
                        return res.status(400).send({ status: false, message: "please enter shipping street name" })
                    }
                    updateAddress.shipping.street = requestBody.address.shipping.street
                }

                if (requestBody.address.shipping.city) {
                    if (!validator.isValid(requestBody.address.shipping.city)) {
                        return res.status(400).send({ status: false, message: "please enter shipping city name" })
                    }

                    if (!validator.isValidString(requestBody.address.shipping.city)) {
                        return res.status(400).send({ status: false, message: "please enter valid name of the city" })
                    }

                    updateAddress.shipping.city = requestBody.address.shipping.city
                }

                if (requestBody.address.shipping.pincode) {
                    if (!validator.isValid(requestBody.address.shipping.pincode)) {
                        return res.status(400).send({ status: false, message: "please enter shipping pincode" })
                    }

                    if (!validator.isValidPincode(requestBody.address.shipping.pincode)) {
                        return res.status(400).send({ status: false, message: "please enter valid shipping pincode only accept 6 didgit number " })
                    }
                    updateAddress.shipping.pincode = requestBody.address.shipping.pincode
                }
            }

            if (requestBody.address.billing) {
                if (requestBody.address.billing.street) {
                    if (!validator.isValid(requestBody.address.billing.street)) {
                        return res.status(400).send({ status: false, message: "please enter billing street name" })
                    }
                    updateAddress.billing.street = requestBody.address.billing.street
                }

                if (requestBody.address.billing.city) {
                    if (!validator.isValid(requestBody.address.billing.city)) {
                        return res.status(400).send({ status: false, message: "please enter billing city name" })
                    }

                    if (!validator.isValidString(requestBody.address.billing.city)) {
                        return res.status(400).send({ status: false, message: "please enter valid name of the city" })
                    }
                    updateAddress.billing.city = requestBody.address.billing.city
                }

                if (requestBody.address.billing.pincode) {
                    if (!validator.isValid(requestBody.address.billing.pincode)) {
                        return res.status(400).send({ status: false, message: "please enter billing pincode" })
                    }

                    if (!validator.isValidPincode(requestBody.address.billing.pincode)) {
                        return res.status(400).send({ status: false, message: "please enter valid billing pincode only accept 6 didgit number " })
                    }
                    updateAddress.billing.pincode = requestBody.address.billing.pincode
                }
            }
            updateUserData.address = updateAddress
        }
        if (!validator.isValidObject(updateUserData)) {
            return res.status(400).send({ status: false, message: "please enter data for updation" })
        }

        const updateUser = await userModel.findOneAndUpdate({ _id: userId }, updateUserData, { new: true })
        return res.status(200).send({ status: true, message: "User profile update successfully", data: updateUser })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

module.exports.register = register
module.exports.getUserProfile = getUserProfile;
module.exports.userlogin = userlogin
module.exports.updateUser = updateUser