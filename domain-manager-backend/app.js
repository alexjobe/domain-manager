var express        = require('express'),
    app            = express(),
    bodyParser     = require("body-parser"),
    methodOverride = require("method-override"),
    path           = require("path"),
    cors           = require('cors'),
    passport       = require("passport"),
    LocalStrategy  = require("passport-local"),
    db             = require('./models'),
    middleware     = require("./middleware");

const port         = process.env.PORT || 8080;
const frontendPath = '../domain-manager-frontend';

// ====================== APP CONFIG ====================== //
app.use(bodyParser.json()); // Required for POST routes
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.use(express.static(path.join(frontendPath, 'build')));


// ====================== CORS CONFIG ===================== //
var whitelist = ['http://localhost:3000']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
}

app.use(cors(corsOptions)); // Required for React to connect to API

// ==================== REQUIRE ROUTES ==================== //
var websiteRoutes = require("./routes/websites");
var registrarRoutes = require("./routes/registrars");
var hostRoutes = require("./routes/hosts");

// ==================== PASSPORT CONFIG =================== //
app.use(require("express-session")({
    secret: "It’s not a story the Jedi would tell you",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(db.User.authenticate()));
passport.serializeUser(db.User.serializeUser());
passport.deserializeUser(db.User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

// ====================== USE ROUTES ====================== //

// Show login form
app.get("/login", middleware.isLoggedIn, function(req, res) {
    return res.json(req.user);
});

// Handle login form
app.post('/login', function(req, res, next) {
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
app.get("/logout", function(req, res) {
    req.logout();
    res.send({message: 'Logged out'});
});

// // Show register form
// app.get("/register", function(req, res){
//     res.render("register");
// });

// // Handle register logic
// app.post("/register", function(req, res) {
//     var newUser = new db.User({username: req.body.username});
//     db.User.register(newUser, req.body.password, function(err, user){
//         if(err){
//             console.log(err);
//             return res.redirect("register");
//         }
//         passport.authenticate("local")(req, res, function(){
//             res.redirect("/");
//         });
//     });
// });

app.use('/api/websites', websiteRoutes);
app.use('/api/registrars', registrarRoutes);
app.use('/api/hosts', hostRoutes);

// START SERVER
app.listen(port, "localhost", function(){
    console.log("Server is listening on port " + port);
});