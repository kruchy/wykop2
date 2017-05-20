const mongoose = require("mongoose");
const User = require('./models').User;
const Schema = mongoose.Schema;

const commentSchema = new Schema({
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

module.exports.commentSchema = commentSchema;