const mongoCollections = require('../config/mongoCollections');
var mongo = require('mongodb');
const scuba = mongoCollections.scuba;
const { ObjectId } = require('mongodb');
var validate= require('../validation')

async function createScuba(location, city, state, date, organizer, expertise, price) {
    //validate.checkString(location, 'location');
    validate.checkString(city, 'city');
    //validate.checkString(state, 'state');
    //validate.checkString(date, 'date');
    //validate.checkString(organizer, 'organizer');
    //validate.checkString(expertise, 'expertise');
    //validate.checkString(price, 'price');

    const scubaCollection = await scuba();
    let newScuba = {
        location: location,
        city: city,
        state: state,
        date: date,
        organizer: organizer,
        expertise: expertise,
        price: price
    };

    //Create/Insert new scuba activity in db
    const insertInfo = await scubaCollection.insertOne(newScuba);
    if (!insertInfo.acknowledged || !insertInfo.insertedId)
      throw 'Could not add new Scuba activity';
    else if (insertInfo.acknowledged)
      //return userInserted;
      return { authenticated: true };
  }

  async function getAllScuba() {
    const scuba_data = await scuba();
    const list_all_scuba = await scuba_data.find({}, { '_id': 0 }).toArray();
    return JSON.parse(JSON.stringify(list_all_scuba));

}

  module.exports = {
    createScuba,
    getAllScuba
  }
