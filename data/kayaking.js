const mongoCollections = require('../config/mongoCollections');
var mongo = require('mongodb');
const kayaking = mongoCollections.kayaking;
const { ObjectId } = require('mongodb');
var validate= require('../validation')

async function createKayaking(location, city, state, date, organizer, expertise, price) {
    //validate.checkString(location, 'location');
    validate.checkString(city, 'city');
    //validate.checkString(state, 'state');
    //validate.checkString(date, 'date');
    //validate.checkString(organizer, 'organizer');
    //validate.checkString(expertise, 'expertise');
    //validate.checkString(price, 'price');

    const kayakingCollection = await kayaking();
    let newKayaking = {
        location: location,
        city: city,
        state: state,
        date: date,
        organizer: organizer,
        expertise: expertise,
        price: price
    };

    //Create/Insert new kayaking activity in db
    const insertInfo = await kayakingCollection.insertOne(newKayaking);
    if (!insertInfo.acknowledged || !insertInfo.insertedId)
      throw 'Could not add new Kayaking activity';
    else if (insertInfo.acknowledged)
      //return userInserted;
      return { authenticated: true };
  }

  async function getAllKayaking() {
    const kayaking_data = await kayaking();
    const list_all_kayaking = await kayaking_data.find({}, { '_id': 0 }).toArray();
    return JSON.parse(JSON.stringify(list_all_kayaking));

}

  module.exports = {
    createKayaking,
    getAllKayaking
  }
