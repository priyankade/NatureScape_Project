const express = require("express");
const router = express.Router();
const validate = require('../validation')
const activitiesTableData = require('../data/activityTable');
const eventData = require('../data/individualevent');
const xss = require('xss');

router.get('/addEvent', async (req, res) => {
    console.log('[addEvent]');
    if (req.session.user) {
        res.render('display/addEvent', {activityName: req.params.activityName});
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
            var validatedQuestion1 = validate.checkDescription(question1, "question1");
            let answer1 = xss(req.body.answer1);
            var validatedAnswer1 = validate.checkDescription(answer1, "answer1");
            let question2 = xss(req.body.question2);
            var validatedQuestion2 = validate.checkDescription(question2, "question2");
            let answer2 = xss(req.body.answer2);
            var validatedAnswer2 = validate.checkDescription(answer2, "answer2");


            


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

        faq1[validatedQuestion1] = validatedAnswer1;
        faq2[validatedQuestion2] = validatedAnswer2;

        arr.push(faq1, faq2);

        checkEventCreated = await activitiesTableData.createactivityTable(validatedActivity, validatedOverview, validatedLocation, validatedCity, validatedState, validatedDate, validatedOrganizer, validatedExpertise, validatedPrice, arr );
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

            // res.status(400).render('display/error', "could not add Event");
            return;
        }
        res.status(200).send("Successfully inserted Event");
        //res.status(200).redirect(`/activityName`);
        //res.status(200).render("display/activityTable");

    }

});

module.exports = router;