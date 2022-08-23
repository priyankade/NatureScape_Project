const userRoutes = require("./users");
const homeRoutes = require("./activities")
const activityTableRoutes = require("./activityTable")
const eventRoutes= require("./individualevent");
const reviewsRoutes = require("./reviews");

module.exports = {
  users: userRoutes,
  activities: homeRoutes,
  activityTable: activityTableRoutes,
  eventRoutes: eventRoutes,
  reviews: reviewsRoutes
};