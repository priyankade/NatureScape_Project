const express = require("express");
const router = express.Router();
const validate = require('../validation')
const activitiesData = require('../data/activities');
const xss = require('xss');


router.get("/", async (req, res) => {
    console.log('[/]');
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
    res.render("display/homepage", {
        activities: activities,
        is_user_logged_in: is_user_logged_in
    });
});

// This route is for searching for an activity by name.
router.get('/search/:activityName', async (req, res) => {
    console.log('[search]', req.params.activityName);
    let sTitle = xss(req.params.activityName);
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
    console.log('[addActivity]');
    if (req.session.user) {
        res.render('display/addActivity');
        return;
    }
    else {
        errormessage = {
            className: "User not logged in",
            message: "User needs to log in to create activity",
            hasErrors: "Error",
            title: "Error"
        }
        res.status(401).render('display/error', errormessage);
        return;
    }
});

router.post('/createActivity', async (req, res) => {
    console.log('[createActivity]');
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
        res.status(200).send("Successfully inserted activity");
    }

});

//This route is for going to indivdual activity's page
router.get("/:activityName", async (req, res) => {
    let activityName = req.params.activityName;
    let activityTable = {};
    try {
        let db_result = await activitiesData.getActivityByName(activityName);
        console.log(db_result);
        for (let i = 0; i < db_result.length; i++) {
            activityTable[i] = {};
            let actName= db_result[i].activityName;
            let location = db_result[i].location;
            let city = db_result[i].city;
            let state = db_result[i].state;
            let date = db_result[i].date;
            let organizer = db_result[i].organizer;
            let expertise = db_result[i].expertise;
            let price = db_result[i].price;
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

    res.render("display/activityTable", { activityTable: activityTable, activity: "activityTable" });
});


module.exports = router;