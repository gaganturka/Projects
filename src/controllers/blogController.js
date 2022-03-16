
const authorModel = require("../Models/authorModel")
const blogModel = require("../Models/blogModel")

const createblog= async function (req, res) {
    try{
    let blog = req.body
    let authorId= blog.authorid
    // let id=req.body.isPublished

    // if(id === true){
    //     blog["publishedAt"] = new Date()
    // }
    
    if(!authorId){return res.status(400).send("authorid required")}
    let author = await authorModel.findById(authorId)
    if(!author){return res.status(400).send("invalid authorId")}
 
    // if (blog.blog == true) {
    let blogCreated = await blogModel.create(blog)
    if (!blogCreated) return res.status(400).send('invalid request')
     res.status(201).send({data: blogCreated}) 
    // }
   
} catch(error) {
    res.status(500).send(error.message)
    console.log(error.message)

}
}
// ,  deleted: false ,  isPublished: true }



const getblog= async function (req, res) {
        try {
            const data = req.query
            if (Object.keys(data).length == 0) return res.status(400).send({ status: false, msg: "No input provided" })
    
            const blogs = await blogModel.find(data).find({deleted: false,  isPublished: true }).populate("authorid")
            console.log(blogs)
            if (blogs.length == 0) return res.status(404).send({ status: false, msg: "No blogs Available." })
            res.status(200).send({ status: true, data: blogs });
        }
    
    
        catch (error) {
            res.status(500).send({ status: false, msg: error.message });
            console.log(error)
        }
    }
    
    

    const updateblog = async function (req, res) {
        
      
        let blogid = req.params.blogId
        let check = await blogModel.findById(blogid)
        if (!check) return res.send('not valid id')

        let checking = req.body.isDeleted
        if (checking == true) return res.status(404).send({status : false})

        
        let update = await blogModel.findOneAndUpdate({_id : blogid}, {isPublished: true}, {new : true})

        let publish=req.body.isPublished
        if(publish == true){
            req.body["publishedAt"] = new Date()
        }
        // console.log(publishedAt)
       
        let updat = req.body
        let upda = await blogModel.findOneAndUpdate({_id : blogid}, updat, {new : true})
        res.status(200).send({msg :upda});
        
    }



 const deletebloog = async function(req, res){

   let idea = req.params.blogId

   let check = await blogModel.findOne({ _id: idea })
   if(!check) return res.status(404).send('id not exist')

//    let checking = req.body.deleted
//    if (checking == false) { 
    let dlt = await blogModel.findOneAndUpdate({ id: idea }, { deleted : true,  deletedAt: new Date()}, { new: true })
    return res.status(200).send({ msg: dlt})
//    } else {
//        res.status(404).send('Blog not exist')

 
 }

 const dllt = async function(req, res) {
   
        try {
            const data = req.query
            if (Object.keys(data) == 0) return res.status(400).send({ status: false, msg: "not a vaild input" })
            const deleteBYquery = await blogModel.findOneAndUpdate(data, { deleted: true, deletedAt: new Date() }, { new: true })
            if (!deleteBYquery) return res.status(404).send({ status: false, msg: "blog not exist" })
            res.status(200).send({ status: true, msg: deleteBYquery })
        }
    
    
        catch (error) {
            res.status(500).send({ status: false, msg: error.message });
        }
    };

    
 

        
        
    
        
    














module.exports.createblog = createblog
module.exports.getblog = getblog
module.exports.updateblog = updateblog
module.exports.deletebloog = deletebloog
module.exports.dllt = dllt