const mongoCollections = require('../config/mongoCollections');
const activityTable = mongoCollections.activityTable;
var validation= require('../validation')

async function createactivityTable(activityName, location, city, state, date, organizer, expertise, price) {
    validation.checkActivity(activityName);
    validation.checkStringWithSpaces(location, 'location');
    validation.checkString(city, 'city');
    validation.checkState(state, 'state');
    validation.checkDateforFutureActivities(date, 'date');
    validation.checkStringWithSpaces(organizer, 'organizer');
    validation.checkExpertise(expertise, 'expertise');
    validation.checkIsProperNumber(price, 'price');

    const activityTableCollection = await activityTable();
   
    let newactivityTable = {
        activityName: activityName,
        location: location,
        city: city,
        state: state,
        date: date,
        organizer: organizer,
        expertise: expertise,
        price: price
    };

    //Create/Insert new activityTable activity in db
    const insertInfo = await activityTableCollection.insertOne(newactivityTable);
    if (!insertInfo.acknowledged || !insertInfo.insertedId)
      throw 'Could not add new activityTable activity';
    else if (insertInfo.acknowledged)
      //return userInserted;
      return { authenticated: true };
  }

  async function getAllactivityTable() {
    const activityTable_data = await activityTable();
    const list_all_activityTable = await activityTable_data.find({}, { '_id': 0 }).toArray();
    return JSON.parse(JSON.stringify(list_all_activityTable));

}

async function getActivityTableByName(activityName) {
  validation.checkActivity(activityName);
  activityName = activityName.toLowerCase();
  const activityTableCollection = await activityTable();

  const activityDetails = await (await activityTableCollection.find({ activityName: activityName })).toArray();

  try {
      if (activityDetails.length == 0) {
          console.log(activityName, ': No activity found by that name.');
          throw 'No activity is present with that name';
      }
  } catch (e) {
      errormessage = {
          className: "Item not found",
          message: "Item was not found",
          hasErrors: "True",
          title: "Error"
      }
      return errormessage;
  }
  return JSON.parse(JSON.stringify(activityDetails));
}

  module.exports = {
    createactivityTable,
    getAllactivityTable,
    getActivityTableByName
  }
