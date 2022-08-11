const dbConnection = require('../config/mongoConnection');
const data = require('../data');
const users = data.users;

async function main() {
  const db = await dbConnection.dbConnection();
  await db.dropDatabase();

  let firstName = "John";
  let lastName = "Doe";
  let email = "john.doe@abc.com";
  let username = "jdoe";
  let age = 20;  
  let activities_arr = [
        "Hiking",
        "Paragliding"
  ];
 

  await users.seedUser(firstName, lastName, email, username, age, activities_arr);

  console.log('Done seeding database');

  await dbConnection.closeConnection();
}

main();