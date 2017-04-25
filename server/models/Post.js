const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
    author: String,
    content: String
});

module.exports.postSchema = postSchema;