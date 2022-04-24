// const moment = require('moment')
const mongoose = require('mongoose')
const reviewModel = require('../models/reviewModel')
const bookModel = require('../models/bookModel')


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

const isValidRequestBody = function (body) {
    return Object.keys(body).length > 0
}

const isValidId = function (id) {
    return mongoose.Types.ObjectId.isValid(id)
}


const addreview = async function (req, res) {
    try {
        const bookId = req.params.bookId

        const query = req.query
        if (Object.keys(query).length != 0) {
            return res.status(400).send({ status: false, message: 'invalid request' })
        }

        const requestBody = req.body
        //here we are not including reviewedAt(in creation time) so no matter what Date you provide it takes only current date
        const { rating, reviewedBy, review, reviewedAt } = requestBody

        const reviewData = { bookId: bookId }

        if (!isValidId(bookId)) {
            return res.status(400).send({ status: false, message: 'invalid booIid' })
        }


        // lean() is used for convert mongoose object into plane js object for adding like reviewdata key in it as a temporarly
        const bookData = await bookModel.findOne({ _id: bookId, isDeleted: false }).lean()
        if (!bookData) {
            return res.status(404).send({ message: 'book not exist' })
        }


        if (!isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, message: 'data is required' })
        }

        if (requestBody.hasOwnProperty("reviewedBy")) {
            if (!isValid(reviewedBy)) {
                return res.status(400).send({ status: false, message: 'name must be in valid formate' })
            }
            reviewData['reviewedBy'] = reviewedBy

        }
        if (requestBody.hasOwnProperty("review")) {
            if (!isValid(review)) {
                return res.status(400).send({ status: false, message: 'invalid review' })
            }
            reviewData['review'] = review
        }


        if (requestBody.hasOwnProperty("rating")) {
            if (typeof (rating) != 'number') {
                return res.status(400).send({ status: false, message: 'rating will be a number' })
            }

            if (1 > rating) {
                return res.status(400).send({ status: false, message: 'rating should not be less then 1' })
            }
            if (rating > 5) {
                return res.status(400).send({ status: false, message: 'rating should not greater then 5' })
            }
            reviewData['rating'] = rating
        }

        const createReview = await reviewModel.create(reviewData)
        if (!createReview) {
            return res.status(400).send({ status: false, message: 'review not created' })
        }

        const allReview = await reviewModel.find({ bookId, isDeleted: false })
        const totalCountOfReviews = allReview.length


        //adding all count and data of all reviews
        bookData["reviews"] = totalCountOfReviews
        bookData["reviewData"] = allReview


        //here we can use $inc(incremet) or (make change in the existing value) function but soome book that are in db have wrong reviews no. to make correct we use $set 
        const addingreviews = await bookModel.findOneAndUpdate({ _id: bookId }, { $set: { reviews: bookData.reviews } }, { new: true })

        res.status(201).send({ status: true, message: 'review created successfully', data: bookData })

    } catch (error) {
        console.log(error)
        res.status(500).send({ status: false, message: error.message })
    }
}



const updateReview = async function (req, res) {
    try {
        const query = req.query
        if (Object.keys(query).length != 0) {
            return res.status(400).send({ status: false, message: 'page not found' })
        }

        const rquestBody = req.body
        const bookId = req.params.bookId
        const reviewId = req.params.reviewId

        if (!isValidId(bookId)) {
            return res.status(400).send({ status: false, message: 'bookId must be a valid id' })
        }

        if (!isValidId(reviewId)) {
            return res.status(400).send({ status: false, message: 'reviewId must be a valid id' })
        }


        if (!isValidRequestBody(rquestBody)) {
            return res.status(400).send({ status: false, message: 'data is requied' })
        }

        const updateReviewData = { isDeleted: false }

        //with the help of lean() converting mongoose object into plane js object 
        const bookData = await bookModel.findOne({ _id: bookId, isDeleted: false }).lean()
        if (!bookData) {
            return res.status(400).send({ status: false, message: 'invalid bookId id' })
        }


        const isReviewExist = await reviewModel.findOne({ _id: reviewId, bookId: bookId, isDeleted: false })
        if (!isReviewExist) {
            return res.status(400).send({ status: false, message: 'details provided by user are invalid' })
        }

        const { review, rating, reviewedBy } = rquestBody


        if (rquestBody.hasOwnProperty("review")) {
            if (!isValid(review)) {
                return res.status(400).send({ status: false, message: 'review must be a valid' })
            }
            updateReviewData["review"] = review
        }

        if (rquestBody.hasOwnProperty("reviewedBy")) {
            if (!isValid(reviewedBy)) {
                return res.status(400).send({ status: false, message: 'name must be in valid formate' })
            }
            updateReviewData["reviewedBy"] = reviewedBy
        }

        if (rquestBody.hasOwnProperty("rating")) {

            if (typeof (rating) != 'number') {
                return res.status(400).send({ status: false, message: 'rating will be a number' })
            }

            if (1 > rating) {
                return res.status(400).send({ status: false, message: 'rating should not be less then 1' })
            }
            if (rating > 5) {
                return res.status(400).send({ status: false, message: 'rating should not greater then 5' })
            }
            updateReviewData["rating"] = rating

        }

        const updateReview = await reviewModel.findOneAndUpdate({ _id: reviewId }, { $set: updateReviewData }, { new: true })
        // after update review we are taking book Data
        if (updateReview) {
            const reviewsData = await reviewModel.find({ bookId: bookId })
            if (reviewsData) {
                bookData["reviewsData"] = reviewsData
            }
        }

        res.status(200).send({ status: true, message: 'update successfully', data: bookData })
    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

const deleteReview = async function (req, res) {
    try {
        const query = req.query
        if (Object.keys(query).length != 0) {
            return res.status(400).send({ status: false, message: 'page NOt found' })
        }

        const bookId = req.params.bookId
        const reviewId = req.params.reviewId

        if (!isValidId(bookId)) {
            return res.status(400).send({ status: false, message: 'invalid book id' })
        }

        if (!isValid(reviewId)) {
            return res.status(400).send({ status: false, message: 'invalid review id' })
        }

        const bookData = await bookModel.findOne({ _id: bookId, isDeleted: false }).lean()
        if (!bookData) {
            return res.status(400).send({ status: false, message: 'no book available' })
        }

        const checkReviewId = await reviewModel.findOne({ _id: reviewId, isDeleted: false, bookId: bookId })
        if (!checkReviewId) {
            return res.status(404).send({ status: false, message: 'review already deleted' })
        }


        const deleteReview = await reviewModel.findOneAndUpdate({ _id: reviewId }, { isDeleted: true }, { new: true })
        if (deleteReview) {
            const reviewsCount = await bookModel.findOneAndUpdate({ _id: bookId }, { $inc: { reviews: -1 } }, { new: true })

            return res.status(400).send({ status: false, message: 'review has been successfully deleted', })
        } else {
            res.status(400).send({ status: false, message: 'review already deleted' })
        }
    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }


}

module.exports.addreview = addreview
module.exports.updateReview = updateReview
module.exports.deleteReview = deleteReview