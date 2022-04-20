// const mongoose = require('mongoose')
const productModel = require('../model/productModel')
const validator = require('../validator/validator')
const aws = require('../s3')

const isValid = validator.isValid
const requestBody = validator.requestBody
const queryParams = validator.queryParams
const id = validator.id



const createProduct = async function (req, res) {

    const data = req.body
    const query = req.query
    const string = JSON.stringify(data)
    const object = JSON.parse(string)
    // console.log(data)
    // console.log(object)

    if (requestBody(data)) {
        return res.status(400).send({ status: false, message: 'data is required' })
    }

    if (!queryParams(query)) {
        return res.status(400).send({ status: false, message: 'invalid url' })
    }

    const { title, description, price, currencyId, currencyFormate, isFreeShipping, productImage, style, availableSizes, installments, isDeleted } = object

    if (!isValid(title)) {
        return res.status(400).send({ status: false, message: 'tital is required' })
    }

    if (!isValid(description)) {
        return res.status(400).send({ status: false, message: 'description is required' })
    }


    if (isNaN(price) == false) {

        if (!isValid(price)) {
            return res.status(400).send({ status: false, message: 'price is required' })
        }
    } else {
        return res.status(400).send({ status: false, message: 'valid price is required' })
    }
    ////////
    if (!isValid(currencyId)) {
        return res.status(400).send({ status: false, message: 'currencyId is required' })
    }
    if (currencyId != ("INR")) {
        return res.status(400).send({ status: false, message: 'invalid currencyId' })
    }
    ///////////

    if (!isValid(currencyFormate)) {
        return res.status(400).send({ status: false, message: 'currencyFormate is required' })
    }
    if (currencyFormate != ("₹")) {
        return res.status(400).send({ status: false, message: 'invalid currencyFormate' })
    }

    if (!isValid(style)) {
        return res.status(400).send({ status: false, message: 'style is required' })
    }


    if (!isValid(availableSizes)) {
        return res.status(400).send({ status: false, message: 'availableSizes is required' })
    }
    //////////////////2//////

    if (("S XS M X L XXL XL").indexOf(availableSizes.toUpperCase()) == -1) {
        return res.status(400).send({ status: false, message: 'size must be from these ["S", "XS","M","X", "L","XXL", "XL"]' })
    }

    data.availableSizes = data.availableSizes.toUpperCase()


    if (object.hasOwnProperty("installments")) {
        if (isNaN(installments) == false) {
            if (!isValid(installments)) {
                return res.status(400).send({ status: false, message: 'installments is required' })
            }
        } else {
            return res.status(400).send({ status: false, message: 'installments must be number' })
        }
    }

    const files = req.files

    if (files && files.length > 0) {
        let uploadedFilesURL = await aws.uploadFile(files[0])
        req.uploadedFilesURL = uploadedFilesURL
        console.log(uploadedFilesURL)//
        data.productImage = uploadedFilesURL
    }

    else {
        return res.status(400).send({ msg: "no file found" })
    }


    const isTitleExist = await productModel.findOne({ title })
    if (isTitleExist) {
        return res.status(400).send({ status: false, message: 'title must be unique' })
    }
    if (isDeleted) {
        data.isDeleted = false
    }

    const product = await productModel.create(data)
    if (product) {
        return res.status(400).send({ status: false, message: 'product created successfully', data: product })
    }
}


const fetchProductdata = async function (req, res) {
    const query = req.query
    console.log(query)

    // const{size,title,price } = query

    // result = []

    // if(Object.keys(query).length > 0) {
    // if(query.hasOwnProperty("size")) {

    //     const sizee = await productModel.find({isDeleted : false, availableSizes : size.toUpperCase()})
    //     result.push(sizee)
    //     // console.log('Gi')
    // }

    // if(query.hasOwnProperty("title")) {
    //     const product = await productModel.find({isDeleted : false})
    //     // console.log(substring(title))
    //     for(let i=0; i<title.length; i++){
    //         for(let j=i; j<title.length; j++){
    //           const substring =(title.substring(i, i+j))
    //           console.log(substring)

    // console.log(product.title.contains(substring) == true)
    //   console.log(tital)
    //   result.push(tital)
    // }
    // }

    // }

    // if(query.hasOwnProperty("price")){

    //     }
    // }else {
    //     const allProduct = await productModel.find({isDeleted : false})
    // }

    let filter = {
        isDeleted: false
    }

    let { size, name, priceGreaterThan, priceLessThan } = query

    // let size = req.query.size
    if (size) {
        if (("S XS M X L XXL XL").indexOf(size.toUpperCase()) == -1) {
            return res.status(400).send({ status: false, message: 'size must be from these ["S", "XS","M","X", "L","XXL", "XL"]' })
        }
        filter["availableSizes"] = size.toUpperCase()
    }

    // let name = req.query.name
    if (name) {
        if (!isValid(name)) {
            return res.status(400).send({ status: false, message: 'please enter valid name' })
        }
        console.log({ $Regex: name })
        filter["title"] = { $regex: name }
    }

    // let priceGreaterThan = req.query.priceGreaterThan
    if (priceGreaterThan) {
        // if (!isValid(priceGreaterThan)) {
        //     return res.status(400).send({ status: false, message: "Please enter a valid price" })
        // }
        filter['price'] = { $gte: priceGreaterThan }
    }

    if (priceLessThan) {
        if (!isValid(priceLessThan)) {
            return res.status(400).send({ status: false, message: "Please enter a valid price" })
        }
        filter["price"] = { $lte: priceLessThan }
    }
    // if (priceGreaterThan && priceLessThan) {
    //     if (!isValid(priceGreaterThan)) {
    //         return res.status(400).send({ status: false, message: "Please enter a valid price" })
    //     }
    //     if (!isValid(priceLessThan)) {
    //         return res.status(400).send({ status: false, message: "Please enter a valid price" })
    //     }
    //     filter["price"] = { $gte: priceGreaterThan, $lte: priceLessThan }
    // }
    const finalProduct = await productModel.find(filter) //.sort({ price: req.query.priceSort })
    if (finalProduct.length == 0) {
        return res.status(400).send({ status: false, message: "No Product found" })
    } console.log(filter)
    return res.status(200).send({ status: true, message: "ProductList", data: finalProduct })
}

// const productDetail = await productModel.find(filter)
// if (productDetail.length == 0) {
//     return res.status(400).send({ status: false, message: 'data not exist' })
// }

// if (productDetail) {
//     return res.status(200).send({ status: true, data: productDetail })
// }

// }

const getProduct = async function (req, res) {
    const _id = req.params.productId
    console.log(_id)

    if (!id(_id)) {
        return res.status(400).send({ status: false, message: 'invalid productId' })
    }

    const product = await productModel.findOne({ _id, isDeleted: false })
    if (!product) {
        return res.status(400).send({ status: false, message: 'invalid product id' })
    }

    if (product) {
        return res.status(200).send({ status: true, message: 'product Details', data: product })
    }

}


const updateProduct = async function (req, res) {

    const params = req.params.productId
    const data = req.body
    const query = req.query
    const string = JSON.stringify(data)
    const object = JSON.parse(string)
    // console.log(data)
    // console.log(object)
    if (!id(params)) {
        return res.status(400).send({ status: false, message: 'invalid detail' })
    }


    if (requestBody(data)) {
        return res.status(400).send({ status: false, message: 'data is required' })
    }

    if (!queryParams(query)) {
        return res.status(400).send({ status: false, message: 'invalid url' })
    }

    const { title, description, price, currencyId, currencyFormate, isFreeShipping, productImage, style, availableSizes, installments, isDeleted } = object
    if (title) {
        if (!isValid(title)) {
            return res.status(400).send({ status: false, message: 'tital is required' })
        }
    }

    if (description) {
        if (!isValid(description)) {
            return res.status(400).send({ status: false, message: 'description is required' })
        }
    }

    if (price) {
        if (isNaN(price) == false) {

            if (!isValid(price)) {
                return res.status(400).send({ status: false, message: 'price is required' })
            }
        } else {
            return res.status(400).send({ status: false, message: 'valid price is required' })
        }
    }
    ////////
    if (currencyId) {
        if (!isValid(currencyId)) {
            return res.status(400).send({ status: false, message: 'currencyId is required' })
        }
        if (currencyId != ("INR")) {
            return res.status(400).send({ status: false, message: 'invalid currencyId' })
        }
    }
    ///////////
    if (currencyFormate) {
        if (!isValid(currencyFormate)) {
            return res.status(400).send({ status: false, message: 'currencyFormate is required' })
        }
        if (currencyFormate != ("₹")) {
            return res.status(400).send({ status: false, message: 'invalid currencyFormate' })
        }
    }



    if (style) {
        if (!isValid(style)) {
            return res.status(400).send({ status: false, message: 'style is required' })
        }
    }

    if (availableSizes) {
        if (!isValid(availableSizes)) {
            return res.status(400).send({ status: false, message: 'availableSizes is required' })
        }
        //////////////////2//////

        if (("S XS M X L XXL XL").indexOf(availableSizes.toUpperCase()) == -1) {
            return res.status(400).send({ status: false, message: 'size must be from these ["S", "XS","M","X", "L","XXL", "XL"]' })
        }


        data.availableSizes = data.availableSizes.toUpperCase()
    }

    if (installments) {
        if (object.hasOwnProperty("installments")) {
            if (isNaN(installments) == false) {
                if (!isValid(installments)) {
                    return res.status(400).send({ status: false, message: 'installments is required' })
                }
            } else {
                return res.status(400).send({ status: false, message: 'installments must be number' })
            }
        }
    }

    const productExist = await productModel.findOne({ _id: params, isDeleted: false })
    if (!productExist) {
        return res.status(404).send({ status: false, message: 'invalid product id' })
    }

    const files = req.files

    if (files && files.length > 0) {
        let uploadedFilesURL = await aws.uploadFile(files[0])
        req.uploadedFilesURL = uploadedFilesURL
        console.log(uploadedFilesURL)//
        data.productImage = uploadedFilesURL
    }



//////// in it we give isDeleted false then in result it show tital shoud be unique and we commentout from schema
    const isTitleExist = await productModel.findOne({ title })
    if (isTitleExist) {
        return res.status(400).send({ status: false, message: 'title must be unique' })
    }
    if (isDeleted) {
        data.isDeleted = false
    }
    //availabele size not able to give in two terms

    console.log(object)
    const update = await productModel.findOneAndUpdate({ _id: params }, { $set:  data  }, { new: true })
    if (update) {

        res.status(200).send({ status: true, message: 'product updated', data: update })
    }

}

const deleteProduct = async function (req, res) {
    const params = req.params.productId

    const isDeleted = await productModel.findOne({ _id: params, isDeleted: false })
    if (!isDeleted) {
        return res.status(404).send({ status: false, message: 'product already deleted' })
    }

    // const deleted = {isDeleted : true}
    const deleteProduct = await productModel.findOneAndUpdate({ _id: params }, { $set: { isDeleted: true, deletedAt: new Date() } }, { new: true })
    console.log(deleteProduct)
    if (deleteProduct) {
        return res.status(400).send({ status: false, message: 'product deleted successfully' })
    }
}

module.exports.createProduct = createProduct
module.exports.fetchProductdata = fetchProductdata
module.exports.getProduct = getProduct
module.exports.updateProduct = updateProduct
module.exports.deleteProduct = deleteProduct