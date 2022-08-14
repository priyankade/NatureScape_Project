const { ObjectId } = require('mongodb');
const mongoCollections = require('./config/mongoCollections');
var mongo = require('mongodb');
const activities = mongoCollections.activities;

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
      throw `Error: You must supply a ${varName}!`;
    }
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

  checkDescription(strdesc, varDesc) {
    if (!strdesc) {
      throw 'Description is required for users to understand the activity'
    }

    strdesc = strdesc.trim();

    if (strdesc.length === 0) {
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


  // checkId(id, varName) {
  //   if (!id) throw `Error: You must provide a ${varName}`;
  //   if (typeof id !== 'string') throw `Error:${varName} must be a string`;
  //   id = id.trim();
  //   if (id.length === 0)
  //     throw `Error: ${varName} cannot be an empty string or just spaces`;
  //   if (!ObjectId.isValid(id)) throw `Error: ${varName} invalid object ID`;
  //   return id;
  // },

  checkString(strVal, varName) {
    if (!strVal) throw `Error: You must supply a ${varName}!`;
    if (typeof strVal !== 'string') throw `Error: ${varName} must be a string!`;
    strVal = strVal.trim();
    if (strVal.length === 0)
      throw `Error: ${varName} cannot be an empty string or string with just spaces`;
    // if (strVal.length < 4)
    //   throw `Error: ${varName} should be at least 4 characters long`;
    if (!isNaN(strVal))
      throw `Error: ${strVal} is not a valid value for ${varName} as it only contains digits`;
    if (strVal.includes(" "))
      throw `Error: ${varName} should not have spaces`;

    return strVal;

  },

  alphanumeric(input) {
    var letterNumber = /^[0-9a-zA-Z]+$/i;
    if ((input.match(letterNumber)))
      return true;
    else {
      throw "Only alphanumeric input allowed in username";

    }
  },

  checkPassword(strVal, varName) {
    if (!strVal) throw `Error: You must supply a ${varName}!`;
    if (typeof strVal !== 'string') throw `Error: ${varName} must be a string!`;
    strVal = strVal.trim();
    if (strVal.length === 0)
      throw `Error: ${varName} cannot be an empty string or string with just spaces`;
    if (strVal.length < 6)
      throw `Error: ${varName} should be at least 6 characters long`;
    if (!isNaN(strVal))
      throw `Error: ${strVal} is not a valid value for ${varName} as it only contains digits`;
    return strVal;
  },

  // checkPhone(phone, varName) {
  //   checkString(phone, varName);
  //   phone = phone.trim();
  //   let num = /^\d{10}$/;     //validate a phone number of 10 digits
  //   if ((phone.match(num)))
  //     return true;
  //   else {
  //     throw `Error: Please enter a 10 digit ${varName}`;

  //   }
  // }




};