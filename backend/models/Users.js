'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String,
    password: String,
    role: String
});

module.exports = mongoose.model("User", userSchema);