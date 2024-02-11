require('./config');
const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
  imageText: {
    type: String,
    required: true, 
  },
  image:{
    type:String
  },
  user:{ // yahan par us user ki id store hogi jisne ye post create kiya hai
    // yahan par id aana hai aur id ka type string nahi hota hai 
    // id ka type hota hai : mongoose.Schema.Types.Object.Id
    // and mongoose ko kaise pata chalega ki id kaha se a rai hai?
    // for this we would use ref : ('modal name')
    type: mongoose.Schema.Types.ObjectId,
    ref : 'User'
  },
  createDate: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Array,
    default: [],
  },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
