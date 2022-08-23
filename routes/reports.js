const express = require("express");
const router = express.Router();
const data = require("../data");
const validate = require('../validation')
const activitiesData = require('../data/activities');
const activitiesTableData = require('../data/activityTable');
const eventData = require('../data/individualevent');
const userData = require('../data/users');
const reportData = require('../data/reports');
//const eventData = data.events;
const users = require('../data/users');
const xss = require('xss');

router.get("/form", async (req, res) => {
  if (!req.session.user) {   
    return res.redirect('/');
  }
  try{
    const user = req.session.user;
    //const userLogin = await userData.getUserById(userId);
    console.log(req.query)
    const eventId = req.query.id;
    const event = await eventData.getEventById(eventId);
    res.render('reports/reportForm',{user,'reported-event':event.location, 'eventId': eventId});
  }catch(e){
    res.status(404).json({ error: e });
  }
});


router.post("/form", async (req, res) => {
  const username = req.session.user;
  const eventId= xss(req.body.eventId);
  const event = await eventData.getEventById(eventId);
    try
    {
        let reason = xss(req.body.reason);
        if(typeof reason == "string")
        {
          reason=[reason];
        }
        let report_added = await reportData.addReport(username, eventId, reason);
        res.render('reports/reportForm',{success:"Report successfully submitted!", username: username,'reported-event':event.location, 'eventId': eventId});
        return;
    }
    catch(e)
    {
      res.render('reports/reportForm',{message:e, username: username,'reported-event':event.location, 'eventId': eventId});
    } 
});

router.get("/:id", async (req, res) => {
  let id = xss(req.params.id);
    try {
      const report = await reportData.getReport(id);
      res.status(200).json(report);
    } catch (e) {
      res.status(404).json({ message: "Report not found" });
    }
  });

router.get("/", async (req, res) => {
  if (req.session && req.session.user) {
    let userLogin = await userData.getUserById(req.session.user);
    if (userLogin.Admin) {
      try {
        const reportList = await reportData.getAllReports();
        res.render('reports/reportList',{reportList,userLogin});
      } catch (error) {
        res.status(404).send(error);
      }
    }
    else
      res.redirect('/');
  }
  else
    res.redirect('/');
});

module.exports = router;

