# CS 546 WEB PROGRAMMING-1 FINAL PROJECT: NATURESCAPE

## Introduction

NaturEscape is a website where people can look for various outdoor activities, like hiking, skydiving, mountain climbing, river rafting, etc based on location. People can find groups with similar interests and join them as well as create them, where they can make all the itineraries.

## Steps to run the application:

1. Clone the repository

2. Navigate to the folder in a command line and run:

3. `npm i` (to install the dependencies, according to the package-lock.json file))

5. `npm run seed` (to seed the database)

Login information below

6. `npm start` (to start the server)

7. Open `http://localhost:3000/`

Admin credentials: `admin`
Password: `admin1234`

User credentials: `jodoe`
Password: `jodoe1234`

You will arrive on the landing page which is the homepage of the website
- The homepage and the event’s list page is accessible to all our users. The users can search for activities on the homepage
- In order to access the individual event’s page, create a new activity or event, check user profile, add a review, report an activity or register for an activity; the user needs to login.
- In addition, to delete an activity a user needs admin role.
- Registration for an event in the past is not allowed. Only a user who had registered for an event that is now completed can write a review.

## Core Features
1. Home page
The website's home page has a few features, such as an overview in the about section and a
list of all activities available to visitors. Without signing in, any user may view these activities.
This page also gives users who have logged in, the ability to create an event.
The user may just navigate through all of the alternatives, or if they are searching for
something specific, they can simply press the search button and arrive straight at the activity
they were looking for, and choose the activity of their choice. Selecting an activity will take
them to the particular activity’s page.

2. Individual Activities Page
This page showcases all details about the activity including location, price (if paid), number
of group members that have registered for the activity etc. The member details of the group
however can only be accessed once you have registered for the activity.
Another section on the page allows users who have completed the activity to provide
reviews with comments, photographs, videos etc. to provide further transparency towards
the event.

3. User Profile
User Profile will show the user details like - Full Name, Gender, Contact Number, Email ID,
and Emergency Contact number. The profile will also list the user's activities on NatureScape
(if any).

4. Add activity
This feature will allow users to add a new activity if not already listed. Users need to provide
a defined list of parameters (like Name, Location, Experience level, Paid/Free, etc.), to add
the activity.

5. Delete activity
If any activities or places are no longer running because of some circumstances, they can be
deleted from the website by the admin. If any user of the website provides legit information
about that place or activity being closed or no longer active.
6. Option to add reviews with pictures
Users can add reviews of the activities they have done with pictures. So, other users can
have a brief idea about that.

7. Report button
As all the activities listed on the website must be performed under professional supervision
under all the safety procedures followed by the authorities of the place. And if any user finds
that safety measures are not being taken properly or they had any bad experience regarding
that particular place or activity they can report it to aware other users.

8. FAQ section
In the FAQ section, users can find the answers to frequently asked questions regarding an
activity or place.

## Extra Features
1. Filter
The drop-down filter allows the user to refine their search by characteristics such as
location, price range (if paid), free, competence level (beginning, intermediate, advanced),
and so on. This will assist the user in organizing their search and locating the activity best
suited for a wonderful experience, as well as saving pagination and endless hours of
scrolling.

