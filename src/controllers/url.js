const validUrl = require('valid-url')
const shortId = require('shortid')
const urlModel = require('../models/urlModel')
// const redis = require("redis")
// const {promisify} = require("util")
// const e = require('express')

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
const redis = require("redis");

const { promisify } = require("util");

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

        const longUrl = req.body.longUrl
        const query = req.query

        if (!queryparams(query)) {
            return res.status(400).send({ status: false, message: 'invalid request' })
        }

        //here isvalid mainly using for if type != 'string' then it give error
        if (!isValid(longUrl)) {
            return res.status(400).send({ status: false, message: 'invalid long url' })
        }
        const baseUrl = 'http://localhost:3000'



        // isUri is a function to validate url
        if (!validUrl.isUri(baseUrl)) {
            return res.status(400).send({ status: false, message: 'invalid base url' })
        }

        const urlCode = shortId.generate()
        // console.log(urlCode)

        if (validUrl.isUri(longUrl)) {
            let url = await urlModel.findOne({ longUrl }) //= ({longUrl : longUrl})

            if (url) {
                res.status(200).send({ status: true, data: url })
            } else {
                const shortUrl = baseUrl + '/' + urlCode

                // decreasing db call (do not using create method)
                url = new urlModel({
                    longUrl,
                    shortUrl,
                    urlCode
                })
                // const createUrl = await urlModel.create(url)  this db call we neglected it
                await url.save()
                res.status(200).send({ status: true, data: url })
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
            return res.status(400).send({ status: false, message: 'invalid request' })
        }
        let caching = await GET_ASYNC(`${urlCode}`)
        if (caching) {
            return res.status(200).send({ status: true, message: 'caching wooooooh', data: JSON.parse(caching) })

        } else {
            const urlCodeExist = await urlModel.findOne({ urlCode })
            console.log(urlCodeExist)

            if (urlCodeExist) {
                await SET_ASYNC(`${urlCode}`, JSON.stringify(urlCodeExist))
                return res.status(300).redirect(urlCodeExist.longUrl)

            } else {
                res.status(404).send({ status: false, message: 'No url found' })
            }
        }
    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}



module.exports.shortUrl = shortUrl
module.exports.longUrl = longUrl