const mongoCollections = require('../config/mongoCollections');
var mongo = require('mongodb');
const activities = mongoCollections.activities;
const { ObjectId } = require('mongodb');

module.exports = {
    checkId(id) {
        if (!id) throw 'Error: You must provide an id to search for';
        if (typeof id !== 'string') throw 'Error: id must be a string';
        id = id.trim();
        if (id.length === 0)
            throw 'Error: id cannot be an empty string or just spaces';
        if (!ObjectId.isValid(id)) throw 'Error: invalid object ID';
        return id;
    },

    checkActivity(strVal, varName) {
        if (!strVal) {
            throw `Error: You must supply a ${varName}!`;}
        if (typeof strVal !== 'string') {
            throw `${varName} must be a string`;
        }
        strVal = strVal.trim();
        if (strVal.length === 0)
            throw `${varName} cannot be empty string or just spaces`;
        if (!isNaN(strVal)) {
            throw `${strVal} is invalid for ${varName}. Must have non-numeric characters. `;
        }
        
        return strVal;
    },
    checkDescription(strdesc,varDesc){
        if(!strdesc){
            throw 'Description is required for users to understand the activity'
        }
        
        strdesc=strdesc.trim();
        
        if(strdesc.length===0){
            throw 'Description cannot consist of only spaces'
        }
        // strdescLength= strdesc.split(" ").length;
        // console.log(strdescLength);
        // if(strdescLength<50){
        //     throw 'Description should have atleast 50 words'
        // }
        return strdesc;
    },

//incomplete.
    // async checkDuplicateActivity(activityName,varActivityName){
    //     const activityCollection = await activities();

    //     const activity1 = await activityCollection.find({}).toArray();
    //     for (let i = 0; i < activity1.length; i++) {
    //         let str = activity1[i].activityName.toString();

    //         if (activity1[i].activityName == un) {
    //             // console.log(user1[i].username,un)
    //             return 0
    //         }
    //     }
    //     return activityName;
    // }
}