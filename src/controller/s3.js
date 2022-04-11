const removeUploadedFiles=require('multer/lib/remove-uploaded-files');
const aws = require('aws-sdk');


    aws.config.update({
        accessKeyId: "AKIAY3L35MCRVFM24Q7U",  // id
        secretAccessKey: "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",  // secret password
        region: "ap-south-1" 
        });
    const uploadFile = async (file)=>{
       return new Promise(function(resolve,reject){
           let s3=new aws.S3({apiVersion:"2006-03-01"})
           var uploadParams = {
               ACL:"public-read", 
               Bucket:"classroom-training-bucket",
               Key:"mySubFolder/"+file.originalname,
               Body:file.buffer
           }
           s3.upload(uploadParams,function (err,data){
               if(err){return reject ({"error":err})}
            //    console.log("file uploaded successfully")
            //    return resolve(data.Location)
           })
       }
       )
    }
    let writeFile = async function(req,res){
       try{
           let files = req.files
           if(files && files.length>0){
               let uploadedFilesURL = await uploadFile(files[0])
            //   return res.status(201).send({msg:"file uploaded successfully",data : uploadedFilesURL})
           }
           else{
               return res.status(400).send({msg:"no file found"})
       } 
           }  
        catch(err){return res.status (500).send({msg:err})}
    }
    module.exports.writeFile = writeFile