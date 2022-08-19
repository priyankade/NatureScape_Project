const express = require("express");
const router = express.Router();
const data = require("../data");
const usersData = data.users;
const validation = require('../validation');

router.get("/login", async (req, res) => {
    if (req.session.user)
        res.redirect("/private");
    else {
        try {
            //res.render("display/login-form", {username: req.body.username, password: req.body.password, title: "Login"});
            res.render("display/login-form", { title: "Login" });
        } catch (e) {
            res.status(400).render("display/login-form", { username: req.body.username, title: "Login", error: e });
        }
    }

});

router.post('/login', async (req, res) => {
    if (!req.session.user) {

        try {

            if (!req.body.username || !req.body.password)
                throw "Please supply both the fields";

            let { username, password } = req.body;

            validation.checkString(username, 'username');
            validation.checkPassword(password, 'password');
            validation.alphanumeric(username);
            /*get req.body username and password
              const { username, password } = req.body;
              here, you would get the user from the db based on the username, then you would read the hashed pw
              and then compare it to the pw in the req.body
              let match = bcrypt.compare(password, 'HASHED_PW_FROM DB');
              if they match then set req.session.user and then redirect them to the private page
               I will just do that here */

            username = username.trim().toLowerCase();
            password = password.trim();

            const verify = await usersData.checkUser(username, password);

            if (verify.authenticated) {
                req.session.user = username;
                req.session.name = "AuthCookie";
                res.redirect("/private");
            } else {
                return res.status(400).render("display/login-form", {
                    username: req.body.username,
                    password: req.body.password,
                    title: "Login",
                    error: "Invalid Username and/or password",
                });
            }
        }
        catch (e) {
            res.status(400).render("display/login-form", {
                username: req.body.username,
                password: req.body.password,
                title: "Login",
                error: e,
            });
        }
    } else {
        res.redirect("/private", { username: req.body.username });
    }
});

router.get("/signup", async (req, res) => {
    if (!req.session.user) {
        try {
            res.render("display/signup-form", { title: "Signup" });
        } catch (e) {

            res.status(400).render("display/signup-form", {

                fname: req.body.fname,
                lname: req.body.lname,
                username: req.body.username,
                gender: req.body.gender,
                email: req.body.email,
                phone: req.body.phone,
                emer_phone: req.body.emer_phone,
                password: req.body.password,
                title: "Signup",
                error: e,
            });
        }
    } else {
        res.redirect("/private", { fname: req.body.fname, lname: req.body.lname, username: req.body.username }, { title: "Private" });
    }
});

router.post('/signup', async (req, res) => {
    if (!req.session.user) {
        try {

            if (!req.body.fname || !req.body.lname || !req.body.username || !req.body.gender
                || !req.body.email || !req.body.phone || !req.body.emer_phone || !req.body.password || !req.body.confirmPassword)
                throw "Please supply all the required fields";

            let { fname, lname, username, gender, dob, email, phone, emer_phone, password, confirmPassword } = req.body;

            //=========start validations================
            await validation.checkString(fname, 'First Name');
            await validation.checkString(lname, 'Last Name');
            await validation.alphanumeric(username);
            await validation.checkGender(gender);
            await validation.checkDate(dob, 'dob');
            await validation.checkEmail(email);
            await validation.checkPhone(phone, 'phone');
            await validation.checkPhone(emer_phone, 'emergency phone');
            if (phone === emer_phone) {
                throw 'Error: Please provide different phone number for Emergency'
            }
            await validation.checkPassword(password, 'password');
            await validation.checkPassword(confirmPassword, 'confirmPassword');

            if (password != confirmPassword) {
                throw "\nPassword did not match: Please try again...";
            }

            //=========end validations================

            let userInserted = await data.users.createUser(fname, lname, username, gender, dob, email, phone, emer_phone, password, confirmPassword);
            //console.log("userInserted is " , userInserted)

            if (userInserted._id != null) {
                res.redirect("/users/login");
            }
            else {
                return res.status(500).render("display/signup-form", { title: "Signup", error: "Internal Server Error" });
            }
        } catch (e) {
            res.status(400).render("display/signup-form", {
                fname: req.body.fname,
                lname: req.body.lname,
                username: req.body.username,
                gender: req.body.gender,
                dob: req.body.dob,
                email: req.body.email,
                phone: req.body.phone,
                emer_phone: req.body.emer_phone,

                title: "Signup",
                error: e,
            });
        }
    }

    else {
        res.redirect("/private", { username: req.body.username }, { title: "Private" });
    }

});

router.get('/logout', async (req, res) => {
    if (!req.session.user) {
        return res.redirect('/users/login');
    } else {
        // req.session.destroy();
        // res.json({route: '/', method: req.method});
        // res.send('Logged out');
        try {
            req.session.destroy();
            res.render("display/logout", { title: "Logout" });
        } catch (e) {
            res.status(500).redirect("/users/login");
        }
    }

});

router.get("/profile", (req, res) => {
    res.render("display/profile", {});
});

router.post("/profile", (req, res) => {
    res.render("display/profile", {});
});

module.exports = router;