const express = require("express");
const router = express.Router();
const validate = require('../validation')
const reviews = require('../data/reviews');
const xss = require('xss');


router.post('/', async (req, res) => {
    console.log('POST [/addReview]');
    let validationFailure = false;
    try {
        xss(req.session.user);
        xss(req.body.eventId);
        xss(req.body.reviewRating);
        xss(req.body.reviewText);
        validate.alphanumeric(req.session.user);
        validate.checkId(req.body.eventId);
        validate.checkRating(req.body.reviewRating);
        validate.checkReviewText(req.body.reviewText);
    }
    catch (error) {
        console.log(error);
        validationFailure = true;
    }

    if (validationFailure) {
        res.status(400).send("Error in validating review");
        return;
    }
    else {
        let newReview = await reviews.createReview(
            req.session.user, req.body.eventId, req.body.reviewRating, req.body.reviewText);
        if (newReview == null) {
            res.status(400).send("Error in adding review");
            return;
        }
        res.status(200).send('Successfully added review');
    }
});

module.exports = router;
