'use strict';

const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

const orderSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    building: {
        type: String,
        required: true
    },
    phoneNumber:{
        type: String,
        required: true
    },
    room: {
        type: Number,
        required: true
    },
    orderTime: {
        type: Date,
        default: Date.now
    },
    cc: Number,
    sd: Number,
    dc: Number,
    om: Number,
    payment: {
        type: String,
        default: "Cash",
        enum: [
            "Cash",
            "Venmo"
        ]
    },
    delivered: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("Orders", orderSchema);
