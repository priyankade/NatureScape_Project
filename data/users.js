const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
const { ObjectId } = require('mongodb');
const bcrypt = require("bcrypt");
const saltRounds = 16;
const validation = require('../validation');

async function createUser(fname, lname, username, gender, dob, email, phone, emer_phone, password, confirmPassword) {
  if (!fname || typeof fname !== "string")
    throw 'Please provide first name';

  if (!lname || typeof lname !== "string")
    throw 'Please provide last name';

  if (!username || typeof username !== "string")
    throw 'Please provide username';

  if (!gender)
    throw 'Please provide gender';

  if (!dob)
    throw 'Please enter valid date of birth';

  if (!email)
    throw 'Please provide email';

  if (!phone)
    throw 'Please provide phone number';

  if (!emer_phone)
    throw 'Please provide emergency phone number';

  if (!password || !confirmPassword)
    throw 'Please provide password';

  //=========start validations================
  await validation.checkString(fname, 'First Name');
  await validation.checkString(lname, 'Last Name');
  await validation.alphanumeric(username);
  await validation.checkGender(gender);
  await validation.checkDate(dob, 'dob');
  await validation.checkEmail(email);
  await validation.checkPhone(phone, 'phone');
  await validation.checkPhone(emer_phone, 'emergency phone');
  if (phone === emer_phone) {
    throw 'Error: Please provide different phone number for Emergency'
  }
  await validation.checkPassword(password, 'password');
  await validation.checkPassword(confirmPassword, 'confirmPassword');

  if (password != confirmPassword) {
    throw "\nPassword did not match: Please try again...";
  }

  //=========end validations================

  const hash = await bcrypt.hash(password, saltRounds);
  //console.log(hash);

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
      gender: gender,
      dob: dob,
      email: email,
      phone: phone,
      emer_phone: emer_phone,
      password: hash,
      reviews: [],
      activities: [],
      Admin: false
    };

    //Create/Insert new user in db
    const userInserted = await usersCollection.insertOne(newUser);
    if (!userInserted.acknowledged || !userInserted.insertedId)
      throw 'Could not add user';
    else if (userInserted.acknowledged) {
      const newId = userInserted.insertedId;
      const user = await getUserById(newId.toString());
      return JSON.parse(JSON.stringify(user));
    }
    //return userInserted;
    //return { authenticated: true };
  }

}

async function checkUser(username, password) {
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
}


async function getUserById(id) {
  id = validation.checkId(id, 'ID');
  const usersCollection = await users();
  const found_user = await usersCollection.findOne({ _id: ObjectId(id) });

  if (!found_user) throw 'User not found';

  return found_user;
}

async function getUserByUsername(username) {
  await validation.alphanumeric(username);
  const usersCollection = await users();
  const found_user = await usersCollection.findOne({ username: username });

  if (!found_user) throw 'User not found';

  return found_user;
}

function calculateAge(dob) {
  var today = new Date();
  var birthDate = new Date(dob);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

async function userActivity(username, activity) {
  await validation.alphanumeric(username);
  await validation.checkActivity(activity);
  const usersCollection = await users();
  // const found_user = await usersCollection.findOne({ username: username });

  // if (!found_user) throw 'User not found';

  found_user = await getUserByUsername(username);
  found_user.activities.push(activity);
  let updatedInfo = await usersCollection.updateOne({ username: username }, { $set: { activities: found_user.activities } });
  //console.log(updatedInfo);
  return true;

}

async function setAdmin(id) {
  if (!id) throw 'You must provide an id';
  if (typeof id !== 'string') throw 'user Id must be a string';
  if (id.trim().length === 0)
    throw 'user Id cannot be an empty string or just spaces';
  id = id.trim();
  if (!ObjectId.isValid(id)) throw 'invalid object ID';
  //let userObjId = ObjectId.createFromHexString(userId);
  let userCollection = await users();
  let userUpdateInfo = {
    Admin: true
  };
  let updatedInfo = await userCollection.updateOne({ _id: ObjectId(id) }, { $set: userUpdateInfo });
  if (updatedInfo.modifiedCount === 0) {
    throw 'could not set Admin access successfully';
  }
  return this.getUserById(id);
};


module.exports = {
  createUser,
  checkUser,
  getUserById,
  getUserByUsername,
  calculateAge,
  userActivity,
  setAdmin
  //seedUser
}