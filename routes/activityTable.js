const express = require("express");
const router = express.Router();
const validation = require('../validation')
const activityTableData = require('../data/activityTable');
const activities = require('../data/activities');

router.get("/", async (req, res) => {
    console.log(req.params)
    let activityName = req.params.activityName;
    let activityTable = {};
    try {
        let db_result = await activities.getActivityByName(activityName);
        //TODO check db_result is valid
        // if error in result, render error page and return

        //console.log(db_result);

        for (let i = 0; i < db_result.length; i++) {
            activityTable[i] = {};
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

    //console.log(activityTable)

    //res.render("display/activityTable", { activityTable: activityTable, activity: "activityTable", activityName: "activityTable" });
    res.render("display/activityTable", { activityTable: activityTable, activity: "activityTable" });
});



module.exports = router;