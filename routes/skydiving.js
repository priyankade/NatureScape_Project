const express = require("express");
const router = express.Router();
const validation = require('../validation')
const skydivingData = require('../data/skydiving');

router.get("/", async (req, res) => {
    let skydiving = {};
    try {
        let db_result = await skydivingData.getAllSkydiving();
        //TODO check db_result is valid
        // if error in result, render error page and return

        //console.log(db_result);

        for (let i = 0; i < db_result.length; i++) {
            skydiving[i] = {};
            let location = db_result[i].location;
            let city = db_result[i].city;
            let state = db_result[i].state;
            let date = db_result[i].date;
            let organizer = db_result[i].organizer;
            let expertise = db_result[i].expertise;
            let price = db_result[i].price;
            skydiving[i]['location'] = location;
            skydiving[i]['city'] = city;
            skydiving[i]['state'] = state;
            skydiving[i]['date'] = date;
            skydiving[i]['organizer'] = organizer;
            skydiving[i]['expertise'] = expertise;
            skydiving[i]['price'] = price;
        }
    } catch (e) {
        errormessage = {
            className: "Could not get skydiving activities",
            message: `No skydiving activities found`,
            hasErrors: "Error"
        };
        res.status(404).render('display/error', errormessage);
        return;
    }

    //console.log(skydiving)

    //res.render("display/activityTable", { activityTable: skydiving, activity: "Skydiving" });
    res.render("display/skydiving", { skydiving: skydiving, activity: "Skydiving Diving" });
});



module.exports = router;