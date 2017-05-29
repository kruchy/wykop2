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
},{ timestamps: { createdAt: 'created_at', updatedAt : 'updated_at' } });

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

userSchema.path('username').validate(function (v) {
    return v.match('^[A-Za-z0-9_-]{3,16}$');
});
module.exports.userSchema = userSchema;