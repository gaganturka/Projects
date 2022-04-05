const express = require('express')
const router = express.Router();
const url = require('../controllers/url')


router.get("/test-me", function (re, res) {
    console.log('i am fine')
    res.send('all is well')
})

router.post("/url/shorten", url.shortUrl)
router.get("/:urlCode", url.longUrl)


module.exports =  router;
