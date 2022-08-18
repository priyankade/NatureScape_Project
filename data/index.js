const userRoutes = require("./users");
const homeRoutes = require("./activities")
const hikingRoutes = require("./hiking")
const kayakingRoutes = require("./kayaking")
// const reviewsRoute = require("./reviews");

module.exports = {
  users: userRoutes,
  activities: homeRoutes,
  hiking: hikingRoutes,
  kayaking: kayakingRoutes
};