const mongoose = require('mongoose')
const moment = require('moment')
const bookModel = require('../models/bookModel')
const userModel = require('../models/userModel')
const reviewsModel = require('../models/reviewModel')


const isvalid = function (value) {
    if (typeof (value) == 'undefined' || typeof (value) == 'null') {
        return false
    }

    if (typeof (value) == 'string' && value.trim().length == 0) {
        return false
    }
    if (typeof (value) != 'string') {
        return false
    }
    return true
}

const isvalidQueryParams = function (value) {
    if (typeof (value) == 'undefined' || typeof (value) == 'null') {
        return false
    }

    if (typeof (value) == 'string' && value.trim().length == 0) {
        return false
    }
    return true
}

const isValidId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId)
}

const isValidRequestBody = function (data) {
    return Object.keys(data).length > 0
}

const createBook = async function (req, res) {
    try {
        const query = req.query
        const data = req.body
        const userId = data.userId

        if (!isValidId(userId)) {
            return res.status(400).send({ status: false, message: 'valid userId is required' })
        }

        if (req.userIdFromToken != userId) {
            return res.status(401).send({ status: false, message: 'unAuthorised access ! owner info doesnot match' })
        }

        if (Object.keys(query).length != 0) {
            return res.status(400).send({ status: false, message: 'invalid request' })
        }

        if (!isValidRequestBody(data)) {
            return res.status(400).send({ status: false, message: 'data required' })
        }



        const { title, excerpt, ISBN, catagory, subCatagory, reviews, releasedAt } = data
        //  excerpt is a short piece taken from a book , (like bref summery )
        if (!isvalid(excerpt)) {
            return res.status(400).send({ status: false, message: 'excerpt is require must be in string' })
        }

        if (!isvalid(catagory)) {
            return res.status(400).send({ status: false, message: 'catagory is required must be in string' })
        }

        if (!isvalid(subCatagory)) {
            return res.status(400).send('subcatagory is required must be in string')
        }


        // check the date formate is correct
        if (!/^[0-9]{4}[-]{1}[0-1]{1}[0-9]{1}[-]{1}[0-9]{2}/.test(releasedAt)) {
            return res.status(400).send({ status: false, message: `released date format should be YYYY-MM-DD`, });
        }

        //validate date
        if (!moment(releasedAt).isValid()) {
            return res.status(400).send({ status: false, message: 'enter a valid date' })
        }

        if (data.hasOwnProperty("reviews")) {
            if (typeof (reviews) != 'number') {
                return res.status(400).send({ status: false, message: 'reviews will be a number' })
            }
            if (reviews != 0) {
                return res.status(400).send({ status: false, message: 'reviews must be Zero' })
            }
        }

        if (isvalid(title)) {

            const uniqueTitle = await bookModel.findOne({ title: title })
            if (uniqueTitle) {
                return res.status(400).send({ status: false, message: 'title shoud be uniqe' })
            }
        } else {
            return res.status(400).send({ status: false, message: 'tital is required must be in string' })
        }

        //  ISBN is International Standard Book Number
        if (isvalid(ISBN)) {
            if (!/^(97(8|9))?\d{9}(\d|X)$/.test(ISBN.split("-").join(""))) {
                return res.status(400).send({ status: false, message: 'ISBN is must be in valid formate' })
            }

            const uniqueISBN = await bookModel.findOne({ ISBN })
            if (uniqueISBN) {
                return res.status(400).send({ status: false, message: 'ISBN should be unique' })
            }

        } else {
            res.status(400).send({ status: false, message: 'ISBN is required must be in string ' })
        }


        const validUserId = await userModel.findOne({ _id: userId })
        if (!validUserId) {
            return res.status(404).send({ status: false, message: 'user does not exist' })
        }
        const bookData = {
            title: title.trim(),
            userId: userId.trim(),
            excerpt: excerpt.trim(),
            ISBN: ISBN.trim(),
            catagory: catagory.trim(),
            subCatagory: subCatagory.trim(),
            reviews: 0,
            releasedAt: releasedAt,
            isDeleted: false,
            deletedAt: null
        }

        const createBook = await bookModel.create(bookData)
        res.status(201).send({ status: true, message: ' book created succesfully', data: createBook })

    } catch (error) {
        res.status(400).send({ status: false, message: error.message })
        console.log(error)
    }

}

const getBooks = async function (req, res) {
    try {
        const query = req.query

        if (Object.keys(query).length != 0) {

            if (!isvalidQueryParams(query)) {
                return res.status(400).send({ status: false, message: 'invalid query parms' })
            }

            const filterbook = { isDeleted: false }


            const { userId, catagory, subCatagory } = query

            //hasOwnProperty (if in data userId exist then execute the code below else skip it ) helping in using of filter in query
            if (query.hasOwnProperty("userId")) {

                // in query params no need of trim

                if (!isValidId(userId)) {
                    return res.status(400).send({ status: false, message: 'write a proper id' })
                }

                const findBookWithUserId = await bookModel.find({ userId: userId })
                if (findBookWithUserId) {
                    filterbook['userId'] = userId.trim()
                }
            }

            if (query.hasOwnProperty('catagory')) {

                if (!isvalid(catagory)) {
                    return res.status(400).send({ status: false, message: 'improper catagory' })
                }

                const findCatagory = await bookModel.find({ catagory })
                if (findCatagory) {
                    filterbook['catagory'] = catagory.trim()
                }
            }

            if (query.hasOwnProperty('subCatagory')) {

                if (!isvalid(subCatagory)) {
                    return res.status(400).send({ status: false, message: 'improper subCatagory' })
                }

                const findsubCatagory = await bookModel.find({ subCatagory })
                if (findsubCatagory) {
                    filterbook['subCatagory'] = subCatagory.trim()
                }
            }

            const result = await bookModel.find(filterbook).select({ _id: 1, title: 1, excerpt: 1, userId: 1, category: 1, releasedAt: 1, reviews: 1 }).sort({ title: 1 });
            if (result.length == 0) {
                return res.status(400).send({ status: false, message: 'no book found' })
            }
            if (result) {
                return res.status(200).send({ status: true, bookCount: result.length, data: result })
            }

        } else {

            const findBook = await bookModel.find({ isDeleted: false }).select({ _id: 1, title: 1, excerpt: 1, userId: 1, category: 1, releasedAt: 1, reviews: 1 }).sort({ title: 1 });

            if (findBook.length == 0) {
                return res.status(400).send({ status: false, message: 'NO book available' })
            } else {
                res.status(200).send({ status: true, totalCount: findBook.length, data: findBook })
            }
        }
    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}



const getBookByParams = async function (req, res) {
    try {

        const query = req.query

        // any website not accept change in query params for particular request
        //converting query params into array for check length

        if (Object.keys(query).length != 0) {
            return res.status(400).send({ status: false, message: 'invalid request' })
        }
        const reviewsData = []

        const params = req.params.bookId

        // decreasing db call for saving time 

        // const findBook = await bookModel.findOne({ isDeleted: true, _id: params })
        // if (findBook) {
        //     return res.status(400).send({ status: false, message: 'no book available' })
        // }

        const review = await reviewsModel.find({ bookId: params, isDeleted: false })
        const reviewsCount = review.length
        if (isValidId(params)) {

            //  alternative we can also use .lean() 
            const findBook = await bookModel.findOne({ _id: params, isDeleted: false })
            if (!findBook) {
                return res.status(400).send({ status: false, message: 'book not found' })
            }
            const data = {
                _id: findBook._id,
                title: findBook.title,
                excerpt: findBook.excerpt,
                userId: findBook.userId,
                ISBN: findBook.ISBN,
                catagory: findBook.catagory,
                subCatagory: findBook.subCatagory,
                reviews: reviewsCount,
                isDeleted: findBook.isDeleted,
                releasedAt: findBook.releasedAt,
                createdAt: findBook.createdAt,
                updatedAt: findBook.updatedAt,
                reviewsData: review

            }
            reviewsData.push(data)
            if (!findBook) {
                return res.status(400).send({ status: false, message: ' book not exist id' })
            }

        } else {
            return res.status(400).send({ status: false, message: 'invalid book id' })
        }

        res.status(200).send({ status: true, data: reviewsData })
    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
        console.log(error)
    }
}

const updateBookById = async function (req, res) {
    try {

        const query = req.query
        if (Object.keys(query).length != 0) {
            return res.status(400).send({ status: false, message: 'invalid request' })
        }

        const data = req.body

        if (!isValidRequestBody) {
            return res.status(400).send({ status: false, message: 'data is required for update' })
        }

        const { title, ISBN, excerpt, releasedAt } = data
        // we use update variable for update specific data. without variable data is not specied or you can delete book from body simply give isDeleted : true
        const update = {}

        const params = req.params.bookId
        if (isValidId(params)) {

            // we can check isDeleted : true but with that we have to made 2 db call we can simply resolve it with 1 db call that is below
            const checkId = await bookModel.findOne({ _id: params, isDeleted: false }).lean()
            if (!checkId) {
                return res.status(404).send({ status: false, message: 'invalid book Id' })
            }
            //  authorisation

            // toString() returns the content of a string:or without toString() function user authorised
            if (req.userIdFromToken != checkId.userId.toString()) {
                return res.status(401).send({ status: false, message: 'unAuthorised access ! owner info doesnot match' })
            }

        }

        if (data.hasOwnProperty("title")) {
            if (!(isvalid(title))) {
                return res.status(400).send({ status: false, message: 'improper title' })
            }

            const uniqueTitle = await bookModel.findOne({ title })
            if (uniqueTitle) {
                return res.status(400).send({ status: false, message: 'title should be unique' })
            }
            update["title"] = title
        }

        if (data.hasOwnProperty("ISBN")) {
            if (!(isvalid(ISBN))) {
                return res.status(400).send({ status: false, message: 'ISBN required' })
            }
            if (!/^(97(8|9))?\d{9}(\d|X)$/.test(ISBN.split("-").join(""))) {
                return res.status(400).send({ status: false, message: 'ISBN is must be in valid formate' })
            }

            if (ISBN.length != 13) {
                return res.status(400).send({ status: false, message: 'invalid ISBN' })
            }
            const uniqueISBN = await bookModel.findOne({ ISBN: ISBN })
            console.log(uniqueISBN)
            if (uniqueISBN) {
                return res.status(400).send({ status: false, message: 'ISBN should be unique' })
            }
            update["ISBN"] = ISBN

        }

        if (data.hasOwnProperty("excerpt")) {
            if (!(isvalid(excerpt))) {
                return res.status(400).send({ status: false, message: 'excerpt required' })
            }
            update["excerpt"] = excerpt

        }

        if (data.hasOwnProperty("releasedAt")) {
            // check date formate
            if (!/^[0-9]{4}[-]{1}[0-1]{1}[0-9]{1}[-]{1}[0-9]{2}/.test(releasedAt)) {
                return res.status(400).send({
                    status: false,
                    message: `released date format should be YYYY-MM-DD`,
                });
            }

            //validate date
            if (!moment(releasedAt).isValid()) {
                return res.status(400).send({ status: false, message: 'enter a valid date' })
            }
            update["releasedAt"] = releasedAt

        }


        const updatebook = await bookModel.findOneAndUpdate({ _id: params }, { $set: update }, { new: true })
        res.status(200).send({ status: true, message: 'update successfully', data: updatebook })
        // we can also write in this manner 
        // if (updatebook) {
        //     return res.status(200).send({ status: true, message: 'update successfully', data: updatebook })
        // } else {
        //     res.status(400).send({ status: false, message: 'book not updated' })
        // }
    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }

}

const deleteBookByparams = async function (req, res) {
    try {

        const query = req.query
        if (Object.keys(query).length != 0) {
            return res.status(400).send({ status: false, message: 'invalid request' })
        }

        const bookId = req.params.bookId
        if (!isValidId(bookId)) {
            return res.status(400).send({ status: false, message: 'invalid book id' })
        }

        const isdeletedbook = await bookModel.findOne({ _id: bookId, isDeleted: false })
        if (!isdeletedbook) {
            return res.status(404).send({ status: false, message: ' book not exist' })
        }

        //  authorisation
        if (req.userIdFromToken != isdeletedbook.userId) {
            return res.status(401).send({ status: false, message: 'unAuthorised access ! owner info doesnot match' })
        }



        const deleteBook = await bookModel.findByIdAndUpdate({ _id: bookId }, { $set: { isDeleted: true, deletedAt: Date.now() } }, { new: true })
        res.status(200).send({ status: false, message: 'book deleted' })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}


module.exports.createBook = createBook
module.exports.getBooks = getBooks
module.exports.getBookByParams = getBookByParams
module.exports.updateBookById = updateBookById
module.exports.deleteBookByparams = deleteBookByparams