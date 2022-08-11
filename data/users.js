const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
const {ObjectId} = require('mongodb');
//const validation = require('../validation');

const exportedMethods = {
 //SEED DB WITHOUT THROW

 async getUserById(id) {
    //id = validation.checkId(id, 'ID');
    const usersCollection = await users();
    const found_user = await usersCollection.findOne({_id: ObjectId(id)});

    if (!found_user) throw 'User not found';

    return found_user;
  },

 async seedUser(firstName, lastName, email, username, age, activities_arr) {

    //Error check before seeding database
    // try {
    //   title = validation.checkString(title, 'Title');
    // } catch (error) {
    //   console.error (error);
    //   process.exit(1);
    // }

    // try {
    //   ingredients = validation.checkObjectArray(ingredients_arr, 'Ingredients');
    // } catch (error) {
    //   console.error (error);
    //   process.exit(1);
    // }

    // try {
    //   steps = validation.checkStringArray(steps_arr, 'Steps');
    // } catch (error) {
    //   console.error (error);
    //   process.exit(1);
    // }
    
    // if(!Array.isArray(ingredients_arr)) throw "Ingredient list is not an array";
    // if(!Array.isArray(steps_arr)) throw "Steps list is not an array";

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