const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  //console.log(req.session)
  res.render("display/private", {username: req.session.user, title: "Private"});
});

module.exports = router;