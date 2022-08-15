const userRoutes = require("./users");
const privateRoutes = require('./private');
const homeRoutes = require("./activities");
const hikingRoutes = require("./hiking")
// const reviewsRoute = require("./reviews");

const constructorMethod = (app) => {
  app.use("/users", userRoutes);
  app.use('/private', privateRoutes);
  app.use('/hiking', hikingRoutes);

  // app.use("/Hiking", (req, res) => {
  //   res.render("display/activityTable");
  // });

//   app.use("/reviews", reviewsRoute);
  app.use(" ", homeRoutes);
  app.use("/",homeRoutes);
  app.use("/search",homeRoutes);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "this route is not being used" });
  });
};

module.exports = constructorMethod;