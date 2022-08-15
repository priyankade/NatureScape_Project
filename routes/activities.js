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

// This route is for adding activity on clicking a button. The route can be /addActivity
router.get('/search/:activityName', async (req, res) => {

    // const searchTitle = req.body.title.trim();
    console.log(req.params.activityName);
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
    console.log('activityDetails in routes' + searchResult.activityName);
    console.log('activityDetails in routes' + searchResult.activityDesc);
    if (!searchResult) {
        res.status(400).render("No search item was supplied, directly submit button was clicked or blank spaces were provided.");
    }
    res.render('display/homepage', { activities: searchResult });

    // let url = 'https://api.tvmaze.com/search/shows?q=' + searchTitle;
    // try {
    //     //console.log('Sending http request', url);
    //     const showsResponse = await axios.get(url);
    //     const shows = showsResponse.data;
    //     if (shows.length > 10) {
    //         shows = shows.slice(0, 10);
    //     }
    //     res.render("tvmaze/search", {title: "Shows Found", shows: shows, searchTitle: searchTitle });
    // }

    // catch (e) {
    //     res.status(400).render("No search item was supplied, directly submit button was clicked or blank spaces were provided.");
    // }
});



module.exports = router;