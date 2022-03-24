const internModel = require("../Models/internModel")
const collegeModel = require("../Models/CollegeModel")



const isValid = function (value) {

    if (typeof (value) === 'undefined' || typeof (value) === 'null') {
        return false
    }
    if (value.length == 0) {
        return false
    } if (typeof (value) == 'string' && value.trim().length > 0) {
        return true
    }
}



const createIntern = async function (req, res) {
    try {
        const data = req.body
        const valid = data.collegeId
        const valid1 = data.email
        const valid2 = data.mobile


        if (Object.keys(data) == 0) {
            return res.status(400).send({ status: false, msg: " data is  missing" })
        }

        const validate = await collegeModel.findOne({ _id: valid })
        if (!validate) return res.status(400).send({ status: false, message: 'not valid collegeId' })

        const validate1 = await internModel.find({ email: valid1 })
        if (validate1.length > 0) return res.status(400).send({ status: false, message: 'email already exist' })


        const validate2 = await internModel.find({ mobile: valid2 })
        if (validate2.length > 0) return res.status(400).send({ status: false, message: 'mobile number already exist' })


        const { name, email, mobile } = data
        const req0 = isValid(name)
        if (!req0) return res.status(400).send({ status: false, message: "name is required" })

        const req1 = isValid(email)
        if (!req1) return res.status(400).send({ status: false, message: "email is required" })

        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)))
            return res.status(400).send({ status: false, message: 'Not a valid email' })

        const req2 = isValid(mobile)
        console.log(req2)
        if (!req2) return res.status(400).send({ status: false, message: "incorrect mobile Number" })

        if (!(/^\d{10}$/.test(mobile)))
            return res.status(400).send({ status: false, message: 'Not a valid mobile number' })


        const create = await internModel.create(data)
        if (!create) return res.status(400).send({ status: false, message: 'invalid detail' })

        res.status(201).send({ status: true, data: create })
    }

    catch (error) {
        res.status(500).send({ status: false, message: error.message })
        console.log(error)
    }
}
const detail = async function (req, res) {


    try {

        let intere = []

        const data = req.query.name
        if (!data) return res.status(400).send({ status: false, message: 'invalid detail' })

        const collegeData = await collegeModel.findOne({ name: data })
        if (!collegeData) return res.status(404).send({ status: false, message: 'No college found' })


        const search = collegeData._id
        const interest = await internModel.find({ collegeId: search })


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
        console.log(error)
    }
}


module.exports.createIntern = createIntern
module.exports.detail = detail
