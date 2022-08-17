const { ObjectId } = require('mongodb');
const mongoCollections = require('./config/mongoCollections');
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

    checkActivity(strVal) {
        strVal = strVal.toLowerCase();
        if (!strVal) {
            throw `Error: You must supply a name for the activity`;
        }
        if (typeof strVal !== 'string') {
            throw `activity name must be a string`;
        }
        strVal = strVal.trim();
        if (strVal.length === 0)
            throw `activity name cannot be empty string or just spaces`;
        if (!isNaN(strVal)) {
            throw `activity name is invalid. Must have non-numeric characters. `;
        }

        return strVal;
    },

    checkDescription(strdesc) {
        if (!strdesc) {
            throw 'Description is required for users to understand the activity'
        }

        strdesc = strdesc.trim();

        if (strdesc.length === 0) {
            throw 'Description cannot consist of only spaces'
        }
        strdescLength = strdesc.length;
        if (strdescLength < 100) {
            throw 'Description should have atleast 100 characters'
        }
        return strdesc;
    },

    async checkDuplicateActivity(activityNamedup) {
        let activityName = activityNamedup.toLowerCase();
        const activityCollection = await activities();

        const activityList = await activityCollection.find({}).toArray();
        for (let i = 0; i < activityList.length; i++) {
            let str = activityList[i].activityName.toString();
            if (str === activityName) {
                errormessage = {
                    className: "Activity exists",
                    message: "This activity already exists",
                    hasErrors: "True",
                    title: "Error"
                };
                return errormessage;
            }
        }
        return activityName;
    },

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