'use strict';

const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

const cookieSchema = new Schema({
    cookieType:{
        type: String,
        required: true,
    },
    quantity:{
        type: Number,
        min: 0,
        default: 0
    }
});

const orderSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    building: {
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
    cookies: [ cookieSchema ],
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

module.exports = {
  cookieSchema: cookieSchema,
  Orders: mongoose.model("Orders", orderSchema)
};
