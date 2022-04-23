const internModel = require("../Models/internModel")
const collegeModel = require("../Models/CollegeModel")

const mongoose = require('mongoose')



const isValid = function (value) {

    if (typeof (value) === 'undefined' || typeof (value) === 'null') {
        return false
    }
    if (typeof (value) != 'string') {
        return false
    } if (typeof (value) == 'string' && value.trim().length > 0) {
        return true
    }
}

const isValidObjectId = function (ObjectId) {
    return mongoose.Types.ObjectId.isValid(ObjectId)
}


const createIntern = async function (req, res) {
    try {
        const requestBody = req.body

        if (Object.keys(requestBody) == 0) {
            return res.status(400).send({ status: false, msg: " data is  missing" })
        }

        const { name, email, mobile, collegeId,isDeleted } = requestBody


        if (!isValidObjectId(collegeId)) {
            return res.status(400).send({ status: false, message: 'invalid college id' })
        }


        if (!isValid(name)) {
            return res.status(400).send({ status: false, message: "name is required" })
        }

        if (!isValid(email)) {
            return res.status(400).send({ status: false, message: "email is required" })
        }

        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            return res.status(400).send({ status: false, message: 'Not a valid email' })
        }

        if (!isValid(mobile)) {
            return res.status(400).send({ status: false, message: "please provide valid mobile Number" })
        }

        if (!(/^[6-9]\d{9}$/.test(mobile)))
            return res.status(400).send({ status: false, message: 'Not a valid mobile number' })


        const isCollegeExist = await collegeModel.findOne({ _id: collegeId })
        if (!isCollegeExist) {
            return res.status(400).send({ status: false, message: 'not valid collegeId' })
        }

        const isDublicateEmail = await internModel.findOne({ email })
        if (isDublicateEmail) {
            return res.status(400).send({ status: false, message: 'email already exist' })
        }

        const isDublicateMobile = await internModel.findOne({ mobile })
        if (isDublicateMobile) {
            return res.status(400).send({ status: false, message: 'mobile number already exist' })
        }
        if (isDeleted) {
            requestBody["isDeleted"] = false
        }


        const createIntern = await internModel.create(requestBody)
        if (!createIntern) return res.status(400).send({ status: false, message: 'invalid detail' })

        res.status(201).send({ status: true, data: createIntern })
    }

    catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}
const fetchCollegeData = async function (req, res) {
    try {

        let intere = []

        const requestBody = req.query.name
        if (!requestBody) {
            return res.status(400).send({ status: false, message: 'invalid detail' })
        }

        const collegeData = await collegeModel.findOne({ name: requestBody })
        if (!collegeData) {
            return res.status(404).send({ status: false, message: 'No college found' })
        }


        const collegeId = collegeData._id
        const interest = await internModel.findOne({ collegeId })


        let collegeDataele = {
            name: collegeData.name,
            fullName: collegeData.fullName,
            logoLink: collegeData.logoLink
        }


        // for (let i = 0; i < interest.length; i++) {
        //     result = {
        //         _id: interest[i]._id,
        //         name: interest[i].name,
        //         email: interest[i].email,
        //         mobile: interest[i].mobile,

        //     }
        //     intere.push(result)
        //     console.log(intere)
        // }
        // collegeDataele["interest"] = intere

        //     OR

        intere.push(interest)
        collegeDataele["interest"] = intere

        res.status(200).send(collegeDataele)

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}


module.exports.createIntern = createIntern
module.exports.fetchCollegeData = fetchCollegeData
