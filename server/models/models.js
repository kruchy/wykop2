var mongoose = require("mongoose");
var Users = require("./User");
var Posts = require("./Post");


mongoose.connect("mongodb://localhost:27017/wykop2");

var db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", function (callback) {
    console.log("Connection Succeeded.");
});

var post = mongoose.model("Post", Posts.postSchema);
var user = mongoose.model("User", Users.userSchema);

module.exports.Post = post;
module.exports.User = user;
