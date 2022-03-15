
const AuthorModel = require("../Models/authorModel")

const createAuthor= async function (req, res) {
    try {
    let author = req.body
    let authorCreated = await AuthorModel.create(author)
    res.status(201).send({data: authorCreated})

    }  catch(error) {
        res.status(500).send(error.message)
        console.log(error.message)
    }
    

}


module.exports.createAuthor=createAuthor