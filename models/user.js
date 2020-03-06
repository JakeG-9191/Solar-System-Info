// const config = require('config');
// const jwt = require('jsonwebtoken');
// const Joi = require('joi');
// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     minlength: 2,
//     maxlength: 50
//   },
//   email: {
//     type: String,
//     require: true,
//     unique: true,
//     minlength: 6,
//     maxlength: 255
//   },
//   password: {
//     type: String,
//     required: true,
//     minlength: 6,
//     maxlength: 255
//   },
//   website: {
//     type: String,
//     minlength: 4,
//     maxlength: 99
//   },
//   location: {
//     type: String,
//     maxlength: 99
//   },
//   social: {
//     youtube: {
//       type: String
//     },
//     twitter: {
//       type: String
//     },
//     facebook: {
//       type: String
//     },
//     instagram: {
//       type: String
//     }
//   },
//   isAdmin: Boolean
// });

// userSchema.methods.generateAuthToken = function() {
//   const token = jwt.sign(
//     { _id: this._id, isAdmin: this.isAdmin },
//     config.get('jwtPrivate')
//   );
//   return token;
// };

// const User = mongoose.model('User', userSchema);

// function validateNewUser(user) {
//   const schema = {
//     name: Joi.string()
//       .min(2)
//       .max(50)
//       .required(),
//     email: Joi.string()
//       .min(6)
//       .max(255)
//       .required()
//       .email(),
//     password: Joi.string()
//       .min(6)
//       .max(1024),
//     website: Joi.string()
//       .min(4)
//       .max(99),
//     location: Joi.string().max(99)
//   };
//   return Joi.validate(user, schema);
// }

// module.exports.User = User;
// module.exports.validate = validateNewUser;
