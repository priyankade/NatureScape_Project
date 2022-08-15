const mongoCollections = require('../config/mongoCollections');
var mongo = require('mongodb');
const activityTable = mongoCollections.activityTable;
const { ObjectId } = require('mongodb');
var validate= require('../validation')

async function createActivityTable(location, city, state, date, organizer, expertise, price) {
    //validate.checkString(location, 'location');
    validate.checkString(city, 'city');
    //validate.checkString(state, 'state');
    //validate.checkString(date, 'date');
    //validate.checkString(organizer, 'organizer');
    //validate.checkString(expertise, 'expertise');
    //validate.checkString(price, 'price');

    const activityTableCollection = await activityTable();
    let newActivityTable = {
        location: location,
        city: city,
        state: state,
        date: date,
        organizer: organizer,
        expertise: expertise,
        price: price
    };

    //Create/Insert new activity in db
    const insertInfo = await activityTableCollection.insertOne(newActivityTable);
    if (!insertInfo.acknowledged || !insertInfo.insertedId)
      throw 'Could not add new activity table';
    else if (insertInfo.acknowledged)
      //return userInserted;
      return { authenticated: true };
  }

  async function getAllActivityTable() {
    const activityTable_data = await activityTable();
    const list_all_activityTable = await activityTable_data.find({}, { '_id': 0 }).toArray();
    return JSON.parse(JSON.stringify(list_all_activityTable));

}

  module.exports = {
    createActivityTable,
    getAllActivityTable
  }

