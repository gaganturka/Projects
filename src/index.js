const express = require("express")
const mongoose = require("mongoose")
const multer = require("multer")

const route = require("./route/route")

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(multer().any())


mongoose.connect("mongodb+srv://group13:UEEqzwKeluhyT2uM@cluster0.hkvjs.mongodb.net/group20Database?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
    .then(() => console.log('MongoDb is connected'))

    .catch(err => console.log(err))

app.use('/', route);


app.listen(process.env.PORT || 3000, function () {
    5
    console.log('Express app runnig on port' + (process.env.PORT || 3000))
})