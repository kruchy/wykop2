const mongoose = require("mongoose");
const User = require('./models').User;
const Schema = mongoose.Schema;

const postSchema = new Schema({
    author: {
        type: Number,
        ref: 'User'
    },
    content: String
});

module.exports.postSchema = postSchema;