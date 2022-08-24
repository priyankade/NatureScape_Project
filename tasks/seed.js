const dbConnection = require('../config/mongoConnection');
const data = require('../data');
const users = data.users;
const activities = require('../data/activities');
const activityTableData = require('../data/activityTable');
const reviews = require('../data/reviews');

async function main() {
    const db = await dbConnection.dbConnection();
    await db.dropDatabase();
    //===================SEEDING ACTIVITIES START=================================//
    const hiking = await activities.createActivity('Hiking', 'Hiking is an activity of moderate difficulty, which involves walking across long distances generally on trails or paths. The duration of the activity varies between short half-day programs and longer itineraries of over 20 days. It is usually an activity that allows groups of different sizes.');

    const kayaking = await activities.createActivity('Kayaking', 'Kayaking is a watersport that involves paddling using a double-bladed oar and a small boat known as a kayak. The boats come in a variety of sizes and types, depending on their intended use, but most kayaks feature an enclosed deck that covers the legs. The boat sits low in the water and usually only accommodates a single paddler, but tandem kayaks hold two people and some boats hold three people.');

    const scubaDiving = await activities.createActivity('Scuba Diving', 'Scuba diving is mainly done for the attraction of the unattainable undersea world.  It is one area of nature that mankind has not been able to fully control, we simply are not able to breathe underwater.  Hence, scuba diving gives us an opportunity to be in that underwater world, even if it is just for a limited amount of time.');

    const skyDiving = await activities.createActivity('skyDiving', 'Skydiving is parachuting from an airplane for fun. Skydiving can be done individually and with groups of people. Training is required. Unlike most paratroopers, skydivers often wait until they are low, before opening the parachute. The jump can also be made from a helicopter or a balloon that is high enough in the sky. Skydiving can be an exciting sport.Skydiving includes free falling (usually from an airplane) through the air prior to opening a parachute. Typically skydives are carried out from around 4,000m (or 12,500ft) offering 40 to 50 seconds of freefall time. Longer free fall times can be achieved by exiting an aircraft at altitudes much higher than 4,000m, but very high jumps require pressurized oxygen within the aircraft, and bottled oxygen for the diver.');

    //seeding incorrect activities
    console.log('now seeding invalid data in activities table');

    const invalidHiking1 = await activities.createActivity('       ', 'Hiking is an activity of moderate difficulty, which involves walking across long distances generally on trails or paths. The duration of the activity varies between short half-day programs and longer itineraries of over 20 days. It is usually an activity that allows groups of different sizes.');
    console.log(invalidHiking1);

    const invalidHiking2 = await activities.createActivity(12345, 'Hiking is an activity of moderate difficulty, which involves walking across long distances generally on trails or paths. The duration of the activity varies between short half-day programs and longer itineraries of over 20 days. It is usually an activity that allows groups of different sizes.');
    console.log(invalidHiking2);

    const invalidHiking3 = await activities.createActivity('Hiking', '');
    console.log(invalidHiking3);

    const invalidHiking4 = await activities.createActivity('Hiking', '              ');
    console.log(invalidHiking4);

    const invalidHiking5 = await activities.createActivity('Hiking', 1234);
    console.log(invalidHiking5);

    console.log("done seeding activities");
    //===================SEEDING EVENTS START=================================//
    let hikingevent1 = await activityTableData.createactivityTable("hiking",
        "The Great Smoky Mountains is in the Appalachian Mountains and is America's most visited National Park. In large part due to the highly varied elevations in the park, there is a wide range of plant and animal species. There are over 800 miles of trails, and a large section of the Appalachian Trail in the park as well as 80 historic structure", "Smoky Mountains-Gatlinburg", "Gatlinburg", "TN", "2022-08-01", "sdutt","shubhangidutt99@gmail.com" ,"Intermediate", 100, faq = [{
            question: "Are trekking boots required?",
            answer: "not neccessarily, it is an intermediate hike. Not a problem if you wear them either."
        },
        {
            question: "How bad is the mosquito situation there?",
            answer: "You definitely need a strong mosquito repellent. We do not recommend mosquito nets as they are a fire hazard"
        }],
        ['sdutt','jodoe','jodoe2'], true);
    let hikingevent2 = await activityTableData.createactivityTable("hiking", "Discover this 3.0-mile out-and-back trail near Moctezuma, Sonora. Generally considered an easy route, it takes an average of 1 h 13 min to complete. This trail is great for hiking, mountain biking, and running, and it's unlikely you'll encounter many other people while exploring.", "Centro comercial Moctezuma", "Townsend", "MI", "2022-10-05","rbon","rbon2339@redditmail.com", "Easy", 200, faq = [{
        question: "Are trekking boots required?",
        answer: "not neccessarily, it is an intermediate hike. Not a problem if you wear them either."
    },
    {
        question: "How chilly does it get? Do I need a winter jacket?",
        answer: "It is fine during the day and during the hike but at night it does get chilly so come with a jacket that can protect you till 15-20 degree celsius."
    }], ['sdutt','jodoe','jodoe2'], true);

    let kayakingevent1 = await activityTableData.createactivityTable("kayaking", "Kayak the West-Side of San Juan Island...the federally designated Whale habitat.There is a whole new perspective at sea level. You are really able to just take a breath.The San Juan Islands are known for world-class kayaking, and one local kayak guide, Kelly, has a chance to see it every day.", "San-Juan-Islands", "San-Juan-Islands", "WA", "2022-03-02", "admin","admin@gmail.com" ,"Intermediate", 100, faq = [{
        question: "Are swim suits required?",
        answer: "yes"
    },
    {
        question: "Are children under 18 allowed?",
        answer: "They are allowed if accompanied by an adult. They will get a seaparate two person kayak"
    }
    ], ['sdutt','jodoe','jodoe2'], true);

    let kayakingevent2 = await activityTableData.createactivityTable("kayaking", "Everglades National Park offers many paddling opportunities to explore the natural beauty of this area through freshwater marsh, mangrove forests, the 10,000 Islands, and the open waters of Florida Bay.There is a whole new perspective at sea level. You are really able to just take a breath.", "Nine Mile Pond", "Everglades", "FL", "2022-06-24", "cjohnson95", "cjohnson95@gmail.com","Easy", 200, faq = [{
        question: "Are swim suits required?",
        answer: "yes"
    },
    {
        question: "Are children under 18 allowed?",
        answer: "They are allowed if accompanied by an adult. They will get a seaparate two person kayak"
    },
    {
        question: "Are the waters crocodile infested?",
        answer: "It's Florida!"
    }
    ], ['sdutt','jodoe','jodoe2'], true);
    let scubaevent1 = await activityTableData.createactivityTable("scuba", "Located two hours north of Philadelphia, along the border of Lower Nazareth and Bethlehem townships, in Northampton County, Dutch Springs emerged from the remains of the National Portland Cement Quarry at Brodhead. The former limestone mine and cement plant flourished for decades until the operation folded in the mid-1970s, prompting the creation of a unique diving campground, aqua park and adventure course on a portion of the property.", "Dutch Springs", "Bethlehem", "PA", "2023-08-02", "gshankar26","gshankar26@yahoo.com", "Intermediate", 100, faq = [{
        question: "Are swim suits required?",
        answer: "No, but diving suits are required."
    },
    {
        question: "Are children under 18 allowed?",
        answer: "They are allowed if accompanied by an adult."
    }
    ], ['sdutt','jodoe','jodoe2'], true);

    let scubaevent2 = await activityTableData.createactivityTable("scuba", "The Casino Point Underwater Park is located next to the world-famous Casino Building. First established in 1962, this park is the first nonprofit underwater park in the country (and maybe the world), and offers the best shore diving in California! To make entry and exit in and out of the water as easy as possible, there are cement stairs with handrails.", "Casino Point", "Catalina", "CA", "2023-10-02", "rbon","rbon2339@redditmail.com", "Easy", 200, faq = [{
        question: "Are swim suits required?",
        answer: "No, but diving suits are required."
    },
    {
        question: "Are children under 18 allowed?",
        answer: "They are allowed if accompanied by an adult."
    }
    ], [], true);

    let skydivingevent1 = await activityTableData.createactivityTable("skydiving", "Arizona is a popular stomping ground for the parachuting enthusiast with a diversity of landscape throughout Arizona where the beauty of scenes below are breathtaking.You feel temperature change and pressure on your skin. Even on a hot day, it will be noticeably cooler at jump altitude. It's like opening the refrigerator door on a hot day, and having that wave of cool rush over you. The wind resistance from your freefall speed feels like pressure.", "Skydive Arizona", "Tucson", "AR", "2023-11-02", "gshankar26","gshankar26@yahoo.com", "Advanced", 2000,
        faq = [{
            question: "Are flight suits required?",
            answer: "Yes! they are provided at the site after registration and they are additionaly chargeable."
        },
        {
            question: "Are children under 18 allowed?",
            answer: "They are allowed if accompanied by an adult."
        }
        ], [], false);

    let skydivingevent2 = await activityTableData.createactivityTable("skydiving", "Chicago is a popular stomping ground for the parachuting enthusiast with a diversity of landscape throughout Chicage where the beauty of scenes below are breathtaking.You feel temperature change and pressure on your skin. Even on a hot day, it will be noticeably cooler at jump altitude. It's like opening the refrigerator door on a hot day, and having that wave of cool rush over you. The wind resistance from your freefall speed feels like pressure.", "Skydive Chicago", "Chicago", "IL", "2022-12-19", "cjohnson","cjohnson95@gmail.com", "Advanced", 2000,
        faq = [{
            question: "Are flight suits required?",
            answer: "Yes! they are provided at the site after registration and they are additionaly chargeable."
        },
        {
            question: "Are children under 18 allowed?",
            answer: "They are allowed if accompanied by an adult."
        }
        ], [], true);


    //seeding invalid events


    ///invalid activity names
    let invalidhikingevent1 = await activityTableData.createactivityTable("      ",
        "The Great Smoky Mountains is in the Appalachian Mountains and is America's most visited National Park", "Smoky Mountains-Gatlinburg", "Gatlinburg", "TN", "2022-08-01", "cjohnson","cjohnson95@gmail.com", "Intermediate", 100, faq = [{
            question: "Are trekking boots required?",
            answer: "not neccessarily, it is an intermediate hike. Not a problem if you wear them either."
        }], [], true);
    console.log(invalidhikingevent1);

    let invalidhikingevent2 = await activityTableData.createactivityTable(1234,
        "The Great Smoky Mountains is in the Appalachian Mountains and is America's most visited National Park", "Smoky Mountains-Gatlinburg", "Gatlinburg", "TN", "2022-08-01", "cjohnson","cjohnson95@gmail.com", "Intermediate", 100, faq = [{
            question: "Are trekking boots required?",
            answer: "not neccessarily, it is an intermediate hike. Not a problem if you wear them either."
        }], [], true);
    console.log(invalidhikingevent2);

    let invalidhikingevent3 = await activityTableData.createactivityTable('',
        "The Great Smoky Mountains is in the Appalachian Mountains and is America's most visited National Park", "Smoky Mountains-Gatlinburg", "Gatlinburg", "TN", "2022-08-01", "cjohnson","cjohnson95@gmail.com", "Intermediate", 100, faq = [{
            question: "Are trekking boots required?",
            answer: "not neccessarily, it is an intermediate hike. Not a problem if you wear them either."
        }], [], true);
    console.log(invalidhikingevent3);

    //invalid description
    let invalidhikingevent4 = await activityTableData.createactivityTable('hiking',
        "", "Smoky Mountains-Gatlinburg", "Gatlinburg", "TN", "2022-08-01", "cjohnson","cjohnson95@gmail.com", "Intermediate", 100, faq = [{
            question: "Are trekking boots required?",
            answer: "not neccessarily, it is an intermediate hike. Not a problem if you wear them either."
        }], [], true);
    console.log(invalidhikingevent4);

    let invalidhikingevent5 = await activityTableData.createactivityTable('hiking',
        "The Great Smoky Mountains", "Smoky Mountains-Gatlinburg", "Gatlinburg", "TN", "2022-08-01", "cjohnson","cjohnson95@gmail.com", "Intermediate", 100, faq = [{
            question: "Are trekking boots required?",
            answer: "not neccessarily, it is an intermediate hike. Not a problem if you wear them either."
        }], [], true);
    console.log(invalidhikingevent5);
    let invalidhikingevent6 = await activityTableData.createactivityTable('hiking',
        "          ", "Smoky Mountains-Gatlinburg", "Gatlinburg", "TN", "2022-08-01", "cjohnson","cjohnson95@gmail.com", "Intermediate", 100, faq = [{
            question: "Are trekking boots required?",
            answer: "not neccessarily, it is an intermediate hike. Not a problem if you wear them either."
        }], [], true);
    console.log(invalidhikingevent6);
    // invalid location
    let invalidhikingevent7 = await activityTableData.createactivityTable('hiking',
        "The Great Smoky Mountains is in the Appalachian Mountains and is America's most visited National Park", "", "Gatlinburg", "TN", "2022-08-01", "cjohnson","cjohnson95@gmail.com", "Intermediate", 100, faq = [{
            question: "Are trekking boots required?",
            answer: "not neccessarily, it is an intermediate hike. Not a problem if you wear them either."
        }], [], true);
    console.log(invalidhikingevent7);
    let invalidhikingevent8 = await activityTableData.createactivityTable('hiking',
        "The Great Smoky Mountains is in the Appalachian Mountains and is America's most visited National Park", "          ", "Gatlinburg", "TN", "2022-08-01", "cjohnson","cjohnson95@gmail.com", "Intermediate", 100, faq = [{
            question: "Are trekking boots required?",
            answer: "not neccessarily, it is an intermediate hike. Not a problem if you wear them either."
        }], [], true);
    console.log(invalidhikingevent8);
    //invalid state and city
    let invalidhikingevent9 = await activityTableData.createactivityTable('hiking',
        "The Great Smoky Mountains is in the Appalachian Mountains and is America's most visited National Park", "", "Gatlinburg", "TN", "2022-08-01", "cjohnson","cjohnson95@gmail.com", "Intermediate", 100, faq = [{
            question: "Are trekking boots required?",
            answer: "not neccessarily, it is an intermediate hike. Not a problem if you wear them either."
        }], [], true);
    console.log(invalidhikingevent9);
    let invalidhikingevent10 = await activityTableData.createactivityTable('hiking',
        "The Great Smoky Mountains is in the Appalachian Mountains and is America's most visited National Park", 1234, "Gatlinburg", "   ", "2022-08-01", "cjohnson","cjohnson95@gmail.com", "Intermediate", 100, faq = [{
            question: "Are trekking boots required?",
            answer: "not neccessarily, it is an intermediate hike. Not a problem if you wear them either."
        }], [], true);
    console.log(invalidhikingevent10);
    let invalidhikingevent11 = await activityTableData.createactivityTable('hiking',
        "The Great Smoky Mountains is in the Appalachian Mountains and is America's most visited National Park", "Smoky Mountains-Gatlinburg", "Gatlinburg", 1234, "2022-08-01", "cjohnson","cjohnson95@gmail.com", "Intermediate", 100, faq = [{
            question: "Are trekking boots required?",
            answer: "not neccessarily, it is an intermediate hike. Not a problem if you wear them either."
        }], [], true);
    console.log(invalidhikingevent11);
    let invalidhikingevent16 = await activityTableData.createactivityTable('hiking',
        "The Great Smoky Mountains is in the Appalachian Mountains and is America's most visited National Park", "Smoky Mountains-Gatlinburg", "", "TN", "2022-08-01", "cjohnson","cjohnson95@gmail.com", "Intermediate", 100, faq = [{
            question: "Are trekking boots required?",
            answer: "not neccessarily, it is an intermediate hike. Not a problem if you wear them either."
        }], [], true);
    console.log(invalidhikingevent16);
    //invalid dates 
    let invalidhikingevent12 = await activityTableData.createactivityTable('hiking',
        "The Great Smoky Mountains is in the Appalachian Mountains and is America's most visited National Park", "Smoky Mountains-Gatlinburg", "Gatlinburg", "TN", "2022-07-24", "cjohnson","cjohnson95@gmail.com", "Intermediate", 100, faq = [{
            question: "Are trekking boots required?",
            answer: "not neccessarily, it is an intermediate hike. Not a problem if you wear them either."
        }], [], false);
    console.log(invalidhikingevent12);
    let invalidhikingevent13 = await activityTableData.createactivityTable('hiking',
        "The Great Smoky Mountains is in the Appalachian Mountains and is America's most visited National Park", "Smoky Mountains-Gatlinburg", "Gatlinburg", "TN", "2020-09-10", "cjohnson","cjohnson95@gmail.com", "Intermediate", 100, faq = [{
            question: "Are trekking boots required?",
            answer: "not neccessarily, it is an intermediate hike. Not a problem if you wear them either."
        }], [], false);
    console.log(invalidhikingevent13);
    let invalidhikingevent14 = await activityTableData.createactivityTable('hiking',
        "The Great Smoky Mountains is in the Appalachian Mountains and is America's most visited National Park", "Smoky Mountains-Gatlinburg", "Gatlinburg", "TN", "2022-08-22", "cjohnson","cjohnson95@gmail.com", "Intermediate", 100, faq = [{
            question: "Are trekking boots required?",
            answer: "not neccessarily, it is an intermediate hike. Not a problem if you wear them either."
        }], [], false);
    console.log(invalidhikingevent14);
    //invalid organizer
    let invalidhikingevent15 = await activityTableData.createactivityTable('hiking',
        "The Great Smoky Mountains is in the Appalachian Mountains and is America's most visited National Park", "Smoky Mountains-Gatlinburg", "Gatlinburg", "TN", "2022-09-22", "", "Intermediate", 100, faq = [{
            question: "Are trekking boots required?",
            answer: "not neccessarily, it is an intermediate hike. Not a problem if you wear them either."
        }], [], false);
    console.log(invalidhikingevent15);
    let invalidhikingevent24 = await activityTableData.createactivityTable('hiking',
        "The Great Smoky Mountains is in the Appalachian Mountains and is America's most visited National Park", "Smoky Mountains-Gatlinburg", "Gatlinburg", "TN", "2022-09-22", "         ", "Intermediate", 100, faq = [{
            question: "Are trekking boots required?",
            answer: "not neccessarily, it is an intermediate hike. Not a problem if you wear them either."
        }], [], false);
    console.log(invalidhikingevent16);
    let invalidhikingevent17 = await activityTableData.createactivityTable('hiking',
        "The Great Smoky Mountains is in the Appalachian Mountains and is America's most visited National Park", "Smoky Mountains-Gatlinburg", "Gatlinburg", "TN", "2022-09-22", 1234, "Intermediate", 100, faq = [{
            question: "Are trekking boots required?",
            answer: "not neccessarily, it is an intermediate hike. Not a problem if you wear them either."
        }], [], false);
    console.log(invalidhikingevent17);
    let invalidhikingevent18 = await activityTableData.createactivityTable('hiking',
        "The Great Smoky Mountains is in the Appalachian Mountains and is America's most visited National Park", "Smoky Mountains-Gatlinburg", "Gatlinburg", "TN", "2022-09-22", isNaN, "Intermediate", 100, faq = [{
            question: "Are trekking boots required?",
            answer: "not neccessarily, it is an intermediate hike. Not a problem if you wear them either."
        }], [], false);
    console.log(invalidhikingevent18);
    let invalidhikingevent19 = await activityTableData.createactivityTable('hiking',
        "The Great Smoky Mountains is in the Appalachian Mountains and is America's most visited National Park", "Smoky Mountains-Gatlinburg", "Gatlinburg", "TN", "2022-09-22", "cjohnson","cjohnson95@gmail.com", "Intermediate", 100, faq = [{
            question: "Are trekking boots required?",
            answer: "not neccessarily, it is an intermediate hike. Not a problem if you wear them either."
        }], [], false);
    console.log(invalidhikingevent19);
    //INVALID EXPERTISE
    let invalidhikingevent20 = await activityTableData.createactivityTable('hiking',
        "The Great Smoky Mountains is in the Appalachian Mountains and is America's most visited National Park", "Smoky Mountains-Gatlinburg", "Gatlinburg", "TN", "2022-09-22", "cjohnson","cjohnson95@gmail.com", "very easy", 100, faq = [{
            question: "Are trekking boots required?",
            answer: "not neccessarily, it is an intermediate hike. Not a problem if you wear them either."
        }], [], false);
    console.log(invalidhikingevent20);
    let invalidhikingevent22 = await activityTableData.createactivityTable('hiking',
        "The Great Smoky Mountains is in the Appalachian Mountains and is America's most visited National Park", "Smoky Mountains-Gatlinburg", "Gatlinburg", "TN", "2022-09-22", "cjohnson","cjohnson95@gmail.com", "", 100, faq = [{
            question: "Are trekking boots required?",
            answer: "not neccessarily, it is an intermediate hike. Not a problem if you wear them either."
        }], [], false);
    console.log(invalidhikingevent22);
    //invalid price
    let invalidhikingevent21 = await activityTableData.createactivityTable('hiking',
        "The Great Smoky Mountains is in the Appalachian Mountains and is America's most visited National Park", "Smoky Mountains-Gatlinburg", "Gatlinburg", "TN", "2022-09-22", "cjohnson","cjohnson95@gmail.com", "easy", '90', faq = [{
            question: "Are trekking boots required?",
            answer: "not neccessarily, it is an intermediate hike. Not a problem if you wear them either."
        }], [], false);
    console.log(invalidhikingevent21);
    //invalid faq
    let invalidhikingevent23 = await activityTableData.createactivityTable('hiking',
        "The Great Smoky Mountains is in the Appalachian Mountains and is America's most visited National Park", "Smoky Mountains-Gatlinburg", "Gatlinburg", "TN", "2022-09-22", "cjohnson","cjohnson95@gmail.com", "easy", 90, faq = [], [], false);
    console.log(invalidhikingevent23);
    console.log("done seeding events");
    //===================SEEDING ACTIVITIES END=================================//

    let user1 = await users.createUser("John", "Doe", "jodoe", "male", "1990-08-03", "jodoe1234@gmail.com", "9999999999", "8888888888", "jodoe1234", "jodoe1234");
    await users.userActivity("jodoe", "Hiking", "09/04/2024");

    let user2 = await users.createUser("John2", "Doe", "jodoe2", "male", "1990-08-04", "jodo@mail.com", "8888888888", "9888888888", "jodoe1234", "jodoe1234");
    await users.userActivity("jodoe", "Skydiving", "09/04/2024");

    await users.updateUserWithReports("jodoe", "Nine Mile Pond");
    await users.updateUserWithReports("jodoe", "Smoky Mountains-Gatlinburg");

    let admin = await users.createUser("Admin", "User", "admin", "female", "1900-06-04", "admin@gmail.com", "8888888888", "9888888888", "admin1234", "admin1234");
    await users.setAdmin(admin._id.toString())
    await users.userActivity("admin", "Hiking", "09/04/2024");

    let user3 = await users.createUser("shubhangi", "dutt", "sdutt", "female", "1998-04-05", "shubhangidutt99@gmail.com", "4859585894", "8383838383", "sdutt1234", "sdutt1234");

    let user4= await users.createUser("Gauri","Shankar","gshankar26","Male","2001-04-29","gshankar26@yahoo.com","0504562024","0504562021","gshankar26","gshankar26");

    let user5= await users.createUser("Rachel","Bon","rbon","transgender","1994-12-31","rbon2339@redditmail.com","2344852609","2344852505","rbon1234","rbon1234");

    let user6= await users.createUser("Cinnamon","Johnson","Cjohnson95","female","1995-01-21","cjohnson95@gmail.com","2344852610","2344852546","cjohnshon1234",'2344852609');


    //creating invalid users
    //invalid fname

    let invaliduser1 = await users.createUser("", "Doe", "jodoe", "male", "1990-08-03", "jodoe1234@gmail.com", "9999999999", "8888888888", "jodoe1234", "jodoe1234");
    let invaliduser2 = await users.createUser("      ", "Doe", "jodoe", "male", "1990-08-03", "jodoe1234@gmail.com", "9999999999", "8888888888", "jodoe1234", "jodoe1234");
    let invaliduser3 = await users.createUser(12345, "Doe", "jodoe", "male", "1990-08-03", "jodoe1234@gmail.com", "9999999999", "8888888888", "jodoe1234", "jodoe1234");
    //invalid lname
    let invaliduser4 = await users.createUser("John", "", "jodoe", "male", "1990-08-03", "jodoe1234@gmail.com", "9999999999", "8888888888", "jodoe1234", "jodoe1234");
    let invaliduser5 = await users.createUser("John", "       ", "jodoe", "male", "1990-08-03", "jodoe1234@gmail.com", "9999999999", "8888888888", "jodoe1234", "jodoe1234");
    let invaliduser6 = await users.createUser("John", 12345, "jodoe", "male", "1990-08-03", "jodoe1234@gmail.com", "9999999999", "8888888888", "jodoe1234", "jodoe1234");
    //invalid username
    let invaliduser7 = await users.createUser("John", "Doe", "$%^&&*", "male", "1990-08-03", "jodoe1234@gmail.com", "9999999999", "8888888888", "jodoe1234", "jodoe1234");
    let invaliduser8 = await users.createUser("John", "Doe", "", "male", "1990-08-03", "jodoe1234@gmail.com", "9999999999", "8888888888", "jodoe1234", "jodoe1234");
    let invaliduser9 = await users.createUser("John", "Doe", "      ", "male", "1990-08-03", "jodoe1234@gmail.com", "9999999999", "8888888888", "jodoe1234", "jodoe1234");
    //invalid gender
    let invaliduser10 = await users.createUser("John", "Doe", "      ", "male", "1990-08-03", "jodoe1234@gmail.com", "9999999999", "8888888888", "jodoe1234", "jodoe1234");
    let invaliduser11 = await users.createUser("John", "Doe", "", "male", "1990-08-03", "jodoe1234@gmail.com", "9999999999", "8888888888", "jodoe1234", "jodoe1234");
    let invaliduser12 = await users.createUser("John", "Doe", "gibberish", "male", "1990-08-03", "jodoe1234@gmail.com", "9999999999", "8888888888", "jodoe1234", "jodoe1234");
    let invaliduser13 = await users.createUser("John", "Doe", "joDoe", "male", "1990-08-03", "jodoe1234@gmail.com", "9999999999", "8888888888", "jodoe1234", "jodoe1234");
    //invalid dob
    let invaliduser14 = await users.createUser("John", "Doe", "joDoe", "male", "1989-08-03", "jodoe1234@gmail.com", "9999999999", "8888888888", "jodoe1234", "jodoe1234");
    let invaliduser15 = await users.createUser("John", "Doe", "joDoe", "male", "2023-08-03", "jodoe1234@gmail.com", "9999999999", "8888888888", "jodoe1234", "jodoe1234");
    let invaliduser16 = await users.createUser("John", "Doe", "joDoe", "male", "", "jodoe1234@gmail.com", "9999999999", "8888888888", "jodoe1234", "jodoe1234");
    let invaliduser17 = await users.createUser("John", "Doe", "joDoe", "male", "aplhabetagamma", "jodoe1234@gmail.com", "9999999999", "8888888888", "jodoe1234", "jodoe1234");
    let invaliduser18 = await users.createUser("John", "Doe", "joDoe", "male", "1989", "jodoe1234@gmail.com", "9999999999", "8888888888", "jodoe1234", "jodoe1234");
    let invaliduser19 = await users.createUser("John", "Doe", "joDoe", "male", "08-03", "jodoe1234@gmail.com", "9999999999", "8888888888", "jodoe1234", "jodoe1234");
    let invaliduser20 = await users.createUser("John", "Doe", "joDoe", "male", "03", "jodoe1234@gmail.com", "9999999999", "8888888888", "jodoe1234", "jodoe1234");
    let invaliduser21 = await users.createUser("John", "Doe", "joDoe", "male", "1989-08-03", "jodoe1234@gmail.com", "9999999999", "8888888888", "jodoe1234", "jodoe1234");
    let invaliduser22 = await users.createUser("John", "Doe", "joDoe", "male", "1989-02-31", "jodoe1234@gmail.com", "9999999999", "8888888888", "jodoe1234", "jodoe1234");
    let invaliduser23 = await users.createUser("John", "Doe", "joDoe", "male", "08-1998-03", "jodoe1234@gmail.com", "9999999999", "8888888888", "jodoe1234", "jodoe1234");
    let invaliduser24 = await users.createUser("John", "Doe", "joDoe", "male", "1998-30-07", "jodoe1234@gmail.com", "9999999999", "8888888888", "jodoe1234", "jodoe1234");
    let invaliduser25 = await users.createUser("John", "Doe", "joDoe", "male", "1998-00-07", "jodoe1234@gmail.com", "9999999999", "8888888888", "jodoe1234", "jodoe1234");
    let invaliduser26 = await users.createUser("John", "Doe", "joDoe", "male", "1998-13-07", "jodoe1234@gmail.com", "9999999999", "8888888888", "jodoe1234", "jodoe1234");
    let invaliduser27 = await users.createUser("John", "Doe", "joDoe", "male", "1998-04-32", "jodoe1234@gmail.com", "9999999999", "8888888888", "jodoe1234", "jodoe1234");
    let invaliduser28 = await users.createUser("John", "Doe", "joDoe", "male", "1998-05-00", "jodoe1234@gmail.com", "9999999999", "8888888888", "jodoe1234", "jodoe1234");
    let invaliduser29 = await users.createUser("John", "Doe", "joDoe", "male", "1998-30-07", "jodoe1234@gmail.com", "9999999999", "8888888888", "jodoe1234", "jodoe1234");
    //invalid email
    let invaliduser30 = await users.createUser("John", "Doe", "jodoe", "male", "1990-08-03", "     ", "9999999999", "8888888888", "jodoe1234", "jodoe1234");
    let invaliduser31 = await users.createUser("John", "Doe", "jodoe", "male", "1990-08-03", "de@gm.com", "9999999999", "8888888888", "jodoe1234", "jodoe1234");
    let invaliduser32 = await users.createUser("John", "Doe", "jodoe", "male", "1990-08-03", "@gmail.com", "9999999999", "8888888888", "jodoe1234", "jodoe1234");
    let invaliduser33 = await users.createUser("John", "Doe", "jodoe", "male", "1990-08-03", "gm.@@", "9999999999", "8888888888", "jodoe1234", "jodoe1234");
    let invaliduser35 = await users.createUser("John", "Doe", "jodoe", "male", "1990-08-03", "123@gmail.com", "9999999999", "8888888888", "jodoe1234", "jodoe1234");
    let invaliduser36 = await users.createUser("John", "Doe", "jodoe", "male", "1990-08-03", "123.com", "9999999999", "8888888888", "jodoe1234", "jodoe1234");
    //invalid phone number
    let invaliduser37 = await users.createUser("John", "Doe", "jodoe", "male", "1990-08-03", "joDoe1234@.com", "", "8888888888", "jodoe1234", "jodoe1234");
    let invaliduser38 = await users.createUser("John", "Doe", "jodoe", "male", "1990-08-03", "joDoe1234@.com", "      ", "8888888888", "jodoe1234", "jodoe1234");
    let invaliduser39 = await users.createUser("John", "Doe", "jodoe", "male", "1990-08-03", "joDoe1234@.com", "phonenumber", "8888888888", "jodoe1234", "jodoe1234");
    let invaliduser40 = await users.createUser("John", "Doe", "jodoe", "male", "1990-08-03", "joDoe1234@.com", "phonenumber", "8888888888", "jodoe1234", "jodoe1234");
    let invaliduser41 = await users.createUser("John", "Doe", "jodoe", "male", "1990-08-03", "joDoe1234@.com", "99999999999", "8888888888", "jodoe1234", "jodoe1234");
    let invaliduser42 = await users.createUser("John", "Doe", "jodoe", "male", "1990-08-03", "joDoe1234@.com", "9999999999", "phonenumber", "jodoe1234", "jodoe1234");
    let invaliduser43 = await users.createUser("John", "Doe", "jodoe", "male", "1990-08-03", "joDoe1234@.com", "9999999999", "8888888888888", "jodoe1234", "jodoe1234");
    let invaliduser44 = await users.createUser("John", "Doe", "jodoe", "male", "1990-08-03", "joDoe1234@.com", "9999999999", "8888888888888", "jodoe1234", "jodoe1234");
    //invalid password and confirm password fields
    let invaliduser45 = await users.createUser("John", "Doe", "jodoe", "male", "1990-08-03", "joDoe1234@.com", "9999999999", "8888888888", "", "jodoe1234");
    let invaliduser47 = await users.createUser("John", "Doe", "jodoe", "male", "1990-08-03", "joDoe1234@.com", "9999999999", "8888888888", "jodoe1234", "");
    let invaliduser48 = await users.createUser("John", "Doe", "jodoe", "male", "1990-08-03", "joDoe1234@.com", "9999999999", "8888888888", "        ", "jodoe1234");
    let invaliduser49 = await users.createUser("John", "Doe", "jodoe", "male", "1990-08-03", "joDoe1234@.com", "9999999999", "8888888888", "jodoe1234", "       ");
    let invaliduser50 = await users.createUser("John", "Doe", "jodoe", "male", "1990-08-03", "joDoe1234@.com", "9999999999", "8888888888", "jod", "jodoe1234");
    let invaliduser51 = await users.createUser("John", "Doe", "jodoe", "male", "1990-08-03", "joDoe1234@.com", "9999999999", "8888888888", "jodoe1234", "jod");
    let invaliduser52 = await users.createUser("John", "Doe", "jodoe", "male", "1990-08-03", "joDoe1234@.com", "9999999999", "8888888888", "1234", "jodoe1234");
    let invaliduser53 = await users.createUser("John", "Doe", "jodoe", "male", "1990-08-03", "joDoe1234@.com", "9999999999", "8888888888", "jodoe1234", "1234");





    console.log("done seeding users");
    //===================SEEDING USERS END=================================//
    //===================SEEDING REVIEWS START=================================//
    let review1 = await reviews.createReview(user1.username, hikingevent1._id, 4, 'This was the most amazing hike ever!!! created a new group of friends and the entire hike was very well organized. Vitnessed beautiful sunset');

    let review2 = await reviews.createReview(user2.username, kayakingevent2._id, 1, 'Would not recommend. The kayak was really unstable and proper training was not provided');

    //invalid seed
    let invalidreview1 = await reviews.createReview('', hikingevent1._id, 4, 'This was the most amazing hike ever!!! created a new group of friends and the entire hike was very well organized. Vitnessed beautiful sunset');
    let invalidreview2 = await reviews.createReview('        ', hikingevent1._id, 4, 'This was the most amazing hike ever!!! created a new group of friends and the entire hike was very well organized. Vitnessed beautiful sunset');
    let invalidreview3 = await reviews.createReview('$#%^$@$CHH', hikingevent1._id, 4, 'This was the most amazing hike ever!!! created a new group of friends and the entire hike was very well organized. Vitnessed beautiful sunset');

    let invalidreview4 = await reviews.createReview(user2.username, '', 1, 'Would not recommend. The kayak was really unstable and proper training was not provided');
    let invalidreview5 = await reviews.createReview(user2.username, '             ', 1, 'Would not recommend. The kayak was really unstable and proper training was not provided');

    let invalidreview6 = await reviews.createReview(user2.username, 'kayakingevent2._id', 20, 'Would not recommend. The kayak was really unstable and proper training was not provided');

    let invalidreview7 = await reviews.createReview(user2.username, 'kayakingevent2._id', 0, 'Would not recommend. The kayak was really unstable and proper training was not provided');

    let invalidreview8 = await reviews.createReview(user2.username, 'kayakingevent2._id', '0', 'Would not recommend. The kayak was really unstable and proper training was not provided');
    console.log("done seeding reviews");
    //===================SEEDING REVIEWS END=================================//
    console.log('Done seeding database');

    await dbConnection.closeConnection();
}

main();