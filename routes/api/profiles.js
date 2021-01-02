const express = require('express');
const router = express.Router();

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
router.post('/', (req,res) => {
  const newProfile = new Profile({
    profileName: req.body.profileName,
    team: req.body.team,
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