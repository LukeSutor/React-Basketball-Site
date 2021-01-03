const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create profile Schema
const ProfileSchema = new Schema({
  profileName: {
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
  jerseyNumber: {
    type: Number,
    required: true
  },
  height: {
    type: String,
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