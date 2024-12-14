const mongoose = require('mongoose');
const config = require("config");
const dbgr = require("debug")("development:mongoose");


mongoose.connect(`${config.get("MONGODB_URI")}/trends`)
.then(() => {
    dbgr("Connected to MongoDB");
})
.catch((err) => {
    dbgr("MongoDB connection error:", err.message);
});


module.exports = mongoose.connection;
