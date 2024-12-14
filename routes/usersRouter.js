const express = require("express");
const router = express.Router();
const {isLogin} = require("../middlewares/isLogin");
const {registerUser ,loginUser,logout} = require("../controllers/authController");
router.get("/", (req, res) => {
    res.send("User page");
});



router.post("/register",registerUser);

router.post("/login",loginUser);

router.get("/logout",logout);


module.exports = router;