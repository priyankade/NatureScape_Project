const express = require("express");
const router = express.Router();
const validation = require('../validation')
const activityTableData = require('../data/activityTable');



router.get("/", async (req, res) => {
    let hiking = {};
    try {
        let db_result = await activityTableData.getAllActivityTable();
        //TODO check db_result is valid
        // if error in result, render error page and return

        //console.log(db_result);

        for (let i = 0; i < db_result.length; i++) {
            hiking[i] = {};
            let location = db_result[i].location;
            let city = db_result[i].city;
            let state = db_result[i].state;
            let date = db_result[i].date;
            let organizer = db_result[i].organizer;
            let expertise = db_result[i].expertise;
            let price = db_result[i].price;
            hiking[i]['location'] = location;
            hiking[i]['city'] = city;
            hiking[i]['state'] = state;
            hiking[i]['date'] = date;
            hiking[i]['organizer'] = organizer;
            hiking[i]['expertise'] = expertise;
            hiking[i]['price'] = price;
        }
    } catch (e) {
        errormessage = {
            className: "Could not get hiking activities",
            message: `No hiking activities found`,
            hasErrors: "Error"
        };
        res.status(404).render('display/error', errormessage);
        return;
    }

    res.render("display/hiking", { hiking: hiking, activity: "Hiking" });
});



module.exports = router;