var mongoose = require("mongoose");

// SCHEMA SETUP
var hostSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: 'Name cannot be blank'
    },
    userName: {
        type: String
    },
    password: {
        type: String
    },
    notes: String,
    websites: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Website"
        }
    ]
});

var Host = mongoose.model('Host', hostSchema);

module.exports = Host;