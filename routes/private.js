const express = require('express');
const router = express.Router();
const data = require("../data");
const usersData = data.users;
const validation = require('../validation');

router.get('/', async (req, res) => {
	console.log('GET [/private/]');
	userFound = await usersData.getUserByUsername(req.session.user);
	if (userFound) {
		res.render("display/private", { username: req.session.user, firstname: userFound.fname, lastname: userFound.lname, title: "Private" });
	}
});

router.get('/profile', async (req, res) => {
	console.log('GET [/private/profile]');
	userFound = await usersData.getUserByUsername(req.session.user);
	if (userFound) {
		res.render("display/profile",
			{
				username: req.session.user,
				firstname: userFound.fname,
				lastname: userFound.lname,
				gender: userFound.gender,
				dob: userFound.dob,
				email: userFound.email,
				contact: userFound.phone,
				emergency: userFound.emer_phone,
				activities: userFound.activities,
				title: "Private"
			});
	}
	else {
		console.log('User not found.');
	}
});

module.exports = router;