require("dotenv").config();  // Ensure this is here too
module.exports = {
    JWT_KEY: process.env.JWT_KEY,
    SESSION_SECRET: process.env.SESSION_SECRET
};
