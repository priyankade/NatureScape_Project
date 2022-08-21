const { ObjectId } = require('mongodb');
const mongoCollections = require('./config/mongoCollections');
const activities = mongoCollections.activities;
const activityTable = mongoCollections.activityTable;

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
        obj={
            actName:activityName
        };
        return obj;
    },

    async checkDuplicateEvent(activityName, location, city, state, date, organizer, expertise, price) {
        location = location.toLowerCase();
        city = city.toLowerCase();
        state = state.toLowerCase();
        organizer = organizer.toLowerCase();
        expertise = expertise.toLowerCase();

        const activityTableCollection = await activityTable();

        const activityTableList = await activityTableCollection.find({}).toArray();
        for (let i = 0; i < activityTableList.length; i++) {
            let arr_activityName = activityTableList[i].activityName.toString();
            let arr_location = activityTableList[i].location.toString();
            let arr_city = activityTableList[i].city.toString();
            let arr_state = activityTableList[i].state.toString();
            let arr_date = activityTable.date;
            let arr_organizer = activityTableList[i].organizer.toString();
            let arr_expertise = activityTableList[i].expertise.toString();
            let arr_price = activityTable.price;

            if (arr_activityName === activityName && arr_location === location && arr_city === city && arr_state === state && arr_date === date && arr_organizer === organizer && arr_expertise === expertise && arr_price === price) {
                errormessage = {
                    className: "Event exists",
                    message: "This event already exists",
                    hasErrors: "True",
                    title: "Error"
                };
                return errormessage;
            }
        }
        obj={
            activityName: activityName,
            location: location,
            city: city,
            state: state,
            date: date,
            organizer: organizer,
            expertise: expertise,
            price: price
        };
        return obj;
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

    checkStringWithSpaces(strVal, varName) {
        if (!strVal) throw `Error: You must supply a ${varName}!`;
        if (typeof strVal !== 'string') throw `Error: ${varName} must be a string!`;
        strVal = strVal.trim();
        if (strVal.length === 0)
            throw `Error: ${varName} cannot be an empty string or string with just spaces`;
        // if (strVal.length < 4)
        //   throw `Error: ${varName} should be at least 4 characters long`;
        if (!isNaN(strVal))
            throw `Error: ${strVal} is not a valid value for ${varName} as it only contains digits`;

        return strVal;

    },

    alphanumeric(input) {
        this.checkString(input)
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

    checkPhone(phone, varName) {
      phone = phone.trim();
      let re = /^\d{10}$/;          //validate phone number of 10 digits
      if (!re.test(phone)) {
        throw `Error: Invalid ${varName} number, please enter phone number in 10 digit format`;
      } else {
        return true;
      }
    },

    checkEmail(email) {
        if (!this.checkString(email)) return false;
        email = email.toLowerCase().trim();
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(email))) {
          throw "Invalid, Enter a proper email";
        } else {
          return true;
        }
    },

    checkGender(gender) {
        if (["male", "female", "transgender", "gender neutral", "non-binary", "prefer not to say"].includes(gender.toLowerCase().trim())) {
            return true;
          } else {
            throw "Please choose a gender from provided options";
          }
    },

    checkDate(date) {
        this.checkString(date);
        date = date.trim();

        //Validate Date in YYYY-MM-DD format
        let arr = date.split("-");
        if (arr.length !== 3) throw "Error: Date should contain 3 values of month, day, year in YYYY-MM-DD format";
      
        let year = parseInt(arr[0]);
        let month = parseInt(arr[1]);
        let day = parseInt(arr[2]);
      
        if (year != arr[0] || month != arr[1] || day != arr[2]) {
          throw "Error: Invalid month data present";
        }
        
        //Month validate
        if (month < 1 || month > 12)  
           throw "Error: month of Date should be between 1 and 12";
        //months with 31 days
        if ([1, 3, 5, 7, 8, 10, 12].includes(month)) {
          if (day < 1 || day > 31) {
            throw `Error: Value for day should be between 1 and 31 in this month - ${month}`;
          }
        } 
        //months with 30 days
        else if ([4, 6, 9, 11].includes(month)) {
          if (day < 1 || day > 30) {
            throw `Error: Value for day should be between 1 and 30"in this month - ${month}`;
          }
        } 
        //february
        else if (month === 2) {
          if (year % 4 === 0) {
            if (day < 1 || day > 29) {
              throw "Error: Day should be between 1 and 29";
            }
          } else {
            if (day < 1 || day > 28) {
              throw "Error: Day should be between 1 and 28";
            }
          }
        }

        // if date in the past, throws error
        // new Date() returns the current date in YYYY-MM-DD format
      
        let currentYear = new Date().getFullYear();
        if (year < 1900 || year > currentYear) {
          throw "Error: Year should be between 1900 and current year";
        } else if (year === currentYear) {
          let currentMonth = new Date().getMonth() + 1;
          if (month > currentMonth) {
            throw "Error: Month should be less than or equal to current month";
          } else if (month === currentMonth) {
            let currentDay = new Date().getDate();
            if (day > currentDay) {
              throw "Error: Day should be less than or equal to current day";
            }
          }
        }
        return true;
      },
      
      checkDateforFutureActivities(date) {
        this.checkString(date);
        date = date.trim();

        //Validate Date in YYYY-MM-DD format
        let arr = date.split("-");
        if (arr.length !== 3) throw "Error: Date should contain 3 values of month, day, year in YYYY-MM-DD format";
      
        let year = parseInt(arr[0]);
        let month = parseInt(arr[1]);
        let day = parseInt(arr[2]);
      
        if (year != arr[0] || month != arr[1] || day != arr[2]) {
          throw "Error: Invalid month data present";
        }
        
        //Month validate
        if (month < 1 || month > 12)  
           throw "Error: month of Date should be between 1 and 12";
        //months with 31 days
        if ([1, 3, 5, 7, 8, 10, 12].includes(month)) {
          if (day < 1 || day > 31) {
            throw `Error: Value for day should be between 1 and 31 in this month - ${month}`;
          }
        } 
        //months with 30 days
        else if ([4, 6, 9, 11].includes(month)) {
          if (day < 1 || day > 30) {
            throw `Error: Value for day should be between 1 and 30"in this month - ${month}`;
          }
        } 
        //february
        else if (month === 2) {
          if (year % 4 === 0) {
            if (day < 1 || day > 29) {
              throw "Error: Day should be between 1 and 29";
            }
          } else {
            if (day < 1 || day > 28) {
              throw "Error: Day should be between 1 and 28";
            }
          }
        }

        // if date in the past, throws error
        // new Date() returns the current date in YYYY-MM-DD format
      
        let currentYear = new Date().getFullYear();
        if (year < currentYear) {
          throw "Error: Year should be in current year or in future";
        } else if (year === currentYear) {
          let currentMonth = new Date().getMonth() + 1;
          if (month < currentMonth) {
            throw "Error: Month should be greater than or equal to current month";
          } else if (month === currentMonth) {
            let currentDay = new Date().getDate();
            if (day < currentDay) {
              throw "Error: Day should be greater than or equal to current day";
            }
          }
        }
        return true;
      },
    
      checkState (state) {
        this.checkString(state);
        state = state.trim();
        let allStates = [
          "AL",
          "AK",
          "AZ",
          "AR",
          "CA",
          "CO",
          "CT",
          "DE",
          "FL",
          "GA",
          "HI",
          "ID",
          "IL",
          "IN",
          "IA",
          "KS",
          "KY",
          "LA",
          "ME",
          "MD",
          "MA",
          "MI",
          "MN",
          "MS",
          "MO",
          "MT",
          "NE",
          "NV",
          "NH",
          "NJ",
          "NM",
          "NY",
          "NC",
          "ND",
          "OH",
          "OK",
          "OR",
          "PA",
          "RI",
          "SC",
          "SD",
          "TN",
          "TX",
          "UT",
          "VT",
          "VA",
          "WA",
          "WV",
          "WI",
          "WY",
        ];
        if (!allStates.includes(state.toUpperCase())) {
          throw "Error: Please enter state in 2 letter format (eg. NJ for New Jersey)";
        }
      },

    checkExpertise(expertise) {
        console.log(expertise)
        if (["easy", "intermediate", "advanced"].includes(expertise.toLowerCase().trim())) {
            return true;
          } else {
            throw "Error: Please choose expertise level from provided options : easy, intermediate, advanced";
          }
    },

    checkIsProperNumber(val, variableName) {
        if (val === undefined) {
            throw `${variableName || 'provided variable'} is undefined`;
        }
    
        if (val === null) {
            throw `${variableName || 'provided variable'} is null`;
        }
    
        if (typeof val !== 'number') {
            throw `${variableName || 'provided variable'} is not a number`;
        }
    
        if (isNaN(val)) {
            throw `${variableName || 'provided variable'} is NaN`;
        }

        if (val < 0) {
            throw `${variableName || 'provided variable'} is negative. Please provide positive value`;
        }
    
    }


};