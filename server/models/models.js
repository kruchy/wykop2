var mongoose = require("mongoose");
var Users = require("./User");
var Posts = require("./Post");

var config = require('../config');

mongoose.connect(config.mongoURI[process.env.NODE_ENV], function(err, res) {
    if(err) {
        console.log('Error connecting to the database. ' + err);
    } else {
        console.log('Connected to Database: ' + config.mongoURI[process.env.NODE_ENV]);
    }
});

var db = mongoose.connection;
s
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", function (callback) {
    console.log("Connection Succeeded.");
});

var post = mongoose.model("Post", Posts.postSchema);
var user = mongoose.model("User", Users.userSchema);

module.exports.Post = post;
module.exports.User = user;
