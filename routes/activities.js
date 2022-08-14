const express = require("express");
const router = express.Router();
const validate = require('../validation')
const activitiesData = require('../data/activities');



router.get("/", async (req, res) => {
    // console.log(req);
    let activities = {};
    try {
        let db_result = await activitiesData.getAllActivities();
        //TODO check db_result is valid
        // if error in result, render error page and return

        for (let i = 0; i < db_result.length; i++) {
            activities[i] = {};
            let name = db_result[i].activityName;
            let description = db_result[i].activityDesc;
            activities[i]['name'] = name;
            activities[i]['description'] = description;
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

// This route should be for adding activity on clicking a button. The route can be /addActivity
router.post("/", (req, res) => {
    res.render("display/homepage", {});
});

module.exports = router;