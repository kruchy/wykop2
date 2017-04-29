const mongoose = require("mongoose");
const User = require('./models').User;
const Schema = mongoose.Schema;

const postSchema = new Schema({
    author: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    content: String
});

module.exports.postSchema = postSchema;