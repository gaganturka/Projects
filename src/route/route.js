const express = require('express')
const router = express.Router();
const urlController = require('../controllers/urlController')


router.get("/test-me", function (re, res) {
    console.log('i am fine')
    res.send('all is well')
})

router.post("/url/shorten", urlController.shortUrl)
router.get("/:urlCode", urlController.longUrl)


module.exports = router;
