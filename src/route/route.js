const express = require('express')
const router = express.Router()
const removeUploadedFiles=require('multer/lib/remove-uploaded-files');
const s3 = require('../controller/s3')
const user = require('../controller/userController')



router.get("/test-me", function (re, res) {
    console.log('i am fine')
    res.send('all is well')
})

router.post("/createUser",s3.writeFile, user.createUser)


module.exports = router;