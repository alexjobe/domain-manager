var mongoose = require("mongoose");

// SCHEMA SETUP
var registrarSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: 'Name cannot be blank'
    },
    account: {
        type: String
    },
    password: {
        type: String
    },
    websites: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Website"
        }
    ]
});

var Registrar = mongoose.model('Registrar', registrarSchema);

module.exports = Registrar;