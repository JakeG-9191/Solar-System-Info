const auth = require('../middleware/auth');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const { Post, validate } = require('../models/post');
const { User } = require('../models/user');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error while trying to retrieve all posts');
  }
});

module.exports = router;
