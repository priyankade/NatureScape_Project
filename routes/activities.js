const express = require("express");
const router = express.Router();
const validate = require('../validation')
const activitiesData = require('../data/activities');



router.get("/", async (req, res) => {
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
    res.render("display/homepage", { activities: activities });
});

// This route is for searching for an activity by name.
router.get('/search/:activityName', async (req, res) => {
    searchTitle = req.params.activityName;
    if (!searchTitle || searchTitle == null || typeof searchTitle !== 'string') {
        errormessage = {
            className: "No search item supplied",
            message: "No search item was supplied, directly Search button was clicked.",
            hasErrors: "Error",
            title: "Error"
        }
        res.status(400).render("display/error", errormessage);
        return;
    }

    searchResult = await activitiesData.getActivityByName(searchTitle);
    if (!searchResult) {
        res.status(400).render("No search item was supplied, directly submit button was clicked or blank spaces were provided.");
    }
    res.render('display/homepage', { activities: searchResult });
});



module.exports = router;