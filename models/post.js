// const config = require('config');
// const Joi = require('joi');
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const postSchema = new Schema({
//   user: {
//     type: Schema.Types.ObjectId,
//     ref: 'users'
//   },
//   text: {
//     type: String,
//     required: true
//   },
//   name: {
//     type: String
//   },
//   comments: [
//     {
//       user: {
//         type: Schema.Types.ObjectId,
//         ref: 'users'
//       },
//       text: {
//         type: String,
//         required: true
//       },
//       name: {
//         type: String
//       },
//       date: {
//         type: Date,
//         default: Date.now
//       }
//     }
//   ],
//   date: {
//     type: Date,
//     default: Date.now
//   }
// });

// function validatePost(post) {
//   const schema = {
//     user: Joi.objectId(),
//     text: Joi.string()
//       .min(10)
//       .max(1024)
//       .required()
//   };
//   return Joi.validate(post, schema);
// }

// const Post = mongoose.model('Post', postSchema);

// module.exports.Post = Post;
// module.exports.validate = validatePost;
