const userModel = require("../models/user model");
const bcrypt = require("bcrypt");
const { generateToken } = require("./generateToken");

module.exports.registerUser = async (req, res) => {
    try {
        let { email, password, fullName } = req.body; 

        // Validate required fields
        if (!email || !password || !fullName) {
            return res.status(400).send("All fields are required");
        }

        // Check if user already exists
        let user = await userModel.findOne({ email });
        if (user) {
            return res.status(400).send("User already exists");
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        // Create new user
        user = await userModel.create({
            email,
            password: hashPassword,
            fullName
        });

        // Generate token and set cookie
        const token = generateToken(user);
        res.cookie("token", token, { httpOnly: true });
        return res.redirect("/shop");

    } catch (error) {
        console.error("Registration error:", error.message);
        return res.status(500).send("An error occurred while registering the user");
    }
};

module.exports.loginUser = async (req, res) => {
    try {
        let { email, password } = req.body;

        // Check if the user exists
        let user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send("User not found");
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send("Invalid password");
        }

        // Generate token and set cookie
        const token = generateToken(user);
        res.cookie("token", token, { httpOnly: true });
        return res.redirect("/shop");

    } catch (error) {
        console.error("Login error:", error.message);
        return res.status(500).send("An error occurred while logging in the user");
    }
};

module.exports.logout = (req, res) => {
    // If using sessions, destroy the session
    req.session.destroy((err) => {
        if (err) {
            console.error("Failed to destroy session during logout", err);
            return res.status(500).send("Failed to log out. Please try again.");
        }
        res.clearCookie('token'); // Clear the authentication token cookie
        return res.redirect("/");
    });
};
