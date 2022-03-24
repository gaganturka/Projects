// const { stringify } = require("nodemon/lib/utils")
const AuthorModel = require("../Models/authorModel")
const jwt = require("jsonwebtoken")

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

const createAuthor = async function (req, res) {
    try {
        let author = req.body

        const { firstName, lastName, title, email, password } = author

        const req0 = isValid(firstName)
        if (!req0) return res.status(400).send('firstName is required')

        const req1 = isValid(lastName)
        if (!req1) return res.status(400).send('lastName is required')

        const req2 = isValid(title)
        if (!req2) return res.status(400).send('title is required')

        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            res.status(400).send({ status: false, msg: "Email should be a valid email address" })
        }

        const req4 = isValid(password)
        if (!req4) return res.status(400).send('password is required')

        let authorCreated = await AuthorModel.create(author)
        res.status(201).send({ data: authorCreated })
    }
    catch (error) {
        return res.status(500).send({ msg: error.message })
    }
}

const loginauthor = async function (req, res) {
    try {
        let username = req.body.email;
        let password = req.body.password;

        let author = await AuthorModel.findOne({ email: username, password: password })
        if (!author) return res.status(404).send({ status: false, mssg: "username or password is not valid" })
        // email and password validate separately
        let token = jwt.sign({ authorid: author._id, addresss: "near exibition road" }, "Blog-Project");
        res.setHeader("x-api-key", token);
        res.send({ status: true, data: token });
    }
    catch (error) {
        return res.status(500).send({ msg: error.message })
    }

};


module.exports.createAuthor = createAuthor
module.exports.loginauthor = loginauthor