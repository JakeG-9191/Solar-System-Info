const auth = require('../middleware/auth');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const { User, validate } = require('../models/user');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const user = await User.find().sort('name');
  res.send(user);
});

module.exports = router;
