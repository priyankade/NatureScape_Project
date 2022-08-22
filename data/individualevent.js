const mongoCollections = require('../config/mongoCollections');
const eventsData = mongoCollections.activityTable;
const { ObjectId } = require('mongodb');
var validate = require('../validation');

async function getEventById(Id) {
    validate.checkId(Id);
    let newObjId = ObjectId();
    if (!ObjectId.isValid(newObjId)) throw 'Object id is not valid'
    let parsedId = ObjectId(Id);
    const eventsCollection = await eventsData();
    const eventDetails = await eventsCollection.findOne({ _id: parsedId });
    if (eventDetails === null) throw 'No event is present with that Id';
    return eventDetails;
}
module.exports = {
    getEventById
}