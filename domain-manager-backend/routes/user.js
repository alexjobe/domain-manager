var express    = require('express'),
    router     = express.Router(),
    passport   = require("passport"),
    middleware = require("../middleware"),
    db         = require('../models');

//======================================================//
//                    USER LOGIN ROUTES                 //
//                       /api/user                      //
//======================================================//

// Check if user is logged in, and return the logged in user
router.get("/login", middleware.isLoggedIn, function(req, res) {
  return res.json(req.user);
});

// Handle login
router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.json({message: 'User not found'}) }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.json(req.user);
    });
  })(req, res, next);
});

// Logout route
router.get("/logout", function(req, res) {
  req.logout();
  res.send({message: 'Logged out'});
});

// Return the number of registered users
router.get("/register", function(req, res) {
  db.User.countDocuments({}, function(err, count){
    if(err) {return res.send(err)}
    return res.json({count: count});
  });
});

// Handle register logic
router.post("/register", function(req, res) {
  db.User.countDocuments({}, function(err, count){
    // Deny register access if a user already exists. This route is only used
    // on initial setup
    if(count < 1) {
      var newUser = new db.User({username: req.body.username});
      db.User.register(newUser, req.body.password, function(err, user){
        if (err) { return next(err); }
        passport.authenticate("local")(req, res, function(){
          return res.json(req.user);
        })(req, res, next);
      });
    } else {
      return res.json({message: 'Access Denied'});
    }
  });
});


// Handle change password
router.post("/changepassword", function(req, res) {
  if(req.isAuthenticated()) {
    req.user.changePassword(req.body.oldPassword, req.body.newPassword, function(err){
      if(err) { return res.json(err); }
      res.status(200).json({message: 'Password change successful'});
    });
  } else {
    return res.json({message: 'Access Denied'});
  }
});

module.exports = router;