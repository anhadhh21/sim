<h2>SIM Card Activation Service</h2>

This is a simple SIM Card Activation service for a telecom company, implemented using Express.js and MongoDB.
Approach

Used Express.js for creating the RESTful API
MongoDB for database operations with Mongoose as the ODM
Implemented error handling for various scenarios
Followed RESTful principles for API design

Setup and Running Locally

Clone the repository:
git clone <https://github.com/anhadhh21/sim>

cd sim-card-activation-service

Install dependencies:
npm install

Make sure MongoDB is installed and running on your local machine.
Create a .env file in the root directory and add your MongoDB connection string:
MONGODB_URI=mongodb://localhost/sim_card_db

Run the application:
npm start


Assumptions and Decisions

Used MongoDB for its flexibility and ease of use with Node.js applications.
Assumed that SIM numbers are unique identifiers.
Implemented basic error handling, which can be extended for more specific error cases.
