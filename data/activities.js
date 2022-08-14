const mongoCollections = require('../config/mongoCollections');
var mongo = require('mongodb');
const activities = mongoCollections.activities;
const { ObjectId } = require('mongodb');
var validate= require('../validation')



async function createActivity(activityName, activityDesc){
    validate.checkActivity(activityName, 'activityName');
    validate.checkDescription(activityDesc,'description');
//validate.checkDuplicateActivity(activityName,'activityName') //verify
    const activityCollection = await activities();
    let newActivity = {
        activityName : activityName,
        activityDesc : activityDesc
    };
    const insertInfo = await activityCollection.insertOne(newActivity);
    if (insertInfo.insertedCount === 0) throw 'Could not add new Activity';
    const newId = insertInfo.insertedId;
    const activity = await getActivityById(newId.toString());
    return JSON.parse(JSON.stringify(activity));

}

async function getActivityById(Id){
    validate.checkId(Id);
    let newObjId = ObjectId();
    if (!ObjectId.isValid(newObjId)) throw 'Object id is not valid'
    let parsedId = ObjectId(Id);
    const activityCollection = await activities();
    const activityDetails = await activityCollection.findOne({ _id : parsedId });
    if (activityDetails === null) throw 'No activity is present with that Id'
    return activityDetails
}

async function getAllActivities(){
    const activities_data = await activities();
    const list_all_Activities = await activities_data.find({}, {'_id': 0}).toArray();
    return JSON.parse(JSON.stringify(list_all_Activities));

}

async function getActivityByName(activityName){
    validate.checkActivity(activityName);
    const activityCollection = await activities();
    const activityDetails = await activityCollection.findOne({ activityName :"activityName" });
    if (activityDetails === null) throw 'No activity is present with that name'
    return activityDetails

}

async function deleteActivity(activityName){
    validate.checkActivity(activityName);
    const activityCollection = await activities();
    const checkActivity = await activityCollection.findOne({ activityName :"activityName" })
    if (checkActivity === null) {
        throw `Could not delete activity ${activityName}`;
    }
    const deletionInfo = await activityCollection.deleteOne({ activityName :"activityName" });
    if (deletionInfo.deletedCount === 0) {
        throw `Could not delete activity ${activityName}`;
    }

    return { deleted: true };
}

async function updateActivity(activityId,updatedActivity){
    validate.checkId(activityId);
    validate.checkActivity(updatedActivty.activityName);
    validate.checkDescription(updatedActivity.activityDesc);
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

module.exports={createActivity,
getActivityByName,
getAllActivities,
deleteActivity,
updateActivity
}