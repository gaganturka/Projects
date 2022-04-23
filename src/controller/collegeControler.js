const collegeModel = require("../Models/CollegeModel")


const isValid = function (value) {

    if (typeof (value) === 'undefined' || typeof (value) === 'null') {
        return false
    }
    if (typeof (value) != 'string') {
        return false
    } if (typeof (value) == 'string' && value.trim().length == 0) {
        return false
    }
    return true
}



const createCollege = async function (req, res) {
    try {
        let requestBody = req.body

        if (Object.keys(requestBody) == 0) {
            return res.status(400).send({ status: false, msg: " data is  missing" })
        }

        const { name, fullName, logoLink ,isDeleted} = requestBody

        if (!isValid(name)) {
            return res.status(400).send({ status: false, message: 'name is require' })
        }

        const nameLen = name.split(" ")
        const checkNameLen = nameLen.length
        if (!(checkNameLen == 1)) return res.status(400).send({ status: false, message: 'invalid name' })



        if (!isValid(fullName)) {
            return res.status(400).send({ status: false, message: "fullName is required" })
        }

        const fullNameLen = fullName.split(" ")
        const isValidFullName = fullNameLen.length
        if (isValidFullName < 2) {
            return res.status(400).send({ status: false, message: 'invalid fullName' })
        }


        if (!isValid(logoLink)) {
            return res.status(400).send({ status: false, message: "logoLink is required" })
        }

        const isValidLogoLink = logoLink.split(" ")
        const isSpaceInLogoLink = isValidLogoLink.length
        if (!(isSpaceInLogoLink == 1)) {
            return res.status(400).send({ status: false, message: 'invalid logo' })
        }

        const Dublicatename = await collegeModel.findOne({ name })
        if (Dublicatename) {
            return res.status(400).send('name already exist')
        }
        if (isDeleted) {
            requestBody["isDeleted"] = false
        }

        const saveData = await collegeModel.create(requestBody)
        if (!saveData) {
            return res.status(400).send({ status: false, message: " body missing" })
        }
        res.status(201).send({ status: true, data: saveData })


    }
    catch (error) {
        console.log(error)
        res.status(500).send({ status: false, message: error.message })
    }
}


module.exports.createCollege = createCollege
