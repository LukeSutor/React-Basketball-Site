const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create profile Schema
const ProfileSchema = new Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  team: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  jersey_number: {
    type: Number,
    required: true
  },
  height_feet: {
    type: Number,
    required: true
  },
  height_inches: {
    type: Number,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);