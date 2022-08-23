const express = require("express");
const router = express.Router();
const validate = require('../validation')
const reviews = require('../data/reviews');
const xss = require('xss');


router.post('/', async (req, res) => {
    console.log('POST [/addReview]');
    console.log(req.body.reviewText);
    console.log(req.body.reviewTitle);
    console.log(req.body.reviewRating);
    console.log(req.body.eventId);

    res.status(200).send('you are now in /addReview');
});

module.exports = router;
