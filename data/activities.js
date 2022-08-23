const mongoCollections = require('../config/mongoCollections');
const activities = mongoCollections.activities;
const { ObjectId } = require('mongodb');
var validate = require('../validation')

async function createActivity(actName, activityDesc) {
    let activityName = actName;
    try {
        activityName = validate.checkActivity(activityName);
        validate.checkDescription(activityDesc);
    } catch (error) {
        errormessage = {
            className: "Cannot add activity",
            message: error,
            hasErrors: "Error",
            title: "Error"
        }
        return errormessage;
    }
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

async function getActivityByName(activityName) {
    try {
        validate.checkActivity(activityName);
    } catch (error) {
        errormessage = {
            className: "Cannot add activity",
            message: error,
            hasErrors: "Error",
            title: "Error"
        }
    }
    searchActivity = activityName.toLowerCase();
    const activityCollection = await activities();
    const activityDetails = await activityCollection.find({ "activityName": activityName }).toArray();
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

async function deleteActivity(activityName) {
    console.log('data/activities.js deleteActivity()');
    try {
        validate.checkActivity(activityName);
    } catch (error) {
        errormessage = {
            className: "Cannot add activity",
            message: error,
            hasErrors: "Error",
            title: "Error"
        }
    }
    deleteActivity = activityName.toLowerCase();
    const activityCollection = await activities();
    const checkActivity = await activityCollection.findOne({ "activityName": deleteActivity })
    if (checkActivity === null) {
        throw `Could not delete activity ${deleteActivity}`;
    }
    const deletionInfo = await activityCollection.deleteOne({ "activityName": deleteActivity });
    if (deletionInfo.deletedCount === 0) {
        throw `Could not delete activity ${deleteActivity}`;
    }
    return { deleted: true };
}

async function getActivityById(Id) {
    try {
        validate.checkId(Id);
    } catch (error) {
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
    const activityCollection = await activities();
    const activityDetails = await activityCollection.findOne({ _id: parsedId });
    if (activityDetails === null) throw 'No activity is present with that Id'
    return activityDetails
}

async function getAllActivities() {
    const activities_data = await activities();
    const list_all_Activities = await activities_data.find({}, { '_id': 0 }).toArray();
    return JSON.parse(JSON.stringify(list_all_Activities));
}


async function updateActivity(activityId, updatedActivity) {
    try {
        validate.checkId(activityId);
        validate.checkActivity(updatedActivty.activityName);
        validate.checkDescription(updatedActivity.activityDesc);
    } catch (error) {
        errormessage = {
            className: "Cannot add activity",
            message: error,
            hasErrors: "Error",
            title: "Error"
        }
    }
    let { ObjectId } = require('mongodb');
    let parsedId = ObjectId(activityId);
    const activityCollection = await activities();
    const checkActivity = await activityCollection.findOne({ _id: parsedId });
    if (checkActivity === null) {
        throw `Could not update Activity with id of ${id}`;
    }
    const updateInfo = await activityCollection.updateOne(
        { _id: parsedId },
        { $set: updatedActivity }
    );
    if (!updateInfo.matchedCount && !updateInfo.modifiedCount) throw 'Update failed';
    console.log("Update successful");
    const getid = await this.get(parsedId.toString());
    return JSON.parse(JSON.stringify(getid))
}


module.exports = {
    createActivity,
    getActivityByName,
    getAllActivities,
    deleteActivity,
    updateActivity
}
