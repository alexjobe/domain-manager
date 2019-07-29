var express = require('express'),
    app = express(),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    path = require("path"),
    cors = require('cors');

const port = process.env.PORT || 8080;
const frontendPath = '../domain-manager-frontend';

// APP CONFIG
app.use(bodyParser.json()); // Required for POST routes
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(cors()); // Required for React to connect to API
app.use(express.static(path.join(frontendPath, 'build')));

// ========== REQUIRE ROUTES ========== //
var registrarRoutes = require("./routes/registrars");
var websiteRoutes = require("./routes/websites");

// USE ROUTES
app.get('/', function (res) {
    res.sendFile(path.join(frontendPath, 'build', 'index.html'));
});
app.use('/api/registrars', registrarRoutes);
app.use('/api/websites', websiteRoutes);

// START SERVER
app.listen(port, "localhost", function(){
    console.log("Server is listening on port " + port);
});