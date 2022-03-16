
const { response } = require("express");
const AuthorModel = require("../Models/authorModel");
const jwt = require("jsonwebtoken");

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

const login = async function (req, res) {
    let email = req.body.email
    let password = req.body.password

    let log = await AuthorModel.find({email: email, password: password})
    if (!log) return res.status(404).send('invaid email')

    let token = jwt.sign({
        userId: log._id,
        project: "1",
        room: "4"
    }, "project1_room4")
    res.status(201).send({tokenn: token})

}

module.exports.login = login


module.exports.createAuthor=createAuthor