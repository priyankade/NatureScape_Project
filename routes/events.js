const express = require("express");
const router = express.Router();
const validate = require('../validation')
const activitiesTableData = require('../data/activityTable');
const eventsData = require('../data/individualevent');
const reviewsData = require('../data/reviews');
const xss = require('xss');

router.get('/addEvent', async (req, res) => {
    console.log('GET [addEvent]');
    if (req.session.user) {
        res.render('display/addEvent', { activityName: req.params.activityName });
        return;
    }
    else {
        errormessage = {
            className: "User not logged in",
            message: "User needs to log in to create Event",
            hasErrors: "Error",
            title: "Error"
        }
        res.status(401).render('display/error', errormessage);
        //return res.redirect('/users/login');
        return;
    }
});

router.post('/createEvent', async (req, res) => {
    console.log('POST [createEvent]');
    if (req.session.user) {
        try {
            let activityName = xss(req.body.activityName);
            var validatedActivity = validate.checkActivity(activityName);
            let overview = xss(req.body.overview);
            var validatedOverview = validate.checkDescription(overview);
            let EventLocation = xss(req.body.location);
            var validatedLocation = validate.checkStringWithSpaces(EventLocation, "location");
            let EventCity = xss(req.body.city);
            var validatedCity = validate.checkString(EventCity, "city");
            let EventState = xss(req.body.state);
            var validatedState = validate.checkState(EventState, "state");
            let EventDate = xss(req.body.date);
            var validatedDate = validate.checkDateforFutureActivities(EventDate, "date");
            let EventOrganizer = xss(req.body.organizer);
            var validatedOrganizer = validate.checkStringWithSpaces(EventOrganizer, "organizer");
            let EventExpertise = xss(req.body.expertise);
            var validatedExpertise = validate.checkExpertise(EventExpertise, "expertise");
            let EventPrice = xss(req.body.price);
            var validatedPrice = validate.checkIsProperNumber(EventPrice, "price");

            //FAQ
            let question1 = xss(req.body.question1);
            var validatedQuestion1 = validate.checkStringWithSpaces(question1, "question1");
            let answer1 = xss(req.body.answer1);
            var validatedAnswer1 = validate.checkStringWithSpaces(answer1, "answer1");
            let question2 = xss(req.body.question2);
            var validatedQuestion2 = validate.checkStringWithSpaces(question2, "question2");
            let answer2 = xss(req.body.answer2);
            var validatedAnswer2 = validate.checkStringWithSpaces(answer2, "answer2");

            let checkdup = await validate.checkDuplicateEvent(validatedActivity, validatedOverview, validatedLocation, validatedCity, validatedState, validatedDate, validatedOrganizer, validatedExpertise, validatedPrice);
            if ("hasErrors" in checkdup) {
                throw 'Event already exists';
            }
        }
        catch (error) {
            console.log("catch block")
            errormessage = {
                className: "Cannot add Event",
                message: error,
                hasErrors: "Error",
                title: "Error"
            }
            res.status(400).render("display/addEvent", {
                activityName: req.body.activityName,
                location: req.body.location,
                city: req.body.city,
                state: req.body.state,
                date: req.body.date,
                organizer: req.body.organizer,
                expertise: req.body.expertise,
                price: req.body.price,
                question1: req.body.question1,
                question2: req.body.question2,
                answer1: req.body.answer1,
                answer2: req.body.answer2,
                title: "Create Event",
                error: error,
            });
            return;
        }

        console.log("faq start")
        const faq1 = {};
        const faq2 = {};
        let arr = [];

        faq1['question'] = validatedQuestion1;
        faq1['answer'] = validatedAnswer1;
        faq2['question'] = validatedQuestion2;
        faq2['answer'] = validatedAnswer2;

        arr.push(faq1, faq2);

        checkEventCreated = await activitiesTableData.createactivityTable(validatedActivity, validatedOverview, validatedLocation, validatedCity, validatedState, validatedDate, validatedOrganizer, validatedExpertise, validatedPrice, arr);
        console.log(checkEventCreated)

        if ("hasErrors" in checkEventCreated) {
            errormessage = {
                className: "Could not add Event",
                message: "could not add Event",
                hasErrors: "True",
                title: "Error"
            }
            res.status(400).render("display/addEvent", {
                activityName: req.body.activityName,
                location: req.body.location,
                city: req.body.city,
                state: req.body.state,
                date: req.body.date,
                organizer: req.body.organizer,
                expertise: req.body.expertise,
                price: req.body.price,
                question1: req.body.question1,
                question2: req.body.question2,
                answer1: req.body.answer1,
                answer2: req.body.answer2,
                title: "Create Event",
                error: error,
            });
            return;
        }
        res.status(200).render("display/success", {"message": "Successfully inserted Event"});
    }
});

router.get("/:id", async (req, res) => {
    let searchid = xss(req.params.id);
    console.log(`GET [/event/${searchid}]`);

    if (!req.session.user) {
        errormessage = {
            className: "User not logged in",
            message: "User needs to log in to view event details",
            showLoginLink: "true",
            hasErrors: "Error",
            title: "Error"
        }
        res.status(401).render('display/error', errormessage);
        return;
    }

    let username = req.session.user;

    try {
        validate.checkId(searchid);
    } catch (error) {
        errormessage = {
            className: "No search item supplied",
            message: "The event no longer exists",
            hasErrors: "Error",
            title: "Error"
        }
        res.status(400).render("display/error", errormessage);
        return;
    };

    searchResult = await eventsData.getEventById(searchid);
    try {
        if (searchResult.length == 0) {
            throw 'Event does not exist';
        }
    } catch (error) {
        errormessage = {
            className: "Event not found",
            message: "Event was not found",
            hasErrors: "True",
            title: "Error"
        }
        return res.status(400).render("display/error", errormessage);
    }
    let isUserRegistered = false;
    if (searchResult.registeredMembers != null) {
        for (let i in searchResult.registeredMembers) {
            if (username ===  searchResult.registeredMembers[i]) {
                isUserRegistered = true;
            }
        }
    }

    //query all reviews for this event
    let eventReviews = await reviewsData.getAllReviewsForEvent(searchid);

    let today = new Date();
    let eventDate = new Date(searchResult.date);

    /* A user can review only if 
        1. Event date has passed
        2. User had registered for the event
    */
    let canReview = false;
    if (eventDate < today && isUserRegistered) {
        canReview = true;
    }

    res.render('display/eventpage', {
        event: searchResult,
        isUserRegistered: isUserRegistered,
        canReview: canReview,
        reviews: eventReviews
    });
});


module.exports = router;