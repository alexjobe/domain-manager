var mongoose = require("mongoose");

// SCHEMA SETUP
var registrarSchema = new mongoose.Schema({
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

var Registrar = mongoose.model('Registrar', registrarSchema);

module.exports = Registrar;