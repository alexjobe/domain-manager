var mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/domain-manager-api'); // Connect to local MongoDB server

mongoose.Promise = Promise;

module.exports.Website = require('./website');
module.exports.Registrar = require('./registrar');