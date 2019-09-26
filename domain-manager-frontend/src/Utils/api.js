// --------------------------------------------------------------- //
// -------- API functions for making calls to the backend -------- //
// --------------------------------------------------------------- //

// API functions are split into different files, for organization
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
exports.registerUser = loginAPI.registerUser;
exports.checkRegisteredUsers = loginAPI.checkRegisteredUsers;
exports.changePassword = loginAPI.changePassword;

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