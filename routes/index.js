const userRoutes = require("./users");
const privateRoutes = require("./private");
const homeRoutes = require("./activities");
const eventRoutes = require("./events");

const constructorMethod = (app) => {
  app.use("/users", userRoutes);
  app.use("/private", privateRoutes);
  app.use("/", homeRoutes);
  app.use("/search", homeRoutes);
  app.use("/addActivity", homeRoutes);
  app.use("/login", userRoutes);
  app.use("/signup", userRoutes);
  //   app.use("/reviews", reviewsRoute);
  app.use("/activity", homeRoutes);
  app.use("/events",eventRoutes);
  app.use("/event", homeRoutes);

  app.use("*", (req, res) => {
    let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log(fullUrl);
    res.status(404).json({ error: "this route is not being used" });
  });
};

module.exports = constructorMethod;