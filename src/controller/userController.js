// const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userModel = require('../model/uerModel')
const validator = require('../validator/validator')
const aws = require('../s3')

const saltRounds = 10
const isValid = validator.isValid
const requestBody = validator.requestBody
const queryParams = validator.queryParams
const id = validator.id




const createUser = async function (req, res) {
    try {

        const data = req.body
        const query = req.query



        if (requestBody(data)) {
            return res.status(400).send({ status: false, message: "data is requird " })
        }

        if (!queryParams(query)) {
            return res.status(400).send({ status: false, message: "invalid url " })
        }

        const { fname, lname, email, phone, password } = data

        if (!isValid(fname)) {
            return res.status(400).send({ status: false, message: 'firstName is required' })
        }

        if (!isValid(lname)) {
            return res.status(400).send({ status: false, message: 'lastName is required' })
        }

        if (isValid(email)) {
            if (!/^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
                return res.status(400).send({ status: false, message: 'valid email address required' })
            }
        } else {
            return res.status(400).send({ status: false, message: 'email address is required' })
        }

        if (isValid(phone)) {
            if (!/^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/.test(phone)) {
                return res.status(400).send({ status: false, message: 'valid phone number is required' })
            }
        } else {
            return res.status(400).send({ status: false, message: 'phone number is required' })
        }

        if (isValid(password)) {
            if (!(/^[a-zA-Z0-9!@#$%^&*]{8,15}$/.test(password))) {
                return res.status(400).send({ status: false, message: 'password must not be greater then 15 digits and not be less then 8 digits' })
            }
        }
        else {
            return res.status(400).send({ status: false, message: 'password is required' })
        }

        if (!isValid(data.address.shipping.street)) {
            return res.status(400).send({ status: false, message: 'street number must be string' })
        }

        if (!isValid(data.address.shipping.city)) {
            return res.status(400).send({ status: false, message: 'city name is required' })
        }
        if (isNaN(data.address.shipping.pincode) == false) {



            if (!isValid(data.address.shipping.pincode)) {
                return res.status(400).send({ status: false, message: 'pincoode should be a number' })
            }
        } else {
            return res.status(400).send({ status: false, message: 'valid pincode is required' })
        }

        if (!isValid(data.address.billing.street)) {
            return res.status(400).send({ status: false, message: 'street number must be string' })
        }

        if (!isValid(data.address.billing.city)) {
            return res.status(400).send({ status: false, message: 'city name is required' })
        }

        if (isNaN(data.address.billing.pincode) == false) {
            if (!isValid(data.address.billing.pincode)) {
                return res.status(400).send({ status: false, message: 'pincode should be a number' })
            }
        } else {
            return res.status(400).send({ status: false, message: 'valid pincode is required' })
        }

        const dublicateEmail = await userModel.findOne({ email })
        if (dublicateEmail) {
            return res.status(400).send({ status: false, message: 'email address already exist' })
        }

        const dublicatePhoneNumber = await userModel.findOne({ phone })
        if (dublicatePhoneNumber) {
            return res.status(400).send({ status: false, message: 'phone number already exist' })
        }
        const hash = await bcrypt.hash(password, saltRounds);
        data.password = hash


        const files = req.files

        if (files && files.length > 0) {
            let uploadedFilesURL = await aws.uploadFile(files[0])
            req.uploadedFilesURL = uploadedFilesURL
            console.log(uploadedFilesURL)//
            data.profileImage = uploadedFilesURL
        }

        else {
            return res.status(400).send({ msg: "no file found" })
        }



        const createUser = await userModel.create(data)
        return res.status(201).send({ status: true, data: createUser })

    } catch (error) {
        console.log(error)
        res.status(400).send({ status: false, message: error })
    }
}



// **************************************logIn**********************************************//

const loginUser = async function (req, res) {

    const data = req.body
    const query = req.query

    const { email, password } = data

    if (requestBody(data)) {
        return res.status(400).send({ status: false, message: 'login credentials must present' })
    }

    if (!queryParams(query)) {
        return res.status(400).send({ status: false, message: 'invalid url' })
    }

    if (isValid(email)) {
        if (!/^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
            return res.status(false).send({ status: false, message: 'valid email adress is required' })
        }
    } else {
        return res.status(400).send({ status: false, message: 'email address is required' })
    }

    if (isValid(password)) {
        if (!(/^[a-zA-Z0-9!@#$%^&*]{8,15}$/.test(password))) {
            return res.status(400).send({ status: false, message: 'password must not be greater then 15 digits and not be less then 8 digits' })
        }
    } else {
        return res.status(400).send({ status: false, message: 'email address is required' })
    }

    const findDocument = await userModel.findOne({ email })
    if (!findDocument) {
        return res.status(400).send({ status: false, message: 'user not registerd' })
    }
    const hash = findDocument.password

    const isValidPass = bcrypt.compareSync(password, hash);
    if (isValidPass) {
        userId = findDocument._id,
            payLoad = { userId },
            secreatKey = "project5-@9855"
        //  console.log(userId)

        const token = jwt.sign(payLoad, secreatKey, { expiresIn: "6000s" })
        res.header('x-api-keys', token)

        const result = {}
        result.userId = userId
        result.token = token

        // console.log(result)
        return res.status(200).send({ status: true, message: 'user login successfull', data: result })


    } else {
        return res.status(400).send({ status: false, message: 'please enter correct password' })

    }


}

//****************************************************************************** */
const userProfile = async function (req, res) {
    // console.log(req.token)
    const _id = req.params.userId
    // console.log(userId)

    if (!id(_id)) {
        return res.status(400).send({ status: false, message: 'invalid user' })
    }

    const user = await userModel.findOne({ _id })
    if (!user) {
        return res.status(400).send({ status: false, message: 'user not registered' })
    } else {
        return res.status(200).send({ status: true, message: 'User profile details', data: user })
    }
    //  console.log(user)
}

const updateUser = async function (req, res) {

    const userId = req.params.userId
    if (!id(userId)) {
        return res.status(400).send({ status: false, message: 'invalid userId' })
    }
    // const token = req.token

    // if (userId != token) {
    //     return res.status(403).send({ status: false, message: 'user not authorised' })
    // }

    const userDetails = await userModel.findOne({ _id: userId }).lean()
    const userAddress = userDetails.address

    const data = req.body

    const string = JSON.stringify(data)
    const object = JSON.parse(string)

    const query = req.query

    if (requestBody(data)) {
        return res.status(400).send({ status: false, message: "data is requird " })
    }

    if (!queryParams(query)) {
        return res.status(400).send({ status: false, message: "invalid url " })
    }
    const { fname, lname, email, phone, password, address } = object

    if (object.hasOwnProperty("fname")) {
        if (!isValid(fname)) {
            return res.status(400).send({ status: false, message: 'firstName is required' })
        }
    }

    if (object.hasOwnProperty("lname")) {
        if (!isValid(lname)) {
            return res.status(400).send({ status: false, message: 'lastName is required' })
        }
    }


    if (object.hasOwnProperty("email")) {
        if (isValid(email)) {
            if (!/^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
                return res.status(400).send({ status: false, message: 'valid email address required' })
            }
        } else {
            return res.status(400).send({ status: false, message: 'email address is required' })
        }
    }


    if (object.hasOwnProperty("phone")) {
        if (isValid(phone)) {
            if (!/^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/.test(phone)) {
                return res.status(400).send({ status: false, message: 'valid phone number is required' })
            }
        } else {
            return res.status(400).send({ status: false, message: 'phone number is required' })
        }
    }


    if (object.hasOwnProperty("password")) {
        if (isValid(password)) {
            if (!(/^[a-zA-Z0-9!@#$%^&*]{8,15}$/.test(password))) {
                return res.status(400).send({ status: false, message: 'password must not be greater then 15 digits and not be less then 8 digits' })
            }
        }
        else {
            return res.status(400).send({ status: false, message: 'password is required' })
        }
    }

    if (object.hasOwnProperty("address")) {
        if (address.hasOwnProperty("shipping")) {

            if ((object.address.shipping).hasOwnProperty("street")) {
                userAddress.shipping.street = object.address.shipping.street

                if (!isValid(data.address.shipping.street)) {

                    return res.status(400).send({ status: false, message: 'street number must be string' })
                }
            }
            if ((object.address.shipping).hasOwnProperty("city")) {
                userAddress.shipping.city = object.address.shipping.city
                if (!isValid(object.address.shipping.city)) {
                    return res.status(400).send({ status: false, message: 'city name is required' })
                }
            }


            if ((object.address.shipping).hasOwnProperty("pincode")) {
                if (isNaN(data.address.billing.pincode) == true) {
                    userAddress.shipping.pincode = object.address.shipping.pincode
                if (!isValid(data.address.shipping.pincode)) {
                    return res.status(400).send({ status: false, message: 'pincoode should be a number' })
                }
            } else {
                return res.status(400).send({ status: false, message: 'valid pincode is required' })
            }
        }
    }
        if (address.hasOwnProperty("billing")) {

            if ((object.address.billing).hasOwnProperty("street")) {
                if (isNaN(data.address.billing.pincode) == false) {
                userAddress.billing.street = object.address.billing.street


                if (!isValid(object.address.billing.street)) {
                    return res.status(400).send({ status: false, message: 'street number must be string' })
                }
            }
        }
            if ((object.address.billing).hasOwnProperty("city")) {
                userAddress.billing.city = object.address.billing.city

                if (!isValid(object.address.billing.city)) {
                    return res.status(400).send({ status: false, message: 'city name is required' })
                }
            }

            // if (isNaN(data.address.billing.pincode) == false) {
            //     if (!isValid(data.address.billing.pincode)) {
            //         return res.status(400).send({ status: false, message: 'pincode should be a number' })
            //     }
            // } else {
            //     return res.status(400).send({ status: false, message: 'valid pincode is required' })
            // }
        }

    }
    // with lean we adding data in orignal document
    object.address = userAddress
    if (object.hasOwnProperty("email")) {
        const dublicateEmail = await userModel.findOne({ email })
        if (dublicateEmail) {
            return res.status(400).send({ status: false, message: 'email address already exist' })
        }
    }
    if (object.hasOwnProperty("phone")) {

        const dublicatePhoneNumber = await userModel.findOne({ phone })
        if (dublicatePhoneNumber) {
            return res.status(400).send({ status: false, message: 'phone number already exist' })
        }
    }
    if (object.hasOwnProperty("password")) {

        const hash = await bcrypt.hash(password, saltRounds);
        object.password = hash
    }

    const files = req.files

    if (files && files.length > 0) {
        let uploadedFilesURL = await aws.uploadFile(files[0])
        req.uploadedFilesURL = uploadedFilesURL
        console.log(uploadedFilesURL)//
        object.profileImage = uploadedFilesURL
    }



    const updateUserDetails = await userModel.findOneAndUpdate({ _id: userId }, { $set: object }, { new: true })
    if (!updateUserDetails) {
        return res.status(400).send({ status: false, message: 'user not updated' })
    } else {
        return res.status(201).send({ status: true, message: 'user details updated successfully', data: updateUserDetails })
    }



}



module.exports.createUser = createUser
module.exports.loginUser = loginUser
module.exports.userProfile = userProfile
module.exports.updateUser = updateUser