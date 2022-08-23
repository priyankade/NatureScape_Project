const userRoutes = require("./users");
const homeRoutes = require("./activities")
const activityTableRoutes = require("./activityTable")
const eventRoutes= require("./individualevent");
const reviewsRoutes = require("./reviews");
const reportRoutes= require("./reports");

module.exports = {
  users: userRoutes,
  activities: homeRoutes,
  activityTable: activityTableRoutes,
  eventRoutes: eventRoutes,
  reviews: reviewsRoutes,
  reports: reportRoutes
};