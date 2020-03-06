// const auth = require('../middleware/auth');
// const _ = require('lodash');
// const bcrypt = require('bcryptjs');
// const { Post, validate } = require('../models/post');
// const { User } = require('../models/user');
// const express = require('express');
// const router = express.Router();

// router.get('/', async (req, res) => {
//   try {
//     const posts = await Post.find().sort({ date: -1 });
//     res.json(posts);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error while trying to retrieve all posts');
//   }
// });

// router.post('/:id', async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id).select('-password');

//     if (!user) {
//       return res.status(401).send('Must be logged in for user to post');
//     }

//     const newPost = new Post({
//       text: req.body.text,
//       name: user.name
//     });

//     const post = await newPost.save();

//     res.json(post);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error while trying to add new post');
//   }
// });

// router.get('/:id', async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);

//     if (!post) {
//       return res.status(404).send('This post does not exist in the system');
//     }

//     res.json(post);
//   } catch (err) {
//     console.error(err.message);
//     if (!err.kind === 'ObjectId') {
//       return res.status(404).send('this post does not exist in the system');
//     }
//     res
//       .status(500)
//       .send('Server Error while trying to retrieve individual post');
//   }
// });

// router.delete('/:id', async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);

//     if (!post) {
//       return res.status(404).send('This post does not exist in the system');
//     }

//     await post.remove();
//     res.status(200).send('Post has been deleted');
//   } catch (err) {
//     console.error(err.message);
//     if (!err.kind === 'ObjectId') {
//       return res.status(404).send('this post does not exist in the system');
//     }
//     res.status(500).send('Server Error while trying to delete individual post');
//   }
// });

// module.exports = router;
