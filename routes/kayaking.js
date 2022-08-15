const express = require("express");
const router = express.Router();
const validate = require('../validation')
const activityTableData = require('../data/activityTable');



router.get("/", async (req, res) => {
    let kayaking = {};
    try {
        let db_result = await activityTableData.getAllActivityTable();
        //TODO check db_result is valid
        // if error in result, render error page and return

        //console.log(db_result);

        for (let i = 0; i < db_result.length; i++) {
            kayaking[i] = {};
            let location = db_result[i].location;
            let city = db_result[i].city;
            let state = db_result[i].state;
            let date = db_result[i].date;
            let organizer = db_result[i].organizer;
            let expertise = db_result[i].expertise;
            let price = db_result[i].price;
            kayaking[i]['location'] = location;
            kayaking[i]['city'] = city;
            kayaking[i]['state'] = state;
            kayaking[i]['date'] = date;
            kayaking[i]['organizer'] = organizer;
            kayaking[i]['expertise'] = expertise;
            kayaking[i]['price'] = price;
        }
    } catch (e) {
        errormessage = {
            className: "Could not get kayaking activities",
            message: `No kayaking activities found`,
            hasErrors: "Error"
        };
        res.status(404).render('display/error', errormessage);
        return;
    }

    res.render("display/activityTable", { activityTable: kayaking, activity: "Kayaking" });
});



module.exports = router;