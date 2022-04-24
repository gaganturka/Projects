const urlModel = require('../models/urlModel')

const shortId = require('shortid')
const redis = require("redis");
const { promisify } = require("util");


const isValid = function (value) {
    if (typeof (value) == 'undefined' || typeof (value) == 'null') {
        return false
    }
    if (typeof (value) != 'string') {
        return false
    }
    if (typeof (value) == 'string' && value.trim().length == 0) {
        return false
    }

    return true
}


const queryparams = function (query) {
    if (Object.keys(query).length == 0) {
        return true
    }
}

//Connect to redis
const redisClient = redis.createClient(
    16368,
    "redis-16368.c15.us-east-1-2.ec2.cloud.redislabs.com",
    { no_ready_check: true }
);
redisClient.auth("Y52LH5DG1XbiVCkNC2G65MvOFswvQCRQ", function (err) {
    if (err) throw err;
});

redisClient.on("connect", async function () {
    console.log("Connected to Redis..");
});



const SET_ASYNC = promisify(redisClient.SET).bind(redisClient);
const GET_ASYNC = promisify(redisClient.GET).bind(redisClient);


const shortUrl = async function (req, res) {
    try {

        const requestBody = req.body
        const longUrl = requestBody.longUrl.trim()
        const query = req.query
  

        if (!queryparams(query)) {
            return res.status(400).send({ status: false, message: 'page Not found' })
        }

        if(Object.keys(requestBody).length != 1){
            return res.status(400).send({status : false, message :'invalid entery in request body'})
        }

        //here isvalid mainly using for if type != 'string' then it give error
        if (!isValid(longUrl)) {
            return res.status(400).send({ status: false, message: 'invalid long url' })
        }
        const baseUrl = 'http://localhost:3000'


        const urlCode = shortId.generate().toLowerCase()

        if (/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/.test(longUrl)) { 
            let url = await urlModel.findOne({ longUrl }).select({ longUrl: 1, shortUrl: 1, urlCode: 1, _id: 0 }) //= ({longUrl : longUrl})

            if (url) {
                res.status(200).send({ status: true, data: url })
            } else {
                const shortUrl = baseUrl + '/' + urlCode

                url = new urlModel({
                    longUrl,
                    shortUrl,
                    urlCode
                })
                // OR
                // const createUrl = await urlModel.create(url)  this db call we neglected it

                await url.save()

                if (url) {
                    await SET_ASYNC(`${urlCode}`, JSON.stringify(url), 'Ex', 600) //Ex define expire time of catch memory in sec.
                }
                const response = {
                    longUrl: url.longUrl,
                    shortUrl: url.shortUrl,
                    urlCode: url.urlCode
                }
                res.status(201).send({ status: true, data: response })
            }

        } else {
            res.status(400).send({ status: false, message: 'invalid long url' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({ status: false, message: error.message })

    }

}


const longUrl = async function (req, res) {
    try {
        const urlCode = req.params.urlCode
        const query = req.query

        if (!queryparams(query)) {
            return res.status(400).send({ status: false, message: 'Page not found' })
        }
        let caching = await GET_ASYNC(`${urlCode}`)

        if (caching) {
            const converting = JSON.parse(caching)
            return res.redirect(302, converting.longUrl)
        }
        else {
            const urlCodeExist = await urlModel.findOne({ urlCode })

            if (urlCodeExist) {
                await SET_ASYNC(`${(urlCode)}`, JSON.stringify(urlCodeExist), 'Ex', 600)
                res.redirect(302, urlCodeExist.longUrl)
            }
            else {
                res.status(404).send({ status: false, message: 'No url found' })
            }
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({ status: false, message: error.message })
    }
}



module.exports.shortUrl = shortUrl
module.exports.longUrl = longUrl
