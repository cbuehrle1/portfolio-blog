var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
  title: { type: String, required: true, unique: true },
  tag: { type: String, required: true },
  body: { type: String, required: true},
  createdAt: { type: Date, default: Date.now }
});

var Post = mongoose.model("Post", postSchema);

module.exports = Post;
