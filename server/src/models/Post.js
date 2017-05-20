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
        type:String,
        required:true
    },
    title: {
        type: String,
        required: true
    }
        type: String,
        required: true
    },
    comments: [{
        type: Schema.ObjectId,
        ref: 'Comment'
    }]

});

module.exports.postSchema = postSchema;