const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const path = require("path");
const db = require("./config/mongoose-connection");

const indexRoutes=require("./routes/index")
const adminRoutes = require("./routes/adminRouter");
const userRoutes = require("./routes/usersRouter");
const productRoutes = require("./routes/productRouter");
const expressSession = require("express-session");
const flash = require("connect-flash");
const keys = require('./config/keys');
console.log("Session Secret from keys.js: ", keys.SESSION_SECRET);


require("dotenv").config();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(expressSession({
    secret: keys.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));



app.use(flash());
app.use(express.static(path.join(__dirname, "public"))); // Serving static files
app.set("view engine", "ejs");

// Routes
app.use("/",indexRoutes);
app.use("/admin", adminRoutes);
app.use("/user", userRoutes);
app.use("/product", productRoutes);



// Start the server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
