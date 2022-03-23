const collegeModel = require("../Models/CollegeModel")
const internModel = require("../Models/internModel")


// const isValid = function (value) {

//     if (typeof (value) === 'undefined' || typeof (value) === 'null') {
//         return false
//     }
//     if (value.length == 0) {
//         return false
//     }
//     if (typeof (value) === 'String' && value.length > 0 ) {
//         return true
//     }
// }

const isValid = function (value) {

    if (typeof (value) === 'undefined' || typeof (value) === 'null') {
        return false
    }
    if (value.length == 0) {
        return false
    } if (typeof (value) === 'string' || "Array" && value.length > 0) {
        return true
    }
}
const mobilee = function (mobile) {
    if (typeof (mobile) === 'undefined' || typeof (mobile) === 'null') {
        return false
    }
    if (mobile.length == 0) {
        return false
    }
    if (typeof (mobile) === 'number' || 'string') {
        return true
    }
}

const createCollege = async function (req, res) {
    try {
        let data = req.body

        const { name, fullName, logoLink } = data
        const req0 = isValid(name)
        if (!req0) return res.status(400).send({ status: false, message: 'name is require' })

        const req1 = isValid(fullName)
        console.log(req1)
        if (!req1) return res.status(400).send({ status: false, message: "fullName is required" })

        const req2 = isValid(logoLink)
        if (!req2) return res.status(400).send({ status: false, message: "logoLink is required" })



        let saveData = await collegeModel.create(data)
        if (!saveData) return res.status(400).send({ status: false, message: " body missing" })
        res.status(201).send({ status: true, data: saveData })


    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}

const createIntern = async function (req, res) {
    try {
        const data = req.body
        const valid = data.collegeId
        const validate = await collegeModel.findOne({ _id: valid })
        if (!validate) return res.status(400).send({ status: false, message: 'not valid collegeId' })

        const { name, email, mobile } = data
        const req0 = isValid(name)
        if (!req0) return res.status(400).send({ status: false, message: "name is required" })

        const req1 = isValid(email)
        if (!req1) return res.status(400).send({ status: false, message: "email is required" })

        const req2 = mobilee(mobile)
        console.log(req2)
        if (!req2) return res.status(400).send({ status: false, message: "incorrect mobile Number" })





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
          let intern = []
          let result = {}
          let collegeName = req.query.name
      
          if (!collegeName) return res.status(400).send({ status: false, msg: "invalid request parameters . Please Provide college name" })
      
      
          let collegeDetails = await collegeModel.findOne({ name: collegeName })
          if (!collegeDetails)
            res.send({ status: false, msg: "No College Found" })
      
          let internDetails = await internModel.find({ collegeId: collegeDetails._id })
      
          let collegeData = {
            name: collegeDetails.name,
            fullName: collegeDetails.fullName,
            logoLink: collegeDetails.logoLink
          }
          for (let i = 0; i < internDetails.length; i++) {
            result = {
              _id: internDetails[i]._id,
              name: internDetails[i].name,
              email: internDetails[i].email,
              mobile: internDetails[i].mobile
      
            }
            intern.push(result)
          }
          collegeData["intrests"] = intern
          res.status(200).send({ status: true, data: collegeData })
        }
        catch (error) {
          console.log(error)
          res.status(500).send({ status: false, msg: error.message })
        }
      }
//     try {
//         const data = req.query.name
//         if (!data) return res.status(400).send({ status: false, message: 'invalid detail' })

//         const checking = await collegeModel.findOne({ name: data })
//         if (!checking) return res.status(404).send({ status: false, message: 'No college found' })


//         const search = checking._id
//         const interests = await internModel.find({ collegeId: search })
//         res.status(201).send({ data: checking, intern: interests })

//     } catch (error) {
//         res.status(500).send({ status: false, message: error.message })
//         console.log(error)
//     }
// }


module.exports.createCollege = createCollege
module.exports.createIntern = createIntern
module.exports.detail = detail
