const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    nick: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    password: String,
    admin : Boolean
});

module.exports.userSchema = userSchema;