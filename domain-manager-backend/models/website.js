var mongoose = require("mongoose");

// SCHEMA SETUP
var websiteSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: 'Website name cannot be blank'
    },
    url: {
        type: String,
        required: 'URL cannot be blank'
    },
    ftp: String,
    userName: String,
    password: String,
    notes: String,
    registrar: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Registrar"
    },
    host: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Host"
    }
});

var Website = mongoose.model('Website', websiteSchema);

module.exports = Website;