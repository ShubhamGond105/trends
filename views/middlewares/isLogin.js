const jwt = require("jsonwebtoken");
const userModel = require("../models/user model");
const { JWT_KEY } = require("../config/keys");

module.exports.isLogin = async (req, res, next) => {
    const hardcodedKey = "your-jwt-key"; // Replace with actual test key
    const token = req.cookies.token;

    if (!token) {
        req.flash("error", "Please login to access this page");
        return res.redirect("/");
    }

    try {
        const decoded = jwt.verify(token, hardcodedKey); // Use hardcoded key for testing
        const user = await userModel.findById(decoded.id).select("-password");

        if (!user) {
            req.flash("error", "Invalid user, please login again");
            return res.redirect("/");
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error);
        req.flash("error", "Please login to access this page");
        res.redirect("/");
    }
};
