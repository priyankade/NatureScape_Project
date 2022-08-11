const userRoutes = require("./users");
// const reviewsRoute = require("./reviews");

const constructorMethod = (app) => {
  app.use("/users", userRoutes);
//   app.use("/reviews", reviewsRoute);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "this route is not being used" });
  });
};

module.exports = constructorMethod;