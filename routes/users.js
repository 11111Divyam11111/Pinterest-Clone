require('./config');
const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String
  },
  posts: [ // yahan par user ko uske dwara created posts ki id milegi and post can be multiple 
  // thus it is an array
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },
  ],
  dp: {
    type: String, // Assuming dp (display picture) is a URL or file path
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullname: {
    type: String,
  },
});

userSchema.plugin(plm);

const User = mongoose.model('User', userSchema);

module.exports = User;
