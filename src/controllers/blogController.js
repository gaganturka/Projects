const authorModel = require("../Models/authorModel")
const blogModel = require("../Models/blogModel")

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




const createblog = async function (req, res) {
    try {


        let blog = req.body
        let authorId = blog.authorid
        let id = req.body.isPublished

        const { title, body, authorid, tags, category, subcategory, } = blog
        const req0 = isValid(title)
        if (!req0) return res.status(400).send('title is require')

        const req1 = isValid(body)
        if (!req1) return res.status(400).send('body require')

        const req2 = isValid(authorid)
        if (!req2) return res.status(400).send('authorid require')

        const req3 = isValid(tags)
        if (!req3) return res.status(400).send('tags require')

        const req4 = isValid(category)
        if (!req4) return res.status(400).send('category require')

        const req5 = isValid(subcategory)
        if (!req5) return res.status(400).send('subcategory require')

        


        if (id === true) {
            blog["publishedAt"] = new Date()
        }

        if (!authorId) { return res.status(400).send("authorid required") }
        let author = await authorModel.findById(authorId)
        if (!author) { return res.status(400).send("invalid authorId") }


        let blogCreated = await blogModel.create(blog)
        if (!blogCreated) return res.status(400).send('invalid request')
        res.status(201).send({ data: blogCreated })


    } catch (error) {
        res.status(500).send(error.message)
        console.log(error.message)

    }
}



const getblog = async function (req, res) {
    try {
        const data = req.query


        const blogs = await blogModel.find(data).find({  isPublished: true, deleted: false }).populate("authorid")
        if (blogs.length == 0) return res.status(404).send({ status: false, msg: "No blogs Available." })
        res.status(200).send({ status: true, data: blogs });
    }


    catch (error) {
        res.status(500).send({ status: false, msg: error.message });
    }
}



const updateblog = async function (req, res) {

    let blogid = req.params.blogId
    let check = await blogModel.findById(blogid)
    if (!check) return res.send('not valid id')

    let checking = check.deleted
    if (checking == true) return res.status(404).send({ status: false, msg: "blog has been already deleted" })


    let update = await blogModel.findOneAndUpdate({ _id: blogid }, { isPublished: true }, { new: true })


    let id = update.isPublished

    if (id == true) {
        req.body["publishedAt"] = new Date()
    }


    let updateBody = req.body
    let updated = await blogModel.findOneAndUpdate({ _id: blogid }, updateBody, { new: true })
    res.status(200).send({ msg: updated });
}



const deleteblog = async function (req, res) {

    try {
        let Blogid = req.params.blogId

        let check = await blogModel.findOne({ _id: Blogid })
        if (!check) return res.status(404).send('Blog not exist')

        let checking = check.deleted
        if (checking == false) {

            let deleteBlog = await blogModel.findOneAndUpdate({ _id: Blogid }, { deleted: true, deletedAt: new Date() }, { new: true })
            return res.status(200).send({ msg: "blog deleted successfuly" })
        } else {
            res.status(404).send('Blog has already deleted')
        }
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message });
    }
}




const deleteByElement = async function (req, res) {
    try {
        let data = req.query
        if (Object.keys(data) == 0) return res.status(400).send({ status: false, msg: "not a vaild input" })

        let check = await blogModel.find(data)
        if (!check) return res.status(404).send('Blog not exist')
        console.log(check)

        // let checking = check.isPublished
        // if(checking == false) {

        const deleteBYquery = await blogModel.updateMany({ $and: [data, { deleted: false }, { isPublished: false }] }, { $set: { deleted: true, deletedAt: new Date() } })
        if (deleteBYquery.modifiedCount == 0) return res.status(400).send('user already deleted')

        if (!deleteBYquery) return res.status(404).send({ status: false, msg: "blog not exist" })
        res.status(200).send({ status: true, msg: deleteBYquery })
    }
    //  else {
    //      res.status(201).send('blog published')
    //  }



    catch (error) {
        res.status(500).send({ status: false, msg: error.message });
    }
};















module.exports.createblog = createblog
module.exports.getblog = getblog
module.exports.updateblog = updateblog
module.exports.deleteblog = deleteblog
module.exports.deleteByElement = deleteByElement