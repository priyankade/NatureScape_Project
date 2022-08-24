const express = require("express");
const router = express.Router();
const validate = require('../validation')
const activitiesTableData = require('../data/activityTable');
const eventsData = require('../data/individualevent');
const reviewsData = require('../data/reviews');
const xss = require('xss');
const userData = require('../data/users');

router.post('/addEvent', async (req, res) => {
    console.log('POST [addEvent]');
    if (req.session.user) {
        res.render('display/addEvent', {
            activityName: req.body.activityName,
            organizerEmail: req.body.organizerEmail,
            organizerUsername: req.session.user
        });
        return;
    }
    else {
        errormessage = {
            className: "User not logged in",
            message: "User needs to log in to create Event",
            hasErrors: "Error",
            showLoginLink: true,
            title: "Error"
        }
        res.status(401).render('display/error', errormessage);
        return;
    }
});

router.post('/createEvent', async (req, res) => {
    console.log('POST [createEvent]');
    if (req.session.user) {
        try {
            let activityName = xss(req.body.activityName);
            let validatedActivity = validate.checkActivity(activityName);
            let overview = xss(req.body.overview);
            let validatedOverview = validate.checkDescription(overview);
            let EventLocation = xss(req.body.location);
            let validatedLocation = validate.checkStringWithSpaces(EventLocation, "location");
            let EventCity = xss(req.body.city);
            let validatedCity = validate.checkStringWithSpaces(EventCity, "city");
            let EventState = xss(req.body.state);
            let validatedState = validate.checkState(EventState, "state");
            let EventDate = xss(req.body.date);
            let validatedDate = validate.checkDateforFutureActivities(EventDate, "date");
            let EventOrganizer = xss(req.body.organizer);
            let validatedOrganizer = validate.checkStringWithSpaces(EventOrganizer, "organizer");
            let EventExpertise = xss(req.body.expertise);
            let validatedExpertise = validate.checkExpertise(EventExpertise, "expertise");
            let EventPrice = xss(req.body.price);
            let validatedPrice = validate.checkIsProperNumber(EventPrice, "price");

            //FAQ
            let question1 = xss(req.body.question1);
            let validatedQuestion1 = validate.checkStringWithSpaces(question1, "question1");
            let answer1 = xss(req.body.answer1);
            let validatedAnswer1 = validate.checkStringWithSpaces(answer1, "answer1");
            let question2 = xss(req.body.question2);
            let validatedQuestion2 = validate.checkStringWithSpaces(question2, "question2");
            let answer2 = xss(req.body.answer2);
            let validatedAnswer2 = validate.checkStringWithSpaces(answer2, "answer2");
            //adding organizer email to event
            let username = req.session.user;
            let userDetails = await userData.getUserByUsername(username);
            let organizerEmail = userDetails.email;
            validate.checkEmail(organizerEmail);

            let checkdup = await validate.checkDuplicateEvent(
                validatedActivity,
                validatedOverview,
                validatedLocation,
                validatedCity,
                validatedState,
                validatedDate,
                validatedOrganizer,
                organizerEmail,
                validatedExpertise,
                validatedPrice);
            if ("hasErrors" in checkdup) {
                throw 'Event already exists';
            }

            const faq1 = {};
            const faq2 = {};
            let arr = [];

            faq1['question'] = validatedQuestion1;
            faq1['answer'] = validatedAnswer1;
            faq2['question'] = validatedQuestion2;
            faq2['answer'] = validatedAnswer2;

            arr.push(faq1, faq2);
            let checkEventCreated = await activitiesTableData.createactivityTable(
                validatedActivity,
                validatedOverview,
                validatedLocation,
                validatedCity,
                validatedState,
                validatedDate,
                validatedOrganizer,
                organizerEmail,
                validatedExpertise,
                validatedPrice,
                arr);

            if ("hasErrors" in checkEventCreated) {
                errormessage = {
                    className: "Could not add Event",
                    message: "could not add Event",
                    hasErrors: "True",
                    title: "Error"
                }
                res.status(400).render("display/error", errormessage);
                return;
            }
            res.status(200).render("display/success", { "message": "Successfully inserted Event" });
        }
        catch (error) {
            console.log(error);
            errormessage = {
                className: "Unable to add Event",
                message: error,
                hasErrors: "Error",
                title: "Error"
            }
            res.status(400).render("display/error", errormessage);
            return;
        }
    }
    else {
        errormessage = {
            className: "User not logged in",
            message: "User needs to log in to create Event",
            hasErrors: "Error",
            showLoginLink: true,
            title: "Error"
        }
        res.status(401).render('display/error', errormessage);
        return;
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
            if (username === searchResult.registeredMembers[i]) {
                isUserRegistered = true;
                break;
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

    /* A user can register for an event if
        1. User has not registered for the event
        2. Event is in the future
     */
    let showRegisterButton = !isUserRegistered && eventDate >= today;

    res.render('display/eventpage', {
        event: searchResult,
        showRegisterButton: showRegisterButton,
        canReview: canReview,
        reviews: eventReviews
    });
});


router.get('/:eventId/deleteEvent', async (req, res) => {
    console.log('GET [/deleteEvent]');
    if (req.session.user != "admin") {
        res.status(200).render('display/success', { "message": "User needs to be admin to delete event" });
        return;
    }
});

router.post('/:eventId/deleteEvent', async (req, res) => {
    console.log('POST [/deleteEvent]');
    if (req.session.user === "admin") {
        let eventId = xss(req.params.eventId);
        try {
            eventId = validate.checkId(eventId);
        }
        catch (error) {
            errormessage = {
                className: "eventId not supplied",
                message: "Invalid eventId",
                hasErrors: "Error",
                title: "Error"
            }
            res.status(401).render('display/error', errormessage);
            return;
        }
        checkEventDeleted = await activitiesTableData.deleteEvent(eventId);

        if (checkEventDeleted === false) {
            errormessage = {
                className: "Could not delete activity",
                message: "could not delete activity",
                hasErrors: "True",
                title: "Error"
            }
            res.status(400).render('display/error', "could not delete activity");
            return;
        }
        res.status(200).render('display/success', { "message": "Successfully deleted event" });
    }

});


module.exports = router;