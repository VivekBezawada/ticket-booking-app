# ticket-booking-app
Users can book tickets, check ticket statuses, update ticket details


# Postman Collection
Postman Collection can be found in the project itself. It is named "postmanCollection.json"
A request is named based on the funcionality of the API

# Assumptions
- User can track using Seat Number
- Simple Authentication - String matching from Config Database - Not using Passport or any other service
- Since there are very few routes, everything is kept in a single file rather than in different directories

# Structure
- start.js is the initial file which will start the application
- application.js takes care of importing the necessary modules
- controllers -> All the logic is written in this directory
- models -> Mongoose models are defined in this directory
- routes -> A directory named "v1" is labelled and routes are located for that version. Easier to have another directory and update routes.
- handlers -> helper files and utilities are written in this directory
- tests -> As per the project structure, tests are written in their respective directories.

# Testing
- Unit Tests are written for handlers
- Integration tests / End-To-End tests are written for controllers
- Instead of using a TEST / STAGING database, Tests are being done in PRODUCTION database. 

# CI / CD
- A buildspec.yml file is written for the AWS Code Build
- Mocha takes care of running test cases and after a successful build, it is deployed to Elastic Beanstalk.
- Code Pipeline is created in the following format
    -   When changes are made to the master branch and pushed,
    -   AWS will take care of pulling from git project.
    -   It builds and tests the application using Code Build
    -   if Successful, It deploys to Elastic Beanstalk.
