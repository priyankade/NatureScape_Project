const express = require("express");
const router = express.Router();
const validate = require('../validation')
const activitiesTableData = require('../data/activityTable');
const eventsData = require('../data/individualevent');
const reviewsData = require('../data/reviews');
const xss = require('xss');

router.get('/addEvent', async (req, res) => {
    console.log('[addEvent]');
    if (req.session.user) {
        res.render('display/addEvent');
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
    console.log('[createEvent]');
    if (req.session.user) {
        try {
            let activityName = xss(req.body.activityName);
            var validatedActivity = validate.checkActivity(activityName);
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

            let checkdup = await validate.checkDuplicateEvent(validatedActivity, validatedLocation, validatedCity, validatedState, validatedDate, validatedOrganizer, validatedExpertise, validatedPrice);
            if ("hasErrors" in checkdup) {
                throw 'Event already exists';
            }
        }
        catch (error) {
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
                title: "Create Event",
                error: error,
            });
            return;
        }
        checkEventCreated = activitiesTableData.createactivityTable(validatedActivity, validatedLocation, validatedCity, validatedState, validatedDate, validatedOrganizer, validatedExpertise, validatedPrice);
        if ("hasErrors" in checkEventCreated) {
            errormessage = {
                className: "Could not add Event",
                message: "could not add Event",
                hasErrors: "True",
                title: "Error"
            }
            res.status(400).render("display/addEvent", {
                location: req.body.location,
                city: req.body.city,
                state: req.body.state,
                date: req.body.date,
                organizer: req.body.organizer,
                expertise: req.body.expertise,
                price: req.body.price,
                title: "Create Event",
                error: errormessage,
            });

            // res.status(400).render('display/error', "could not add Event");
            return;
        }
        res.status(200).send("Successfully inserted Event");
        //res.status(200).redirect(`/activityName`);
        //res.status(200).render("display/activityTable");

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
    let isUserRegistered = true;
    if (!('registeredMembers' in searchResult) || !(username in searchResult.registeredMembers)) {
        isUserRegistered = false;
    }
    console.log(searchResult.registeredMembers);
    console.log(searchid);
    //query all reviews for this event
    let eventReviews = await reviewsData.getAllReviewsForEvent(searchid);

    let eventDetails = await activitiesTableData.getActivityTableById(searchid);
    
    let today = new Date();
    console.log('eventDetails.date', eventDetails.date, ' date today', today);
    let eventDate = new Date(eventDetails.date);
    
    /* A user can review only if 
        1. Event date has passed
        2. User had registered for the event
    */
    let canReview = false;
    if (eventDate < today)
        for (i = 0; i < eventDetails.registeredMembers.length; i++) {
            if (eventDetails.registeredMembers[i] == username) {
                canReview = true;
            }
        }
    console.log('review', eventReviews[0]);


    res.render('display/eventpage', {
        event: searchResult,
        isUserRegistered: isUserRegistered,
        canReview: canReview,
        reviews: eventReviews
    });
});


module.exports = router;