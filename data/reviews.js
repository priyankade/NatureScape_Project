const mongoCollections = require('../config/mongoCollections');
const reviews = mongoCollections.reviews;
const { ObjectId } = require('mongodb');
var validate = require('../validation');

async function createReview(reviewerName, eventId, rating, reviewText) {
    try {
        validate.alphanumeric(reviewerName);
        validate.checkId(eventId);
        validate.checkRating(rating);
        validate.checkReviewText(reviewText);
    }
    catch (error) {
        errormessage = {
            className: "could not create review",
            message: error,
            hasErrors: "True",
            title: "Error"
        }
        return null;
    }

    const reviewsCollection = await reviews();
    let newReview = {
        reviewerName: reviewerName,
        eventId: eventId,
        rating: rating,
        reviewText: reviewText
    };
    const insertInfo = await reviewsCollection.insertOne(newReview);
    if (insertInfo.insertedCount === 0) {
        errormessage = {
            className: "Item not added",
            message: "Item was not added",
            hasErrors: "True",
            title: "Error"
        }
        return errormessage;
    }
    const newId = insertInfo.insertedId;
    const review = await getReviewById(newId.toString());
    return JSON.parse(JSON.stringify(review));

}

async function getAllReviewsForEvent(eventId) {
    const reviewsCollection = await reviews();
    const reviewsList = await reviewsCollection.find({ 'eventId': eventId }, { '_id': 0 }).toArray();
    return JSON.parse(JSON.stringify(reviewsList));
}

async function getReviewById(Id) {
    try {
        validate.checkId(Id);
    } catch (error) {
        errormessage = {
            className: "Cannot get reviews for given Id",
            message: error,
            hasErrors: "Error",
            title: "Error"
        }
    }
    let newObjId = ObjectId();
    if (!ObjectId.isValid(newObjId)) throw 'Object id is not valid'
    let parsedId = ObjectId(Id);
    const reviewsCollection = await reviews();
    const reviewDetails = await reviewsCollection.findOne({ _id: parsedId });
    if (reviewDetails === null) throw 'No review is present with that Id'
    return reviewDetails
}
module.exports = {
    createReview,
    getAllReviewsForEvent,
    getReviewById
}
