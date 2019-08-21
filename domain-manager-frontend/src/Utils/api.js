// --------------------------------------------------------------- //
// -------- API functions for making calls to the backend -------- //
// --------------------------------------------------------------- //

var loginAPI = require('./loginAPI');
var websiteAPI = require('./websiteAPI');
var registrarAPI = require('./registrarAPI');
var hostAPI = require('./hostAPI');

// --------------------------------------------------------------- //
// --------------------------- LOGIN API ------------------------- //
// --------------------------------------------------------------- //

exports.login = loginAPI.login;
exports.checkLogin = loginAPI.checkLogin;
exports.logout = loginAPI.logout;

// --------------------------------------------------------------- //
// --------------------------- Website API ----------------------- //
// --------------------------------------------------------------- //

exports.getWebsites = websiteAPI.getWebsites;
exports.getWebsite = websiteAPI.getWebsite;
exports.searchWebsites  = websiteAPI.searchWebsites;
exports.createWebsite = websiteAPI.createWebsite;
exports.updateWebsite = websiteAPI.updateWebsite;
exports.removeWebsite = websiteAPI.removeWebsite;

// --------------------------------------------------------------- //
// -------------------------- Registrar API ---------------------- //
// --------------------------------------------------------------- //

exports.getRegistrars = registrarAPI.getRegistrars;
exports.searchRegistrars = registrarAPI.searchRegistrars;
exports.createRegistrar = registrarAPI.createRegistrar;
exports.updateRegistrar = registrarAPI.updateRegistrar;
exports.removeRegistrar = registrarAPI.removeRegistrar;

// --------------------------------------------------------------- //
// ----------------------------- Host API ------------------------ //
// --------------------------------------------------------------- //

exports.getHosts = hostAPI.getHosts;
exports.searchHosts = hostAPI.searchHosts;
exports.createHost = hostAPI.createHost;
exports.updateHost = hostAPI.updateHost;
exports.removeHost = hostAPI.removeHost;

module.exports = exports;