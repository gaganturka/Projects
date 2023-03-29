const express = require("express")
const mongoose = require("mongoose")
const multer = require("multer")
const cors = require("cors")
const sharp = require('sharp')
const path  = require('path');

const route = require("./route/route")

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(multer())


mongoose.connect("mongodb+srv://group13:UEEqzwKeluhyT2uM@cluster0.hkvjs.mongodb.net/group20Database?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
    .then(() => console.log('MongoDb is connected'))

    .catch(err => console.log(err))
app.use("/static", express.static(path.join(__dirname, "images")));

  

app.use('/', route);


app.listen(process.env.PORT || 3001, function () {
    
    console.log('Express app runnig on port' + (process.env.PORT || 3001))
})