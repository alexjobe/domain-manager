var express = require('express'),
    router = express.Router();
    var db = require('../models');

//======================================================//
//                      HOST ROUTES                     //
//                      /api/hosts                      //
//======================================================//

// HOST INDEX - Get all hosts
router.get("/", function(req, res){
    db.Host.find()
    .then(function(hosts){ // Promise instead of typical callback
        res.json(hosts);
    })
    .catch(function(err){
        res.send(err);
    });
});

// HOST CREATE - Add new host to database
router.post("/", function(req, res){
    db.Host.create(req.body)
    .then(function(newHost) {
        res.status(201).json(newHost); // 201 is "created"
    })
    .catch(function(err){
        res.send(err);
    });
});

// HOST GET - Get a single host
router.get("/:hostId", function(req, res){
    db.Host.findById(req.params.hostId)
    .then(function(host){
        res.json(host);
    })
    .catch(function(err) {
        res.send(err);
    });
});

// HOST UPDATE - Update a host
router.put("/:hostId", function(req, res){
    db.Host.findOneAndUpdate({_id: req.params.hostId}, req.body, {new: true}) // {new: true} respond with updated data
    .then(function(host){
        res.json(host);
    })
    .catch(function(err){
        res.send(err);
    });
});

// HOST DELETE - Delete a host
router.delete("/:hostId", function(req, res){

    db.Host.deleteOne({_id: req.params.hostId})
    .then(function(){
        res.json({message: 'Deletion success'});
    })
    .catch(function(err){
        res.send(err);
    });
});

module.exports = router;