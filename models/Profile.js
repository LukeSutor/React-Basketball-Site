const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create profile Schema
const ProfileSchema = new Schema({
  profileName: {
    type: String,
    required: true
  },
  team: {
    type: String
  },
  email: {
    type: String
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);