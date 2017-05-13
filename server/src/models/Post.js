const mongoose = require("mongoose");
const User = require('./models').User;
const Schema = mongoose.Schema;

const postSchema = new Schema({
    author: {
        type: Schema.ObjectId,
        ref: 'User',
        required : true
    },
    content: {
        type:String,
        required:true
    }
});

module.exports.postSchema = postSchema;