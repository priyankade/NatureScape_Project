const mongoCollections = require('../config/mongoCollections');
var mongo = require('mongodb');
const skydiving = mongoCollections.skydiving;
const { ObjectId } = require('mongodb');
var validate= require('../validation')

async function createSkydiving(location, city, state, date, organizer, expertise, price) {
    //validate.checkString(location, 'location');
    validate.checkString(city, 'city');
    //validate.checkString(state, 'state');
    //validate.checkString(date, 'date');
    //validate.checkString(organizer, 'organizer');
    //validate.checkString(expertise, 'expertise');
    //validate.checkString(price, 'price');

    const skydivingCollection = await skydiving();
    let newskydiving = {
        location: location,
        city: city,
        state: state,
        date: date,
        organizer: organizer,
        expertise: expertise,
        price: price
    };

    //Create/Insert new skydiving activity in db
    const insertInfo = await skydivingCollection.insertOne(newskydiving);
    if (!insertInfo.acknowledged || !insertInfo.insertedId)
      throw 'Could not add new Skydiving activity';
    else if (insertInfo.acknowledged)
      //return userInserted;
      return { authenticated: true };
  }

  async function getAllSkydiving() {
    const skydiving_data = await skydiving();
    const list_all_skydiving = await skydiving_data.find({}, { '_id': 0 }).toArray();
    return JSON.parse(JSON.stringify(list_all_skydiving));

}

  module.exports = {
    createSkydiving,
    getAllSkydiving
  }
