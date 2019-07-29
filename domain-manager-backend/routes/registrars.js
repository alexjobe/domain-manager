var express = require('express'),
    router = express.Router();
    var db = require('../models');

//======================================================//
//                    REGISTRAR ROUTES                  //
//                     /api/registrars                  //
//======================================================//

// REGISTRAR INDEX - Get all registrars
router.get("/", function(req, res){
    db.Registrar.find()
    .then(function(registrars){ // Promise instead of typical callback
        res.json(registrars);
    })
    .catch(function(err){
        res.send(err);
    });
});

// REGISTRAR CREATE - Add new registrar to database
router.post("/", function(req, res){
    db.Registrar.create(req.body)
    .then(function(newRegistrar) {
        res.status(201).json(newRegistrar); // 201 is "created"
    })
    .catch(function(err){
        res.send(err);
    });
});

// REGISTRAR GET - Get a single registrar
router.get("/:registrarId", function(req, res){
    db.Registrar.findById(req.params.registrarId)
    .then(function(registrar){
        res.json(registrar);
    })
    .catch(function(err) {
        res.send(err);
    });
});

// REGISTRAR UPDATE - Update a registrar
router.put("/:registrarId", function(req, res){
    db.Registrar.findOneAndUpdate({_id: req.params.registrarId}, req.body, {new: true}) // {new: true} respond with updated data
    .then(function(registrar){
        res.json(registrar);
    })
    .catch(function(err){
        res.send(err);
    });
});

// REGISTRAR DELETE - Delete a registrar
router.delete("/:registrarId", function(req, res){

    db.Registrar.deleteOne({_id: req.params.registrarId})
    .then(function(){
        res.json({message: 'Deletion success'});
    })
    .catch(function(err){
        res.send(err);
    });
});

module.exports = router;