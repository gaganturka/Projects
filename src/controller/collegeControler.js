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



const createCollege = async function (req, res) {
    try {
        let data = req.body
        const checkname = data.name


        if (Object.keys(data) == 0) {
            return res.status(400).send({ status: false, msg: " data is  missing" })
        }

        const { name, fullName, logoLink } = data
        console.log(name)
        const req0 = isValid(name)
        console.log(req0)
        if (!req0) return res.status(400).send({ status: false, message: 'name is require' })

        const len = name.split(" ")
        const len1 = len.length
        if (!(len1 == 1)) return res.status(400).send({ status: false, message: 'invalid name' })

        const Dublicatename = await collegeModel.findOne({ name: checkname })
        console.log(Dublicatename)
        if (Dublicatename) return res.status(400).send('name already exist')


        const req1 = isValid(fullName)
        console.log(req1)
        if (!req1) return res.status(400).send({ status: false, message: "fullName is required" })

        const len5 = fullName.split(" ")
        const len6 = len5.length
        if (len6 < 2) return res.status(400).send({ status: false, message: 'invalid fullName' })

        const req2 = isValid(logoLink)
        if (!req2) return res.status(400).send({ status: false, message: "logoLink is required" })

        const len3 = logoLink.split(" ")
        const len4 = len3.length
        if (!(len4 == 1)) return res.status(400).send({ status: false, message: 'invalid logo' })



        let saveData = await collegeModel.create(data)
        if (!saveData) return res.status(400).send({ status: false, message: " body missing" })
        res.status(201).send({ status: true, data: saveData })


    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}


module.exports.createCollege = createCollege
