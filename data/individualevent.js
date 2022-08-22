const mongoCollections = require('../config/mongoCollections');
const eventsCollection = mongoCollections.activityTable;
const { ObjectId } = require('mongodb');
var validate = require('../validation');


async function getEventById(Id) {
    validate.checkId(Id);
    let newObjId = ObjectId();
    if (!ObjectId.isValid(newObjId)) throw 'Object id is not valid'
    let parsedId = ObjectId(Id);
    const eventCollection = await eventsCollection();
    const eventDetails = await eventCollection.findOne({ _id: parsedId });
    if (eventDetails === null) throw 'No activity is present with that Id'
    return eventDetails
}

async function updateRegisteredMembers(eventId,username) {
    console.log('data/individualevents username is ', username);
    validate.checkId(eventId);
    console.log('Validation complete');
    let { ObjectId } = require('mongodb');
    let parsedId = ObjectId(eventId);
    const eventCollection= await eventsCollection();
    const checkEvent = await eventCollection.find({ _id: parsedId });
    if(checkEvent===null){
      throw 'Event not found';
    }
    const updateInfo = await eventCollection.updateOne(
      { _id: parsedId },
      { $push: { registeredMembers: username } }
  );
  
  if (!updateInfo.matchedCount && !updateInfo.modifiedCount) throw 'Update failed';
  console.log("Update successful");
  const getUpdatedDetails = await this.getEventById(parsedId.toString());
  console.log("getUpdatedDetails",getUpdatedDetails);
  return;
  }
  

module.exports = {
    getEventById,
    updateRegisteredMembers,
    getEventById
}