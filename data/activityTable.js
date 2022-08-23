const mongoCollections = require('../config/mongoCollections');
const activityTable = mongoCollections.activityTable;
var validation = require('../validation');
const { ObjectId } = require('mongodb');
const { getEventById } = require('./individualevent');

async function createactivityTable(activityName, overview, location, city, state, date, organizer, expertise, price, faq, registeredMembers) {
    validation.checkActivity(activityName);
    validation.checkDescription(overview);
    validation.checkStringWithSpaces(location, 'location');
    validation.checkString(city, 'city');
    validation.checkState(state, 'state');
    validation.checkDateforFutureActivities(date, 'date');
    validation.checkStringWithSpaces(organizer, 'organizer');
    validation.checkExpertise(expertise, 'expertise');
    //validation.checkIsProperNumber(price, 'price');

    const activityTableCollection = await activityTable();

    let newactivityTable = {
        activityName: activityName,
        overview: overview,
        location: location,
        city: city,
        state: state,
        date: date,
        organizer: organizer,
        expertise: expertise,
        price: price,
        faq: faq,
        registeredMembers: registeredMembers
    };

    //Create/Insert new activityTable activity in db
    const insertInfo = await activityTableCollection.insertOne(newactivityTable);
    if (!insertInfo.acknowledged || !insertInfo.insertedId)
        throw 'Could not add new activityTable activity';
    else if (insertInfo.acknowledged) {
        const newId = insertInfo.insertedId;
        const activityTable = await getActivityTableById(newId.toString());
        return JSON.parse(JSON.stringify(activityTable));
    }


}

async function getActivityTableById(Id) {
    validation.checkId(Id);
    let newObjId = ObjectId();
    if (!ObjectId.isValid(newObjId)) throw 'Object id is not valid'
    let parsedId = ObjectId(Id);
    const activityTableCollection = await activityTable();
    const activityTableDetails = await activityTableCollection.findOne({ _id: parsedId });
    if (activityTableDetails === null) throw 'No Event is present with that Id'
    return activityTableDetails

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

async function createEvent(overview, location, city, state, date, organizer, expertise, price, faq, registeredMembers) {
    // let activityName = actName.toLowerCase();
    // validate.checkActivity(activityName);
    validation.checkStringWithSpaces(location, 'location');
    validation.checkString(city, 'city');
    validation.checkState(state, 'state');
    validation.checkDateforFutureActivities(date, 'date');
    validation.checkStringWithSpaces(organizer, 'organizer');
    validation.checkExpertise(expertise, 'expertise');
    validation.checkIsProperNumber(price, 'price');

    var checkdup = await validate.checkDuplicateActivity(activityName);
    if ("hasErrors" in checkdup) {
        return checkdup;
    }
    const activityCollection = await activities();
    let newActivity = {
        activityName: activityName,
        activityDesc: activityDesc
    };
    const insertInfo = await activityCollection.insertOne(newActivity);
    if (insertInfo.insertedCount === 0) {
        errormessage = {
            className: "Item not added",
            message: "Item was not added",
            hasErrors: "True",
            title: "Error"
        }
        return errormessage;
    }
    const newId = insertInfo.insertedId;
    const activity = await getActivityById(newId.toString());
    return JSON.parse(JSON.stringify(activity));
}


module.exports = {
    createactivityTable,
    getAllactivityTable,
    getActivityTableByName,
    createEvent,
    getActivityTableById
}
