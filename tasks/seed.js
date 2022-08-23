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

    const scubaDiving = await activities.createActivity('Scuba Diving', 'Scuba diving is mainly done for the attraction of the unattainable undersea world.  It is one area of nature that mankind has not been able to fully control, we simply are not able to breathe underwater.  Hence, scuba diving gives us an opportunity to be in that underwater world, even if it is just for a limited amount of time.')

    const skyDiving = await activities.createActivity('skyDiving', 'Skydiving is parachuting from an airplane for fun. Skydiving can be done individually and with groups of people. Training is required. Unlike most paratroopers, skydivers often wait until they are low, before opening the parachute. The jump can also be made from a helicopter or a balloon that is high enough in the sky. Skydiving can be an exciting sport.Skydiving includes free falling (usually from an airplane) through the air prior to opening a parachute. Typically skydives are carried out from around 4,000m (or 12,500ft) offering 40 to 50 seconds of freefall time. Longer free fall times can be achieved by exiting an aircraft at altitudes much higher than 4,000m, but very high jumps require pressurized oxygen within the aircraft, and bottled oxygen for the diver.')

    //===================SEEDING EVENTS START=================================//
    let hikingevent1 = await activityTableData.createactivityTable("hiking",
        "The Great Smoky Mountains is in the Appalachian Mountains and is America's most visited National Park. In large part due to the highly varied elevations in the park, there is a wide range of plant and animal species. There are over 800 miles of trails, and a large section of the Appalachian Trail in the park as well as 80 historic structure", "Smoky Mountains-Gatlinburg", "Gatlinburg", "TN", "2022-08-01", "Invisible Inc.", "Intermediate", 100, faq = [{
            question: "Are trekking boots required?",
            answer: "not neccessarily, it is an intermediate hike. Not a problem if you wear them either."
        },
        {
            question: "How bad is the mosquito situation there?",
            answer: "You definitely need a strong mosquito repellent. We do not recommend mosquito nets as they are a fire hazard"
        }],
        []);
        console.log(hikingevent1);
    let hikingevent2 = await activityTableData.createactivityTable("hiking", "Discover this 3.0-mile out-and-back trail near Moctezuma, Sonora. Generally considered an easy route, it takes an average of 1 h 13 min to complete. This trail is great for hiking, mountain biking, and running, and it's unlikely you'll encounter many other people while exploring.", "Centro comercial Moctezuma", "Townsend", "MI", "2022-10-05", "Rachel", "Easy", 200, faq = [{
        question: "Are trekking boots required?",
        answer: "not neccessarily, it is an intermediate hike. Not a problem if you wear them either."
    },
    {
        question: "How chilly does it get? Do I need a winter jacket?",
        answer: "It is fine during the day and during the hike but at night it does get chilly so come with a jacket that can protect you till 15-20 degree celsius."
    }], []);

    let kayakingevent1 = await activityTableData.createactivityTable("kayaking", "Kayak the West-Side of San Juan Island...the federally designated Whale habitat.There is a whole new perspective at sea level. You are really able to just take a breath.The San Juan Islands are known for world-class kayaking, and one local kayak guide, Kelly, has a chance to see it every day.", "San-Juan-Islands", "San-Juan-Islands", "WA", "2022-03-02", "Sea Quest Expeditions", "Intermediate", 100, faq = [{
        question: "Are swim suits required?",
        answer: "yes"
    },
    {
        question: "Are children under 18 allowed?",
        answer: "They are allowed if accompanied by an adult. They will get a seaparate two person kayak"
    }
    ], []);

    let kayakingevent2 = await activityTableData.createactivityTable("kayaking", "Everglades National Park offers many paddling opportunities to explore the natural beauty of this area through freshwater marsh, mangrove forests, the 10,000 Islands, and the open waters of Florida Bay.There is a whole new perspective at sea level. You are really able to just take a breath.", "Nine Mile Pond", "Everglades", "FL", "2022-06-24", "Cinnamon", "Easy", 200, faq = [{
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
    ], []);
    let scubaevent1 = await activityTableData.createactivityTable("scuba", "Located two hours north of Philadelphia, along the border of Lower Nazareth and Bethlehem townships, in Northampton County, Dutch Springs emerged from the remains of the National Portland Cement Quarry at Brodhead. The former limestone mine and cement plant flourished for decades until the operation folded in the mid-1970s, prompting the creation of a unique diving campground, aqua park and adventure course on a portion of the property.", "Dutch Springs", "Bethlehem", "PA", "2023-08-02", "Gauri", "Intermediate", 100, faq = [{
        question: "Are swim suits required?",
        answer: "No, but diving suits are required."
    },
    {
        question: "Are children under 18 allowed?",
        answer: "They are allowed if accompanied by an adult."
    }
    ], []);

    let scubaevent2 = await activityTableData.createactivityTable("scuba", "The Casino Point Underwater Park is located next to the world-famous Casino Building. First established in 1962, this park is the first nonprofit underwater park in the country (and maybe the world), and offers the best shore diving in California! To make entry and exit in and out of the water as easy as possible, there are cement stairs with handrails.", "Casino Point", "Catalina", "CA", "2023-10-02", "Bhargav", "Easy", 200, faq = [{
        question: "Are swim suits required?",
        answer: "No, but diving suits are required."
    },
    {
        question: "Are children under 18 allowed?",
        answer: "They are allowed if accompanied by an adult."
    }
    ], []);

    let skydivingevent1 = await activityTableData.createactivityTable("skydiving", "Arizona is a popular stomping ground for the parachuting enthusiast with a diversity of landscape throughout Arizona where the beauty of scenes below are breathtaking.You feel temperature change and pressure on your skin. Even on a hot day, it will be noticeably cooler at jump altitude. It's like opening the refrigerator door on a hot day, and having that wave of cool rush over you. The wind resistance from your freefall speed feels like pressure.", "Skydive Arizona", "Tucson", "AR", "2023-11-02", "Skydiveaz", "Advanced", 2000,
        faq = [{
            question: "Are flight suits required?",
            answer: "Yes! they are provided at the site after registration and they are additionaly chargeable."
        },
        {
            question: "Are children under 18 allowed?",
            answer: "They are allowed if accompanied by an adult."
        }
        ], []);

    let skydivingevent2 = await activityTableData.createactivityTable("skydiving", "Chicago is a popular stomping ground for the parachuting enthusiast with a diversity of landscape throughout Chicage where the beauty of scenes below are breathtaking.You feel temperature change and pressure on your skin. Even on a hot day, it will be noticeably cooler at jump altitude. It's like opening the refrigerator door on a hot day, and having that wave of cool rush over you. The wind resistance from your freefall speed feels like pressure.", "Skydive Chicago", "Chicago", "IL", "2022-12-19", "Skydivechicago", "Advanced", 2000,
        faq = [{
            question: "Are flight suits required?",
            answer: "Yes! they are provided at the site after registration and they are additionaly chargeable."
        },
        {
            question: "Are children under 18 allowed?",
            answer: "They are allowed if accompanied by an adult."
        }
        ], []);

    //===================SEEDING ACTIVITIES END=================================//

    let user1 = await users.createUser("John", "Doe", "jodoe", "male", "1990-08-03", "jodoe1234@gmail.com", "9999999999", "8888888888", "jodoe1234", "jodoe1234");
    await users.userActivity("jodoe", "Hiking");

    let user2 = await users.createUser("John2", "Doe", "jodoe2", "male", "1990-08-04", "jodo@mail.com", "8888888888", "9888888888", "jodoe1234", "jodoe1234");
    await users.userActivity("jodoe", "Hiking");

    let admin = await users.createUser("Admin", "User", "admin", "female", "1900-06-04", "admin@gmail.com", "8888888888", "9888888888", "admin1234", "admin1234");
    await users.setAdmin(admin._id.toString())
    await users.userActivity("admin", "Hiking");

    let user3 = await users.createUser("shubhangi", "dutt", "sdutt", "female", "1998-04-05", "shubhangidutt99@gmail.com", "4859585894", "8383838383", "sdutt1234", "sdutt1234");
    //===================SEEDING USERS END=================================//
    //reviewerId, eventId, rating, reviewText
    let review1= await reviews.createReview(user1._id,hikingevent1._id,4,'This was the most amazing hike ever!!! created a new group of friends and the entire hike was very well organized. Vitnessed beautiful sunset');

    let review2= await reviews.createReview(user2._id,kayakingevent2._id,1,'Would not recommend. The kayak was really unstable and proper training was not provided');

    console.log('Done seeding database');

    await dbConnection.closeConnection();
}

main();