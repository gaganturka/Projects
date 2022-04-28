const aws = require("aws-sdk")

aws.config.update({
    accessKeyId: "AKIAY3L35MCRVFM24Q7U",  // id
    secretAccessKey: "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",  // secret password
    region: "ap-south-1"
});

const uploadFile = async (file) => {
    return new Promise((resolve, reject) => {
        let s3 = new aws.S3({ apiVersion: "2006-03-01" })
        const uploadParams = {
            ACL: "public-read",
            Bucket: "classroom-training-bucket",
            Key: "group30/" + file.originalname,
            Body: file.buffer
        }
        s3.upload(uploadParams, (err, data) => {
            if (err) {
                return reject({ "error": err })
            }
            // console.log(data)
            return resolve(data.Location)
        })
    })
}
const getProfileImgLink = async (req, res) => {
    try {
        let files = req.files
        if (files && files.length > 0) {
            let uploadedFileURL = await uploadFile(files[0])
            // return res.status(201).send({status: true, message: "file uploaded succesfully", data: uploadedFileURL})
            return uploadedFileURL
        } else {
            return res.status(400).send({ status: false, message: "please enter profile pic" })
        }
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

module.exports.uploadFile = uploadFile
module.exports.getProfileImgLink = getProfileImgLink