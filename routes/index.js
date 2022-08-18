const userRoutes = require("./users");
const privateRoutes = require('./private');
const homeRoutes = require("./activities");
<<<<<<< HEAD
=======

const hikingRoutes = require("./hiking")
const kayakingRoutes = require("./kayaking")

>>>>>>> 05252398c669cf3a241b1cee869b605450c46df3
// const reviewsRoute = require("./reviews");

const constructorMethod = (app) => {
  app.use("/users", userRoutes);
  app.use('/private', privateRoutes);
  app.use('/hiking', hikingRoutes);
  app.use('/kayaking', kayakingRoutes);

  // app.use("/Hiking", (req, res) => {
  //   res.render("display/activityTable");
  // });

//   app.use("/reviews", reviewsRoute);
  app.use(" ", homeRoutes);
  app.use("/",homeRoutes);
  app.use("/search",homeRoutes);
  app.use("/addActivity",homeRoutes);
  app.use("/login",userRoutes);
  app.use("/signup",userRoutes);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "this route is not being used" });
  });
};

module.exports = constructorMethod;