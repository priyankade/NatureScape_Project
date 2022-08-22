const express = require("express");
const router = express.Router();
const validate = require('../validation')
const activitiesTableData = require('../data/activityTable');
const eventData = require('../data/individualevent');
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

router.post('/', async function (req, res) {
    console.log('[/REPORT]');
    const uid = req.session._id;
    const eventId= req.body.eventId;
    // const rid = xss(req.body.rid.trim());
    // const uid = xss(req.body.uid.trim());
    // const eventId = xss(req.body.eventId.trim());
    const parsedRid = ObjectId(rid);
    const parsedUid = ObjectId(uid);
    const parsedeventId = ObjectId(eventId)

    const deleted = await reviewData.updateReviewReport(rid, uid);
    const event = await eventData.geteventById(eventId);
    const allReviews = await reviewData.getAllReviewsOfevent(eventId);
    const numReviews = allReviews.length;
    event.rating = (event.rating / numReviews).toFixed(2);
    event.price = (event.price / numReviews).toFixed(2);
    event.distancedTables = ((event.distancedTables / numReviews) * 100).toFixed(2);
    event.maskedEmployees = ((event.maskedEmployees / numReviews) * 100).toFixed(2);
    event.noTouchPayment = ((event.noTouchPayment / numReviews) * 100).toFixed(2);
    event.outdoorSeating = ((event.outdoorSeating / numReviews) * 100).toFixed(2);
    res.status(200).json({
        success: true,
        deleted: deleted,
        event: event
    });
});

module.exports = router;