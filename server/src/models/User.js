const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        required: true,
        type: String,
        unique: true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    admin: {
        type: Boolean,
        default: false
    }
});

userSchema.statics.getUsers = function (cb) {
    return this.find({}, cb);
};

userSchema.statics.findUser = function (username, cb) {
    return this.findOne({username: username}, cb);
};
userSchema.methods.findPosts = function (cb) {
    this.populate('author').exec(function (err, author) {
        !err ? cb(null, author) : cb(null, author);
    })
};


userSchema.plugin(require('basic-auth-mongoose'));
module.exports.userSchema = userSchema;