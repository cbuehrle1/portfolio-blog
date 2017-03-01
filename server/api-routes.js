var express = require('express');
var User = require("./models/user.js");
var Post = require("./models/post.js");

module.exports = function () {

  var router = express.Router();

  router.get("/new", function (req, res) {
    res.render("new");
  });

  router.post("/new", function (req, res) {

    var cb = (err, data) => {
      res.redirect('/blog');
    };

    var post = new Post ();
    console.log(req.user)
    post.title = req.body.title,
    post.author = req.user.username,
    post.body = req.body.body,

    post.save(cb);

  });

  return router;
}
