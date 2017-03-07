var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var setUpPassport = require("./setup_passport");
var User = require("./models/user");
var Post = require("./models/post.js");
var flash = require("connect-flash");
var path = require('path');
var apiRoutes = require("./api-routes.js")
var app = express();

var db = process.env.MONGODB_URI || "mongodb://localhost:27017/portfolio_blog";

mongoose.connect(db);

setUpPassport();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(flash());

app.use(session({
  secret: "abaegdadg%!#$!#gadg#$#11134%%%$banan!TfT",
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/login");
  }
}

app.use(express.static('public'));

app.get("/", function(req, res) {
    res.render("index");
});

app.get("/signup", function(req, res) {
  res.render("signup", { message: req.flash("signup") });
});

app.get("/login", function(req, res) {
  console.log(req.params)
  res.render("login", { message: req.flash("login") });
});

app.get("/blog", ensureAuthenticated, function(req, res) {

  var posts = []
  console.log(req.params)
  Post.find()
    .exec(function(err, data) {
      if (err) {
        console.log(err)
      }

      data.forEach((post) => {

        var item = {
          title: post.title,
          id: post._id,
          tag: post.tag,
          date: post.createdAt,
          body: JSON.parse(post.body)
        }

        posts.push(item);
      });
      res.render('blog', { posts: posts });
    });
});

app.get("/new", ensureAuthenticated, function (req, res) {
  res.render("new");
});

app.get("/:postId", ensureAuthenticated, function(req, res) {

  var indivdualPost;

  var cb = function (err, data) {
    if (err) {
      console.log(err);
    }
    console.log(indivdualPost);
    console.log(data);
    res.render("blog-post", { post: indivdualPost, recent: data });
  }

  var pushToIndivAndStartRecent = function (err, data) {
    if (err) {
      console.log(err)
    }

    var item = data;

    post = {
      title: item.title,
      tag: item.tag,
      date: item.createdAt,
      body: JSON.parse(item.body),
    }

    indivdualPost = post;

    Post.find()
    .sort({ createdAt: "descending" })
    .limit(5)
    .exec(cb);
  }

  Post.findById(req.params.postId, pushToIndivAndStartRecent);

});

app.post("/login", passport.authenticate("login", {
  successRedirect: "/blog",
  failureRedirect: "/login"
}));

app.post("/signup", function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  var displayName = req.body.displayName;

  User.findOne({ username: username }, function(err, user) {
    if (err) { return next(err); }
    if (user) {
      return res.redirect("/login");
    }

    var newUser = new User ({
      username: username,
      password: password
    });

    newUser.save(next);

    });
  }, passport.authenticate("login", {
    successRedirect: "/blog",
    failureRedirect: "/signup",
}));

app.use(require("./api-routes.js")());

app.listen(5000, function() {
  console.log('listening on port 5000.');
});
