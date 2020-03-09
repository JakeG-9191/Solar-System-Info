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

// router.post('/', async (req, res) => {
//   const { error } = validate(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   let user = await User.findOne({ email: req.body.email });
//   if (user)
//     return res
//       .status(400)
//       .send('This email address has already been registered to the website');

//   user = new User(_.pick(req.body, ['name', 'email', 'password']));
//   const salt = await bcrypt.genSalt(10);
//   user.password = await bcrypt.hash(user.password, salt);

//   await user.save();

//   const token = user.generateAuthToken();
//   res.header('x-auth-token', token).send(_.pick(user, ['id', 'name', 'email']));
// });

// router.put('/:id', async (req, res) => {
//   const { error } = validate(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   const user = await User.findByIdAndUpdate(
//     req.params.id,
//     {
//       name: req.body.name,
//       email: req.body.email
//     },
//     {
//       new: true
//     }
//   );

//   if (!user)
//     return res
//       .status(404)
//       .send('This user does not exist in the system, cannot update');

//   res.send(user);
// });

// router.delete('/:id', async (req, res) => {
//   const user = await User.findByIdAndRemove(req.params.id);

//   if (!user)
//     return res
//       .status(404)
//       .send('There is no valid user for this ID, cannot delete');

//   res.send(user);
// });

// router.get('/:id', async (req, res) => {
//   const user = await User.findById(req.params.id).select('-password');

//   res.send(user);
// });

module.exports = router;
