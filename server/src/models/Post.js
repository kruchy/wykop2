const mongoose = require("mongoose");
const User = require('./models').User;
const Schema = mongoose.Schema;

const postSchema = new Schema({
    author: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    comments: [{
        type: Schema.ObjectId,
        ref: 'Comment'
    }]


},{ timestamps: { createdAt: 'created_at', updatedAt : 'updated_at' } });

module.exports.postSchema = postSchema;