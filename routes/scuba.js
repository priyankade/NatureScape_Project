const express = require("express");
const router = express.Router();
const validation = require('../validation')
const scubaData = require('../data/scuba');

router.get("/", async (req, res) => {
    let scuba = {};
    try {
        let db_result = await scubaData.getAllScuba();
        //TODO check db_result is valid
        // if error in result, render error page and return

        //console.log(db_result);

        for (let i = 0; i < db_result.length; i++) {
            scuba[i] = {};
            let location = db_result[i].location;
            let city = db_result[i].city;
            let state = db_result[i].state;
            let date = db_result[i].date;
            let organizer = db_result[i].organizer;
            let expertise = db_result[i].expertise;
            let price = db_result[i].price;
            scuba[i]['location'] = location;
            scuba[i]['city'] = city;
            scuba[i]['state'] = state;
            scuba[i]['date'] = date;
            scuba[i]['organizer'] = organizer;
            scuba[i]['expertise'] = expertise;
            scuba[i]['price'] = price;
        }
    } catch (e) {
        errormessage = {
            className: "Could not get scuba activities",
            message: `No scuba activities found`,
            hasErrors: "Error"
        };
        res.status(404).render('display/error', errormessage);
        return;
    }

    //console.log(scuba)

    //res.render("display/activityTable", { activityTable: scuba, activity: "s=Scuba" });
    res.render("display/scuba", { scuba: scuba, activity: "Scuba Diving" });
    
});



module.exports = router;