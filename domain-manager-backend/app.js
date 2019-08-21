var express        = require('express'),
    app            = express(),
    bodyParser     = require("body-parser"),
    methodOverride = require("method-override"),
    path           = require("path"),
    cors           = require('cors'),
    passport       = require("passport"),
    LocalStrategy  = require("passport-local"),
    db             = require('./models');

const port         = process.env.PORT || 8080;
const frontendPath = '../domain-manager-frontend';

// ========================= APP CONFIG ========================== //

app.use(bodyParser.json()); // Required for POST routes
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.use(express.static(path.join(frontendPath, 'build')));


// ========================= CORS CONFIG ========================= //

// CORS is required so we can connect the frontend to the backend

// Whitelist requests from the frontend, so React can access the
// API
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

// ======================== REQUIRE ROUTES ======================= //

// Set up our routes
var websiteRoutes = require("./routes/websites");
var registrarRoutes = require("./routes/registrars");
var hostRoutes = require("./routes/hosts");
var userRoutes = require("./routes/user");

// ======================== PASSPORT CONFIG ====================== //

// Passport is used for user authentication

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

// ========================== USE ROUTES ========================= //

// Use our routes
app.use('/api/websites', websiteRoutes);
app.use('/api/registrars', registrarRoutes);
app.use('/api/hosts', hostRoutes);
app.use('/api/user', userRoutes);

// ========================= START SERVER ======================== //

app.listen(port, "localhost", function(){
    console.log("Server is listening on port " + port);
});