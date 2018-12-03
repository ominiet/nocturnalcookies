'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userSchema = new Schema({
    username: {
      type: String,
      required: true,
  },
    password: {
      type: String,
      required: true,
  },
    role: {
      type: String,
      required: true,
      enum: ['Owner', 'Employee'],
      default: 'Employee'
  }
});

module.exports = mongoose.model("User", userSchema);
