// const multer = require("multer")
// const sharp = require('sharp')
// const path  = require('path');

// const upload = multer({
//     limits: {
//         fileSize: 1000000
//     },
//     fileFilter(req, file, cb) {
//         if (!file?.originalname?.match(/\.(jpg|jpeg|png)$/)) {
//             return cb(new Error('Please upload a valid image file'))
//         }

//          sharp(req?.file?.buffer).resize({ width: 250, height: 250 }).png().toFile(__dirname + `/images/${req?.file?.fieldname+'-'+Date.now()+'.png'}`).then((res) => {
//             res.status(201).send('Image uploaded succesfully')
//             cb(undefined, true)
//          }).catch((error) => {
//             console.log(error)
//             res.status(400).send(error)
//          })
//     }

// })

// // app.post('/image', upload.single('productImage'), async (req, res) => {

// module.exports= {upload}

const multer = require("multer");

const path = require("path");

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../images"),
  filename: (req, file, cb, filename) => {
    cb(
      null,
      Date.now() + "-" + "productImage" + path.extname(file.originalname)
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (!file?.originalname?.match(/\.(jpg|jpeg|png)$/)) {
    return cb(new Error("Please upload a valid image file"));
  }
};

const upload = multer({ storage: storage });

// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: "5mb",
//   },
//   fileFilter: fileFilter,
// })
// .fields([
//   {
//     name: "productImage",
//     maxCount: 3,
//   },
//   {
//     name: "image",
//     maxCount: 1,
//   },
// ]);

module.exports = {upload}