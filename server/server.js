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

var SECRET = process.env.SECRET || "abaegdadg%!#$!#gadg#$#11134%%%$banan!TfT";

app.use(session({
  secret: SECRET,
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

app.get("/admin", function(req, res) {
  res.render("admin");
});

app.get("/signup", function(req, res) {
  res.render("signup", { message: req.flash("signup") });
});

app.get("/login", function(req, res) {
  console.log(req.params)
  res.render("login", { message: req.flash("login") });
});

app.get("/blog", function(req, res) {

  var posts = []

  Post.find(req.query)
    .sort({ createdAt: "descending" })
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
      console.log(posts);
      res.render('blog', { posts: posts });
    });
});

app.get("/blog-admin", ensureAuthenticated, function(req, res) {
  var posts = []
  console.log(res.locals.currentUser)
  Post.find()
    .sort({ createdAt: "descending" })
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
      res.render('admin-blog', { posts: posts });
    });
});

app.get("/admin/:postId", ensureAuthenticated, function(req, res) {
  var indivdualPost;
  console.log("why", req.body)
  var cb = function (err, data) {
    if (err) {
      console.log(err);
    }

    res.render("admin-blog-post", { post: indivdualPost, recent: data });
  }

  var pushToIndivAndStartRecent = function (err, data) {
    if (err) {
      console.log(err)
    }

    var item = data;

    post = {
      title: item.title,
      id: item._id,
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

app.get("/new", ensureAuthenticated, function (req, res) {
  res.render("new");
});

app.get("/favicon.ico", function(req, res) {
  res.sendStatus(202);
});

app.get("/blog/:postId", function(req, res) {

  var indivdualPost;

  var cb = function (err, data) {
    if (err) {
      console.log(req.body)
    }

    res.render("blog-post", { post: indivdualPost, recent: data });
  }

  var pushToIndivAndStartRecent = function (err, data) {
    if (err) {
      console.log(err)
    }

    var item = data;

    post = {
      title: item.title,
      id: item._id,
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
  successRedirect: "/blog-admin",
  failureRedirect: "/login"
}));

app.post("/signup", function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  var displayName = req.body.displayName;

  User.find()
  .exec(function(err, user) {
    if (err) { return next(err); }
    if (user.length > 0) {
      return res.redirect("/login");
    }

    var newUser = new User ({
      username: username,
      password: password
    });

    newUser.save(next);

    });
  }, passport.authenticate("login", {
    successRedirect: "/blog-admin",
    failureRedirect: "/signup",
}));

app.use(require("./api-routes.js")());

var port = process.env.PORT || 5000;

app.listen(port, function() {
  console.log('listening on port 5000.');
});
