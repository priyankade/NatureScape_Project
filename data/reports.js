const mongoCollections = require('../config/mongoCollections');
const reports = mongoCollections.reports;
const { ObjectId } = require('mongodb');
const validation = require('../validation');
const users = require('../data/users');
const individualevent = require('../data/individualevent');

async function getAllReports() {
    try {
        const reportCollection = await reports();
        const allReports = await reportCollection.find({}).toArray();
        return allReports;
    } catch (e) {
        console.log(e);
    }
}

async function getReportById(id) {
    id = validation.checkId(id, 'ID');
    const reportCollection = await reports();
    const found_report = await reportCollection.findOne({ _id: ObjectId(id) });
  
    if (!found_report) throw 'Report not found';
  
    return found_report;
  }

async function addReport(username, eventId, reason)
{
    if (!eventId || typeof eventId !== "string") throw 'You must provide an event id for report';
    if (!username || typeof username !== "string") throw 'You must provide an username for report';
    if (!reason || !Array.isArray(reason)) throw ' You must select at least a reason for reporting';
    const reportCollection = await reports();
    const found_report = await reportCollection.findOne({username: username, eventId: eventId}); 
    if(found_report == null)
    {
        let newReport = {
            username: username,
            eventId: eventId,
            reasons: reason
        };

        const insertInfo = await reportCollection.insertOne(newReport);
        if (!insertInfo.acknowledged || !insertInfo.insertedId)
            throw 'Could not add report';
        
        const newId = insertInfo.insertedId.toString();
        const getReport = await this.getReportById(newId);
        let gotEvent = await individualevent.getEventById(eventId);
        //console.log("location:", gotEvent.location);
        let reportAddedInUserCollection = await users.updateUserWithReports(username, gotEvent.location);
        return getReport;
    }
    else{
        throw "you have already reported the post once"
    };
}

async function deleteReport(id) {

    if (!id) throw 'You must provide a report id to search for';
        if (typeof id !== 'string') throw 'Id must be a string';
        if (id.trim().length === 0)
            throw 'id cannot be an empty string or just spaces';
        id = id.trim();
        if (!ObjectId.isValid(id)) throw 'invalid object ID';


    const reportCollection = await reports()
    const findReport = await reportCollection.findOne({ _id: ObjectId(id) });
    const deletionInfo = await reportCollection.deleteOne({ _id: ObjectId(id) });

    if (deletionInfo.deletedCount === 0) {
        throw `Error: Could not delete report with id of ${id}. Band does not exist.`;
    }

    return true;
}

module.exports = {
    getAllReports,
    getReportById,
    addReport,
    deleteReport
}