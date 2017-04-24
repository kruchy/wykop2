var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var postSchema = new Schema({
    author: String,
    content: String
});

module.exports.postSchema = postSchema;