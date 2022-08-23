const express = require('express');
const app = express();
const static = express.static(__dirname + '/public');
const configRoutes = require('./routes');
const exphbs = require('express-handlebars');

const session = require('express-session');
const bp = require('body-parser')

//Required to parse the {body}
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

//For CSS files
app.use(express.static(__dirname + '/public'));

app.use(express.json());
const bcrypt = require('bcryptjs');

const handlebarsInstance = exphbs.create({
    defaultLayout: 'main',
    // Specify helpers which are only registered on this instance.
    helpers: {
        asJSON: (obj, spacing) => {
            if (typeof spacing === 'number')
                return new Handlebars.SafeString(JSON.stringify(obj, null, spacing));

            return new Handlebars.SafeString(JSON.stringify(obj));
        },

        urlEncode: (val) => {
            return encodeURIComponent(val);
        }
    },
    partialsDir: ['views/partials/']
});

const rewriteUnsupportedBrowserMethods = (req, res, next) => {
    // If the user posts to the server with a property called _method, rewrite the request's method
    // To be that method; so if they post _method=PUT you can now allow browsers to POST to a route that gets
    // rewritten in this middleware to a PUT route
    if (req.body && req.body._method) {
        req.method = req.body._method;
        delete req.body._method;
    }

    // let the next middleware run:
    next();
};

app.use;
app.use('/public', static);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(rewriteUnsupportedBrowserMethods);

app.engine('handlebars', handlebarsInstance.engine);
app.set('view engine', 'handlebars');

app.use(
    session({
        name: 'AuthCookie',
        secret: "This is a secret.. shhh don't tell anyone",
        saveUninitialized: true,
        resave: false,
        cookie: { maxAge: 600000 }
    })
);

app.use('/private', (req, res, next) => {
    if (!req.session.user) {
        res.status(403).render("display/no-login", { username: req.body.username, password: req.body.password, title: "Not logged in" });
    } else {
        next();
    }
});

//dont see login page if they are already logged in. This is for logged in users
app.use('/users/login', (req, res, next) => {
    if (req.session.user) {
        return res.redirect('/private');
    } else {
        next();
    }
});

configRoutes(app);

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log('Your routes will be running on http://localhost:3000');
});