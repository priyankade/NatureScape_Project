const dbConnection = require('../config/mongoConnection');
const data = require('../data');
const users = data.users;
const activities = require('../data/activities');
const hikingActivity = require('../data/hiking');


async function main() {
  const db = await dbConnection.dbConnection();
  await db.dropDatabase();

  // let firstName = "John";
  // let lastName = "Doe";
  // let email = "john.doe@abc.com";
  // let username = "jdoe";
  // let age = 20;  
  // let activities_arr = [
  //       "Hiking",
  //       "Paragliding"
  // ];
 

  //await users.seedUser(firstName, lastName, email, username, age, activities_arr);
  const hiking = await activities.createActivity('Hiking','Hiking is an activity of moderate difficulty, which involves walking across long distances generally on trails or paths. The duration of the activity varies between short half-day programs and longer itineraries of over 20 days. It is usually an activity that allows groups of different sizes.');

  const kayaking = await activities.createActivity('Kayaking','Kayaking is a watersport that involves paddling using a double-bladed oar and a small boat known as a kayak. The boats come in a variety of sizes and types, depending on their intended use, but most kayaks feature an enclosed deck that covers the legs. The boat sits low in the water and usually only accommodates a single paddler, but tandem kayaks hold two people and some boats hold three people.');

  const scubaDiving = await activities.createActivity('Scuba Diving','Scuba diving is mainly done for the attraction of the unattainable undersea world.  It is one area of nature that mankind has not been able to fully control, we simply are not able to breathe underwater.  Hence, scuba diving gives us an opportunity to be in that underwater world, even if it is just for a limited amount of time.')

  const skyDiving = await activities.createActivity('skyDiving','Skydiving is parachuting from an airplane for fun. Skydiving can be done individually and with groups of people. Training is required. Unlike most paratroopers, skydivers often wait until they are low, before opening the parachute. The jump can also be made from a helicopter or a balloon that is high enough in the sky. Skydiving can be an exciting sport.Skydiving includes free falling (usually from an airplane) through the air prior to opening a parachute. Typically skydives are carried out from around 4,000m (or 12,500ft) offering 40 to 50 seconds of freefall time. Longer free fall times can be achieved by exiting an aircraft at altitudes much higher than 4,000m, but very high jumps require pressurized oxygen within the aircraft, and bottled oxygen for the diver.')

  await hikingActivity.createHiking("Smoky Mountains-Gatlinburg", "Gatlinburg", "Tennesse", "08/22/2022", "Invisible Inc.", "Intermediate", "100")
  

  
  console.log('Done seeding database');

  await dbConnection.closeConnection();
}

main();