'use strict';

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const annSchema = new Schema({
    user: {
       type: String,
       default: "Anonymous"
    },
    date: {
        type: Date,
        default: Date.now
    },
    title: String,
    body: String
});

module.exports = mongoose.model("Announcements", annSchema);