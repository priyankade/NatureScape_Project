const userRoutes = require("./users");
const homeRoutes = require("./activities")
const activityTableRoutes = require("./activityTable")
// const reviewsRoute = require("./reviews");

module.exports = {
  users: userRoutes,
  activities: homeRoutes,
  activityTable: activityTableRoutes
};