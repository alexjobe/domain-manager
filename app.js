var express = require('express'),
    app = express(),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override")

const port = process.env.PORT || 3000;

// APP CONFIG
app.use(bodyParser.json()); // Required for POST routes
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(express.static(__dirname + '/views'));

// ========== REQUIRE ROUTES ========== //

var indexRoutes = require("./routes/index");
var registrarRoutes = require("./routes/registrars");
var websiteRoutes = require("./routes/websites");

// USE ROUTES
app.use('/', indexRoutes);
app.use('/api/registrars', registrarRoutes);
app.use('/api/websites', websiteRoutes);

// START SERVER
app.listen(port, "localhost", function(){
    console.log("Server is listening on port " + port);
});