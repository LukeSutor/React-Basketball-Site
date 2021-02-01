const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);

// Create profile Schema
const ProfileSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  user_id: {
    type: String,
    required: true
  },
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

ProfileSchema.path('username').validate(async (username) => {
  const count = await mongoose.models.profile.countDocuments({ username })
  return !count
}, 'Username taken')

module.exports = Profile = mongoose.model('profile', ProfileSchema);