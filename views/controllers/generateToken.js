const jwt = require("jsonwebtoken");
const keys = require("../config/keys"); // Adjust the path if necessary

const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email }, // Payload
        keys.JWT_KEY, // Secret key from keys.js
        { expiresIn: "1h" } // Token expiration time
    );
};

module.exports = { generateToken };
