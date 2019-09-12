const connect_string = process.env.CONNECTION_STRING || 'mongodb://localhost/domain-manager-api';

var mongoose = require('mongoose');
mongoose.set('debug', true);

mongoose.connect(connect_string); // Connect to MongoDB server

mongoose.Promise = Promise;

module.exports.Website = require('./website');
module.exports.Registrar = require('./registrar');
module.exports.Host = require('./host');
module.exports.User = require('./user');