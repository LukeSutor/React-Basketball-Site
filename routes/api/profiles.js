const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
var fileId = mongoose.Types.ObjectId();

// Profile model
const Profile = require('../../models/Profile')


// @route GET api/profiles
// @desc Get All profiles
// @access Public
router.get('/', (req, res) => {
  Profile.find()
  .sort({ profileName: -1})
    .then(profiles => res.json(profiles))
});


// @route ADD api/profiless
// @desc Create a Profile
// @access Public
router.post('/', (req, res) => {
  const newProfile = new Profile({
    user_id: req.body.user_id,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    team: req.body.team,
    position: req.body.position,
    jersey_number: req.body.jersey_number,
    height_feet: req.body.height_feet,
    height_inches: req.body.height_inches,
    weight: req.body.weight,
    email: req.body.email
  })

  newProfile.save()
  .then(profile => res.json(profile));
});


// @route DELETE api/profiles
// @desc Delete a Profile
// @access Public
router.delete('/:id', (req, res) => {
  Profile.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({success: true})))
    .catch(err => res.status(404).json({success: false}));
});

module.exports = router;