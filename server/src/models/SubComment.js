const mongoose = require("mongoose");
const User = require('./models').User;
const Post = require('./models').Post;
const Schema = mongoose.Schema;


const subCommentSchema = new Schema({
    author: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    post: {
        type: Schema.ObjectId,
        ref: 'User'
    }

}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}});


commentSchema.virtual("posts", {
    ref: "Post",
    localField: "_id",
    foreignField: "comments"
});


module.exports.commentSchema = commentSchema;