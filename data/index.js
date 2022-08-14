const userRoutes = require("./users");
const homeRoutes = require("./activities")
// const reviewsRoute = require("./reviews");

module.exports = {
  users: userRoutes,
  activities: homeRoutes
};