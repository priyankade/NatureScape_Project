const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
const {ObjectId} = require('mongodb');
const bcrypt = require("bcrypt");
const saltRounds = 16;
const validation = require('../validation');

const exportedMethods = {

  async createUser(fname, lname, username, age, gender, dob, email, phone, emer_phone, password) {
    if (!fname || typeof fname !== "string")
      throw 'Please provide first name';
    
    if (!lname || typeof lname !== "string")
      throw 'Please provide last name';

    if (!username || typeof username !== "string")
      throw 'Please provide username';
    
    // if (!age || typeof age !== "string")
    //   throw 'Please provide age';

    // if (!gender || typeof gender !== "string")
    //   throw 'Please provide gender';
    
    // if (typeof dob !== "string")
    //   throw 'Please enter valid date of birth';

    // if (!email || typeof email !== "string")
    //   throw 'Please provide email';
    
    // if (!phone || typeof phone !== "string")
    //   throw 'Please provide phone number';

    // if (!emer_phone || typeof emer_phone !== "string")
    //   throw 'Please provide emeergency phone number';

    // if (!password || typeof password !== "string")
    //   throw 'Please provide password';

    const hash = await bcrypt.hash(password, saltRounds);
    //console.log(hash);

    await validation.checkString(fname, 'First Name');
    await validation.checkString(lname, 'Last Name');
    await validation.alphanumeric(username);
   // await validation.checkString(age, 'age');
    await validation.checkString(gender, 'gender');
    // await validation.checkString(dob, 'dob');
    // await validation.checkString(email, 'email');
    await validation.checkPhone(phone, 'phone number');
    await validation.checkPhone(emer_phone, 'emergency phone number');
    await validation.checkPassword(password, 'password');
    
    username = username.trim();
    username = username.toLowerCase();  //preventing duplicate usernames in the system

    const usersCollection = await users();

    //Create user when username does not exist
    let usernamePresent = await usersCollection.findOne({ username: username });

    //console.log(usernamePresent)
    if (usernamePresent != null) {
      throw 'Username already exists';
    }
    else {
      //Create new user object
      let newUser = {
        fname: fname,
        lname: lname,
        username: username,
        age: age,
        gender: gender,
        dob: dob,
        email: email,
        phone: phone,
        emer_phone: emer_phone,
        password: hash
      };

      //Create/Insert new user in db
      const userInserted = await usersCollection.insertOne(newUser);
      if (!userInserted.acknowledged || !userInserted.insertedId)
        throw 'Could not add user';
      else if (userInserted.acknowledged)
        //return userInserted;
        return { authenticated: true };
    }

  },

  async checkUser(username, password) {
    if (!username || typeof username !== "string")
      throw 'Please provide username';

    if (!password || typeof password !== "string")
      throw 'Please provide password';


    await validation.checkString(username, 'username');
    await validation.checkPassword(password, 'password');
    await validation.alphanumeric(username);
    username = username.toLowerCase().trim();
    //await validation.checkPassword(password);
    password = password.trim();

    let HASHED_PW_FROM_DB = null;
    const usersCollection = await users();
    //console.log("userscollection data is", usersCollection)
    const userCheck = await usersCollection.findOne({ username: username });
    //console.log("userCheck is ", userCheck)
    if (userCheck === null) {
      throw "Either the username or password is invalid";
    }
    else if (userCheck != null) {
      HASHED_PW_FROM_DB = userCheck.password;
    }
    let match = false;

    // console.log("HASHED_PW_FROM_DB is:  ", HASHED_PW_FROM_DB);
    // console.log("password from req.body is:  ", password);

    try {
      match = await bcrypt.compare(password, HASHED_PW_FROM_DB);
    } catch (e) {
      //no op
    }
    //console.log("match is:", match)
    if (match) {
      return { authenticated: true };
    } else {
      throw "Either the username or password is invalid";
    }
  },


  async getUserById(id) {
    //id = validation.checkId(id, 'ID');
    const usersCollection = await users();
    const found_user = await usersCollection.findOne({_id: ObjectId(id)});

    if (!found_user) throw 'User not found';

    return found_user;
  },

 async seedUser(firstName, lastName, email, username, age, activities_arr) {
    const usersCollection = await users();

    const newUser = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        username: username,
        age: age,
        activities: activities_arr
     };
    const newInsertInformation = await usersCollection.insertOne(newUser);
    const newId = newInsertInformation.insertedId;
    return await this.getUserById(newId.toString());
  }

}

module.exports = exportedMethods;