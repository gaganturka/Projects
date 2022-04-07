const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const route = require('./route/route')
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect("mongodb+srv://Amit:THmzVZv3QBLW11Z1@cluster0.zkmhi.mongodb.net/groupXDatabase?authSource=admin&replicaSet=atlas-4r56zp-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true", {
    useNewUrlparser: true
})
    .then(() => console.log("MongoDb is connected"))

    .catch(err => console.log(err))

app.use('/', route);

app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port' + (process.env.PORT || 3000))
})
