
const authorModel = require("../Models/authorModel")
const blogModel = require("../Models/blogModel")

const createblog= async function (req, res) {
    try{
    let blog = req.body
    let authorId= blog.authorid
    let id=req.body.isPublished

    if(id === true){
        blog["publishedAt"] = new Date()
    }
    
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



const getblog= async function (req, res) {
        try {

            const data = req.query
            const dataa = data.authorid
            let validate = await blogModel.find({authorid : dataa })
            // if (!validate) return res.status(404).send('not exist')
            if (dataa == validate) {
            if (Object.keys(data) == 0) return res.status(400).send({ status: false, msg: "No input provided" })
    
            const blogs = await blogModel.find({data, deleted: false ,  isPublished: true })
            if (blogs.length == 0) return res.status(404).send({ status: false, msg: "No blogs Available." })
            res.status(200).send({ status: true, data: blogs });
        }
    }
    
    
        catch (error) {
            res.status(500).send({ status: false, msg: error.message });
        }
    }
    

    const updateblog = async function (req, res) {
        
        let blogid = req.params.blogId
        let check = await blogModel.findById(blogid)
        if (!check) return res.send('not valid id')

        let checking = req.body.isDeleted
        if (checking == true) return res.status(404).send({status : false})

        
        let id=req.body.isPublished

        if(id == true){
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

   let checking = req.body.isDeleted
   if (checking == false) { 

    let dlt = await blogModel.findOneAndUpdate({ id: idea }, { deleted : true}, { new: true })
    return res.status(200).send({ msg: dlt})
   } else {
       res.status(404).send('Blog not exist')
   }

 }

 const dllt = async function(req, res) {

    try{
    let category= req.query.category
    if (!category) return res.status(404).send('category required')
    let category1= await blogModel.find(category) 
    if(!category1) return res.status(400).send("Not a valid category")

    let tags = req.query.tags
    if (!tags) return res.status(404).send('Not a valid tag')
    let tags1= await blogModel.findOne(tags) 
    if(!tags1) return res.status(400).send("category not present")

    let subcategory = req.query.subcategory
    if (!subcategory) return res.status(404).send('Not a valid subcategory')
    let subcategory1= await blogModel.findOne(subcategory) 
    if(!subcategory1) return res.status(400).send("subcategory not present")

    let isPublished = req.query.isPublished
    if (!isPublished) return res.status(404).send('Not published')
    let isPublished1= await blogModel.findOne(isPublished) 
    if(!isPublished1) return res.status(400).send("isPublished not present")

    let authorid= req.query.authorid
    if (!authorid) return res.status(404).send('Not a valid authorid')
    let authorid1= await blogModel.findOne(authorid) 
    if(!authorid1) return res.status(400).send("authorid not present")

    let boody = req.body
    let findd = await blogModel.findById(boody)
    let done = await blogModel.findOneAndUpdate(findd, {isDeleted : true}, {new :true})
    res.status(200).send({msg : done})
    } catch(error) {
        res.send(error.mesage)
        console.log(error.mesage)
    }










     

 }


 

 

        
        
    
        
    














module.exports.createblog = createblog
module.exports.getblog = getblog
module.exports.updateblog = updateblog
module.exports.deletebloog = deletebloog
module.exports.dllt = dllt

