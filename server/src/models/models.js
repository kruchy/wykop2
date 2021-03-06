const mongoose = require("mongoose");
const Users = require("./User");
const Posts = require("./Post");
const Comments = require("./Comment");

const config = require('../../config');
mongoose.Promise = global.Promise;
mongoose.connect(config.mongoURI[process.env.NODE_ENV || 'development'], function (err, res) {
    if (err) {
        console.log('Error connecting to the database. ' + err);
        process.exit(1);
    } else {
        console.log('Connected to Database: ' + config.mongoURI[process.env.NODE_ENV || 'development']);
    }
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", function () {
    console.log("Connection Succeeded.");
});

let deepPopulate = require('mongoose-deep-populate')(mongoose);
Posts.postSchema.plugin(deepPopulate, {});
Comments.commentSchema.plugin(deepPopulate, {});
Users.userSchema.plugin(deepPopulate, {});

module.exports.Post = mongoose.model("Post", Posts.postSchema);
module.exports.Comment = mongoose.model("Comment", Comments.commentSchema);
module.exports.User = mongoose.model("User", Users.userSchema);
