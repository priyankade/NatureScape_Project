const mongoCollections = require('../config/mongoCollections');
var mongo = require('mongodb');
const hiking = mongoCollections.hiking;
const { ObjectId } = require('mongodb');
var validate= require('../validation')

async function createHiking(location, city, state, date, organizer, expertise, price) {
    //validate.checkString(location, 'location');
    validate.checkString(city, 'city');
    //validate.checkString(state, 'state');
    //validate.checkString(date, 'date');
    //validate.checkString(organizer, 'organizer');
    //validate.checkString(expertise, 'expertise');
    //validate.checkString(price, 'price');

    const hikingCollection = await hiking();
    let newHiking = {
        location: location,
        city: city,
        state: state,
        date: date,
        organizer: organizer,
        expertise: expertise,
        price: price
    };

    //Create/Insert new hiking activity in db
    const insertInfo = await hikingCollection.insertOne(newHiking);
    if (!insertInfo.acknowledged || !insertInfo.insertedId)
      throw 'Could not add new Hiking activity';
    else if (insertInfo.acknowledged)
      //return userInserted;
      return { authenticated: true };
  }

  async function getAllHiking() {
    const hiking_data = await hiking();
    const list_all_hiking = await hiking_data.find({}, { '_id': 0 }).toArray();
    return JSON.parse(JSON.stringify(list_all_hiking));

}

  module.exports = {
    createHiking,
    getAllHiking
  }
