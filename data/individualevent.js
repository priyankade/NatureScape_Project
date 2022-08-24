const mongoCollections = require('../config/mongoCollections');
const eventsCollection = mongoCollections.activityTable;
const { ObjectId } = require('mongodb');
var validate = require('../validation');


async function getEventById(Id) {
    try {
        validate.checkId(Id);
    }
    catch (error) {
        errormessage = {
            className: "Cannot add activity",
            message: error,
            hasErrors: "Error",
            title: "Error"
        }
    }
    let newObjId = ObjectId();
    if (!ObjectId.isValid(newObjId)) throw 'Object id is not valid'
    let parsedId = ObjectId(Id);
    const eventCollection = await eventsCollection();
    const eventDetails = await eventCollection.findOne({ _id: parsedId });
    if (eventDetails === null) throw 'No activity is present with that Id'
    return eventDetails
}

async function updateRegisteredMembers(eventId, username) {
    try {
        validate.checkId(eventId);
    }
    catch (error) {
        errormessage = {
            className: "Cannot insert registered member",
            message: error,
            hasErrors: "Error",
            title: "Error"
        }
    }
    let { ObjectId } = require('mongodb');
    let parsedId = ObjectId(eventId);
    const eventCollection = await eventsCollection();
    const checkEvent = await eventCollection.find({ _id: parsedId });
    if (checkEvent === null) {
        throw 'Event not found';
    }
    const updateInfo = await eventCollection.updateOne(
        { _id: parsedId },
        { $push: { registeredMembers: username } }
    );

    if (!updateInfo.matchedCount && !updateInfo.modifiedCount) throw 'Update failed';
    console.log("Update successful");
    const getUpdatedDetails = await this.getEventById(parsedId.toString());
    return true;
}


module.exports = {
    getEventById,
    updateRegisteredMembers
}