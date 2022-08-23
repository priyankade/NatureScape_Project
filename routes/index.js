const userRoutes = require("./users");
const privateRoutes = require("./private");
const homeRoutes = require("./activities");
const eventRoutes = require("./events");
const reviewRoutes = require("./reviews");
const reportRoutes = require("./reports");

const constructorMethod = (app) => {
    app.use("/report", eventRoutes);
    app.use("/register", homeRoutes);
    app.use("/users", userRoutes);
    app.use("/private", privateRoutes);
    app.use("/", homeRoutes);
    app.use("/search", homeRoutes);
    app.use("/addActivity", homeRoutes);
    app.use("/deleteActivity", homeRoutes);
    app.use("/login", userRoutes);
    app.use("/signup", userRoutes);
    app.use("/activity", homeRoutes);
    app.use("/events", eventRoutes);
    app.use("/event", eventRoutes);
    app.use("/reports", reportRoutes);
    app.use("/addReview", reviewRoutes);

    app.use("*", (req, res) => {
        let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        console.log(fullUrl);
        res.status(404).json({ error: "this route is not being used" });
    });
};

module.exports = constructorMethod;