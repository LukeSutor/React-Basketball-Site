const express = require('express');
const router = express.Router();

// Item Model
const Item = require('../../models/Item');


router.get('/', (req, res) => {
  Item.find()
  .sort({ date: -1 })
    .then(items => res.json(items))
});

// @route POST api/items
// @desc Create an Item
// @access Public
router.post('/', (req, res) => {
  const newItem = new Item({
    id: req.body.id,
    name: req.body.name,
    team: req.body.team,
    points: req.body.points,
    assists: req.body.assists,
    rebounds: req.body.rebounds,
    steals: req.body.steals,
    blocks: req.body.blocks
  });

  newItem.save().then(item => res.json(item));
});

// @route DELETE api/items
// @desc Delete an Item
// @access Public
router.delete('/:id', (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({success: true})))
    .catch(err => res.status(404).json({success: false}));
});


module.exports = router;