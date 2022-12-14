const express = require("express");
const router = express.Router();
const validate = require('../validation')
const activitiesData = require('../data/activities');
const activitiesTableData = require('../data/activityTable');
const eventsData = require('../data/individualevent');
const userData = require('../data/users');
const xss = require('xss');

router.post('/register', async (req, res) => {
    console.log('POST [/REGISTER]');
    let eventId = xss(req.body.eventId);
    let username = xss(req.session.user);
    let oldEvent = {};

    try {
        validate.checkId(eventId);
        validate.alphanumeric(username);
    } catch (error) {
        res.status(401).render('display/error', error);
        return;
    }
    let { ObjectId } = require('mongodb');
    let parsedId = ObjectId(eventId);
    
    try {
        oldEvent = await eventsData.getEventById(parsedId.toString());
    } catch (error) {
        errormessage = {
            className: "Cannot register User",
            message: error,
            hasErrors: "Error",
            title: "Error"
        };
        res.status(401).render('display/error', errormessage);
        return;
    }

    try {
        if (oldEvent.registeredMembers) {
            for (i = 0; i < oldEvent.registeredMembers.length; i++) {
                if (username == oldEvent.registeredMembers[i]) {
                    throw 'Member already registered'
                }
            }
        }
    } catch (error) {
        errormessage = {
            className: "Cannot register User",
            message: error,
            hasErrors: "Error",
            title: "Error"
        };
        res.status(401).render('display/error', errormessage);
        return;
    }
    try {
        eventsData.updateRegisteredMembers(eventId, req.session.user);
    } catch (error) {
        errormessage = {
            className: "Cannot register User",
            message: error,
            hasErrors: "Error",
            title: "Error"
        };
        res.status(401).render('display/error', errormessage);
        return;
    }

    //find activityName from events table
    eventActivityName= oldEvent.activityName;
    eventDate= oldEvent.date;
    //find eventDate from events table

    try {
        userData.userActivity(req.session.user, eventActivityName, eventDate);
    } catch (error) {
        errormessage = {
            className: "Cannot insert details in UserActivity Table",
            message: error,
            hasErrors: "Error",
            title: "Error"
        };
        res.status(401).render('display/error', errormessage);
        return;
    }
    res.status(200).render('display/success', { "message": "Successfully registered for event" });
});

router.get("/", async (req, res) => {
    console.log('GET [/]');
    let activities = {};
    try {
        let db_result = await activitiesData.getAllActivities();
        //TODO check db_result is valid
        // if error in result, render error page and return

        for (let i = 0; i < db_result.length; i++) {
            activities[i] = {};
            let name = db_result[i].activityName;
            let description = db_result[i].activityDesc;
            activities[i]['activityName'] = name;
            activities[i]['activityDesc'] = description;
        }
    } catch (e) {
        errormessage = {
            className: "Could not get activities",
            message: `No activities found`,
            hasErrors: "Error"
        };
        res.status(404).render('display/error', errormessage);
        return;
    }
    let is_user_logged_in = false;
    if (req.session.user)
        is_user_logged_in = true;

    let isAdmin = false;
    //console.log(req.session.user)
    if (req.session.user === "admin") {
        isAdmin = true;
    }
    //console.log(isAdmin)


    res.render("display/homepage", {
        activities: activities,
        is_user_logged_in: is_user_logged_in,
        isAdmin: isAdmin
    });
});

// This route is for searching for an activity by name.
router.get('/search/:activityName', async (req, res) => {
    let sTitle = xss(req.params.activityName);
    console.log(`GET [/search/${req.params.activityName}]`);
    const searchTitle = sTitle.toLowerCase();
    let validatedSearchActivity = "";
    try {
        validatedSearchActivity = validate.checkActivity(searchTitle);
    } catch (error) {
        errormessage = {
            className: "No search item supplied",
            message: "No search item was supplied, directly Search button was clicked.",
            hasErrors: "Error",
            title: "Error"
        }
        res.status(400).render("display/error", errormessage);
        return;
    }
    searchResult = await activitiesData.getActivityByName(validatedSearchActivity);
    if ("hasErrors" in searchResult) {
        res.status(400).render('display/error', errormessage);
        return;
    }
    let is_user_logged_in = false;
    if (req.session.user) is_user_logged_in = true;
    res.render('display/homepage', {
        activities: searchResult,
        is_user_logged_in: is_user_logged_in
    });
});

router.get('/addActivity', async (req, res) => {
    console.log('GET [/addActivity]');
    if (req.session.user) {
        res.render('display/addActivity');
        return;
    }
    else {
        errormessage = {
            className: "User not logged in",
            message: "User needs to log in to create activity",
            hasErrors: "Error",
            showLoginLink: true,
            title: "Error"
        }
        res.status(401).render('display/error', errormessage);
        return;
    }
});

router.post('/createActivity', async (req, res) => {
    console.log('POST [/createActivity]');
    if (req.session.user) {
        try {
            let activityName = xss(req.body.activityName);
            var validatedActivity = validate.checkActivity(activityName);
            let activityDesc = xss(req.body.activityDescription);
            var validatedDesc = validate.checkDescription(activityDesc);
            let checkdup = await validate.checkDuplicateActivity(validatedActivity);
            if ("hasErrors" in checkdup) {
                throw 'Activity already exists';
            }
        }
        catch (error) {
            errormessage = {
                className: "Cannot add activity",
                message: error,
                hasErrors: "Error",
                title: "Error"
            }
            res.status(400).render('display/error', errormessage);
            return;
        }
        checkActivityCreated = activitiesData.createActivity(validatedActivity, validatedDesc);
        if ("hasErrors" in checkActivityCreated) {
            errormessage = {
                className: "Could not add activity",
                message: "could not add activity",
                hasErrors: "True",
                title: "Error"
            }
            res.status(400).render('display/error', "could not add activity");
            return;
        }
        res.status(200).render('display/success', { "message": "Successfully inserted activity" });
    }
});

router.get('/:activityName/deleteActivity', async (req, res) => {
    console.log('GET [/deleteActivity]');
    if (req.session.user != "admin") {
        res.status(200).render('display/success', { "message": "User needs to be admin to delete activity" });
        return;
    }
});

router.post('/:activityName/deleteActivity', async (req, res) => {
    console.log('POST [/deleteActivity]');
    if (req.session.user === "admin") {
        let activityName = xss(req.params.activityName);
        let validatedactivityName = '';
        try {
            validatedactivityName = validate.checkActivity(activityName);
        }
        catch (error) {
            errormessage = {
                className: "Activity name not supplied",
                message: "Invalid activity name",
                hasErrors: "Error",
                title: "Error"
            }
            res.status(401).render('display/error', errormessage);
            return;
        }
        checkActivityDeleted = activitiesData.deleteActivity(validatedactivityName);
        if (checkActivityDeleted === false) {
            errormessage = {
                className: "Could not delete activity",
                message: "could not delete activity",
                hasErrors: "True",
                title: "Error"
            }
            res.status(400).render('display/error', "could not delete activity");
            return;
        }
        res.status(200).render('display/success', { "message": "Successfully deleted activity" });
    }

});

//This route is for going to indivdual activity's page
router.get("/activity/:activityName", async (req, res) => {
    let activityName = xss(req.params.activityName);
    console.log(`GET [/activity/${activityName}]`);

    let activityTable = {};
    try {
        let db_result = await activitiesTableData.getActivityTableByName(activityName);
        for (let i = 0; i < db_result.length; i++) {
            activityTable[i] = {};
            let actName = db_result[i].activityName;
            let location = db_result[i].location;
            let city = db_result[i].city;
            let state = db_result[i].state;
            let date = db_result[i].date;
            let organizer = db_result[i].organizer;
            let expertise = db_result[i].expertise;
            let price = db_result[i].price;
            let id = db_result[i]._id;
            activityTable[i]['actName'] = actName;
            activityTable[i]['id'] = id;
            activityTable[i]['location'] = location;
            activityTable[i]['city'] = city;
            activityTable[i]['state'] = state;
            activityTable[i]['date'] = date;
            activityTable[i]['organizer'] = organizer;
            activityTable[i]['expertise'] = expertise;
            activityTable[i]['price'] = price;
        }
    } catch (e) {
        errormessage = {
            className: "Could not get activityTable activities",
            message: `No activityTable activities found`,
            hasErrors: "Error"
        };
        res.status(404).render('display/error', errormessage);
        return;
    }

    let isAdmin = false;
    //console.log(req.session.user)
    if (req.session.user === "admin") {
        isAdmin = true;
    }

    let username = req.session.user;
    let userDetails = {};
    let organizerEmail = '';
    if (username) {
        try {
            userDetails = await userData.getUserByUsername(username);
        } catch (error) {
            console.log('Error in fetching organizer email:', error);
        }
        organizerEmail = userDetails.email;
        try {
            validatedOrganizerEmail = validate.checkEmail(organizerEmail);
        } catch (error) {
            console.log('Error in validating organizer email:', error);
        }
    }
    res.render("display/activityTable", { activityTable: activityTable, activity: "activityTable", activityName: activityName, isAdmin: isAdmin, organizerEmail: organizerEmail });
});

module.exports = router;
