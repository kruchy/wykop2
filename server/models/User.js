var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
    nick: String,
    email: String
});

module.exports.userSchema = userSchema;