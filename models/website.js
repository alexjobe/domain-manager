var mongoose = require("mongoose");

// SCHEMA SETUP
var websiteSchema = new mongoose.Schema({
    websiteName: { 
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
    comments: String,
    registrar: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Registrar"
    }
});

var Website = mongoose.model('Website', websiteSchema);

module.exports = Website;